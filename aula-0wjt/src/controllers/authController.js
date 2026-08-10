// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  src/controllers/authController.js — Lógica de Login e Registro            ║
// ╠══════════════════════════════════════════════════════════════════════════════╣
// ║                                                                            ║
// ║  RESPONSABILIDADES DESTE CONTROLLER:                                       ║
// ║  • Registrar novos usuários (com hash de senha)                           ║
// ║  • Autenticar usuários existentes (login)                                 ║
// ║  • Gerar e retornar o token JWT                                           ║
// ║                                                                            ║
// ║  NOTA DIDÁTICA:                                                           ║
// ║  Este projeto usa um array em memória como "banco de dados" para          ║
// ║  simplificar o estudo. Em produção, use MySQL, PostgreSQL, MongoDB, etc.  ║
// ║                                                                            ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth');

// ═══════════════════════════════════════════════════════════════════════════════
// "BANCO DE DADOS" EM MEMÓRIA (apenas para fins didáticos)
// ─────────────────────────────────────────────────────────
// Em um projeto real, esses dados estariam em um banco de dados (MySQL, etc.).
// Os dados são perdidos quando o servidor reinicia.
// ═══════════════════════════════════════════════════════════════════════════════
const users = [];
let nextId = 1; // Simula o auto-increment de um banco de dados

// ┌─────────────────────────────────────────────────────────────────────────────┐
// │                            REGISTRO DE USUÁRIO                             │
// └─────────────────────────────────────────────────────────────────────────────┘
async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    // ── Validações básicas ──────────────────────────────────────────────
    if (!name || !email || !password) {
      const error = new Error('Campos obrigatórios: name, email, password.');
      error.statusCode = 400; // Bad Request
      return next(error);
    }

    // ── Verificar se o email já está em uso ─────────────────────────────
    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      const error = new Error('Este email já está cadastrado.');
      error.statusCode = 409; // Conflict
      return next(error);
    }

    // ┌───────────────────────────────────────────────────────────────────┐
    // │  HASH DA SENHA COM BCRYPT                                        │
    // ├───────────────────────────────────────────────────────────────────┤
    // │                                                                   │
    // │  NUNCA armazene senhas em texto puro! Se o banco vazar, todas    │
    // │  as senhas dos usuários ficam expostas.                          │
    // │                                                                   │
    // │  bcrypt.hash(senha, saltRounds):                                 │
    // │  • "salt" → string aleatória adicionada à senha antes do hash.  │
    // │    Impede que senhas iguais gerem hashes iguais.                 │
    // │  • "saltRounds" (10) → quantas vezes o algoritmo é aplicado.    │
    // │    Quanto maior, mais lento (e mais seguro contra brute-force). │
    // │    10 é um bom equilíbrio entre segurança e performance.        │
    // │                                                                   │
    // │  Exemplo:                                                        │
    // │  Senha: "123456"                                                 │
    // │  Hash:  "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68..."  │
    // │                                                                   │
    // │  O hash é IRREVERSÍVEL — não dá para "desencriptar" de volta.   │
    // │  Na hora do login, usamos bcrypt.compare() para verificar.      │
    // └───────────────────────────────────────────────────────────────────┘
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // ── Salvar o usuário (simulação de INSERT no banco) ─────────────────
    const newUser = {
      id: nextId++,
      name,
      email,
      password: hashedPassword, // SEMPRE o hash, nunca a senha em texto puro
    };

    users.push(newUser);

    // ── Resposta de sucesso (sem retornar a senha!) ─────────────────────
    return res.status(201).json({
      status: 'success',
      message: 'Usuário registrado com sucesso!',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        // ⚠️ Note que NÃO retornamos newUser.password aqui!
      },
    });

  } catch (err) {
    return next(err); // Qualquer erro inesperado vai para o errorMiddleware
  }
}

// ┌─────────────────────────────────────────────────────────────────────────────┐
// │                               LOGIN (AUTENTICAÇÃO)                         │
// └─────────────────────────────────────────────────────────────────────────────┘
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // ── Validações básicas ──────────────────────────────────────────────
    if (!email || !password) {
      const error = new Error('Campos obrigatórios: email, password.');
      error.statusCode = 400;
      return next(error);
    }

    // ── Buscar o usuário pelo email ─────────────────────────────────────
    const user = users.find((u) => u.email === email);

    if (!user) {
      // ⚠️ SEGURANÇA: Não diga "email não encontrado" — isso revela quais
      // emails estão cadastrados (enumeração de usuários).
      // Use uma mensagem genérica.
      const error = new Error('Credenciais inválidas.');
      error.statusCode = 401;
      return next(error);
    }

    // ┌───────────────────────────────────────────────────────────────────┐
    // │  COMPARAÇÃO DE SENHA COM BCRYPT                                   │
    // ├───────────────────────────────────────────────────────────────────┤
    // │  bcrypt.compare(senhaDigitada, hashSalvo):                       │
    // │                                                                   │
    // │  1. Extrai o salt do hash salvo                                  │
    // │  2. Aplica o mesmo salt + algoritmo na senha digitada            │
    // │  3. Compara os dois hashes                                       │
    // │                                                                   │
    // │  Retorna true se os hashes são iguais, false caso contrário.    │
    // │  Internamente usa comparação de tempo constante.                 │
    // └───────────────────────────────────────────────────────────────────┘
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      const error = new Error('Credenciais inválidas.');
      error.statusCode = 401;
      return next(error);
    }

    // ┌───────────────────────────────────────────────────────────────────┐
    // │  GERAÇÃO DO TOKEN JWT — jwt.sign()                                │
    // ├───────────────────────────────────────────────────────────────────┤
    // │                                                                   │
    // │  jwt.sign(payload, segredo, opções):                             │
    // │                                                                   │
    // │  PARÂMETRO 1 — Payload (dados que queremos "embalar" no token):  │
    // │  É um objeto JavaScript. Esses dados serão legíveis por quem     │
    // │  tiver o token (Base64 NÃO é criptografia!).                    │
    // │  ⚠️ NUNCA coloque dados sensíveis (senha, CPF) no payload.      │
    // │                                                                   │
    // │  PARÂMETRO 2 — Segredo (chave HMAC):                            │
    // │  A mesma chave usada para assinar E verificar. Quem tem a chave │
    // │  pode criar tokens válidos.                                      │
    // │                                                                   │
    // │  PARÂMETRO 3 — Opções:                                           │
    // │  • expiresIn: tempo de vida do token                             │
    // │                                                                   │
    // │  O QUE jwt.sign() FAZ INTERNAMENTE:                              │
    // │  1. Cria o Header JSON: {"alg":"HS256","typ":"JWT"}              │
    // │  2. Cria o Payload JSON: {"id":1,...,"iat":xxx,"exp":xxx}        │
    // │  3. Codifica ambos em Base64URL                                  │
    // │  4. Concatena: base64(header) + "." + base64(payload)           │
    // │  5. Calcula HMAC-SHA256 dessa concatenação com o segredo        │
    // │  6. Codifica a assinatura em Base64URL                           │
    // │  7. Resultado: header.payload.signature                          │
    // │                                                                   │
    // │  EXEMPLO DE TOKEN GERADO:                                        │
    // │  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.                         │
    // │  eyJpZCI6MSwiZW1haWwiOiJ0ZXN0ZUB0ZXN0ZS5jb20iLCJpYXQiOjE2OT.. │
    // │  .SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c                  │
    // │  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^               │
    // │  Header          Payload              Signature                  │
    // └───────────────────────────────────────────────────────────────────┘
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      // ⚠️ NÃO inclua user.password aqui!
    };

    const token = jwt.sign(payload, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    // ── Resposta de sucesso com o token ─────────────────────────────────
    return res.status(200).json({
      status: 'success',
      message: 'Login realizado com sucesso!',
      token,
      // Também retornamos dados do usuário (sem senha)
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    return next(err);
  }
}

module.exports = { register, login };

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  src/middlewares/authMiddleware.js — Verificação do Token JWT               ║
// ╠══════════════════════════════════════════════════════════════════════════════╣
// ║                                                                            ║
// ║  FLUXO DO MIDDLEWARE (corresponde ao diagrama de sequência):               ║
// ║                                                                            ║
// ║  1. Extrai o cabeçalho "Authorization" do request HTTP.                    ║
// ║  2. Faz o parse da string para separar a palavra "Bearer" do token.        ║
// ║  3. Chama jwt.verify() que internamente:                                   ║
// ║     a) Decodifica as partes Base64URL (Header + Payload)                   ║
// ║     b) Recalcula o Hash HMAC-SHA256 usando o segredo                       ║
// ║     c) Faz comparação de tempo constante (proteção contra Timing Attack)   ║
// ║     d) Verifica se o token expirou (campo "exp")                           ║
// ║  4. Se válido → injeta o payload em req.user e chama next()                ║
// ║  5. Se inválido → lança erro tratado pelo errorMiddleware                  ║
// ║                                                                            ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

// ═══════════════════════════════════════════════════════════════════════════════
// O QUE É UM MIDDLEWARE NO EXPRESS?
// ─────────────────────────────────
// Middleware é uma função que intercepta o ciclo de vida de uma requisição.
// Ela recebe (req, res, next) e pode:
//   • Modificar req ou res
//   • Encerrar a requisição (enviando resposta)
//   • Chamar next() para passar o controle ao próximo middleware/rota
//
// Neste caso, o middleware verifica se o usuário está autenticado ANTES
// de permitir acesso à rota protegida.
// ═══════════════════════════════════════════════════════════════════════════════

function authMiddleware(req, res, next) {
  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  PASSO 1: Extrair o cabeçalho Authorization                            │
  // ├─────────────────────────────────────────────────────────────────────────┤
  // │  O padrão HTTP para autenticação via token é enviar o cabeçalho:       │
  // │                                                                         │
  // │    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx.yyy │
  // │                   ^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    │
  // │                   Tipo   Token JWT (3 partes separadas por ponto)      │
  // │                                                                         │
  // │  req.headers.authorization acessa esse cabeçalho.                      │
  // │  O Express converte automaticamente o nome do cabeçalho para           │
  // │  minúsculo (authorization, não Authorization).                         │
  // └─────────────────────────────────────────────────────────────────────────┘
  const authHeader = req.headers.authorization;

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  PASSO 2: Verificar se o cabeçalho existe                               │
  // ├─────────────────────────────────────────────────────────────────────────┤
  // │  Se o cliente não enviou o header, não há token para verificar.        │
  // │  Retornamos 401 (Unauthorized) imediatamente.                          │
  // │                                                                         │
  // │  POR QUE 401 E NÃO 403?                                                │
  // │  • 401 = "Quem é você?" (não autenticado)                              │
  // │  • 403 = "Sei quem é, mas não tem permissão" (não autorizado)          │
  // └─────────────────────────────────────────────────────────────────────────┘
  if (!authHeader) {
    // Criamos um objeto Error e adicionamos a propriedade statusCode.
    // O errorMiddleware vai usar isso para definir o HTTP status correto.
    const error = new Error('Token não fornecido. Envie o header: Authorization: Bearer <token>');
    error.statusCode = 401;
    // Passamos o erro para o next(). Quando next() recebe um argumento,
    // o Express pula TODOS os middlewares normais e vai direto para o
    // middleware de erro (aquele com 4 parâmetros: err, req, res, next).
    return next(error);
  }

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  PASSO 3: Parse da string — separar "Bearer" do token                   │
  // ├─────────────────────────────────────────────────────────────────────────┤
  // │  authHeader.split(' ') divide a string pelo espaço:                    │
  // │                                                                         │
  // │  "Bearer eyJhbGciOi..." → ["Bearer", "eyJhbGciOi..."]                 │
  // │                                                                         │
  // │  Usamos destructuring para pegar as duas partes:                       │
  // │    parts[0] → "Bearer" (o esquema de autenticação)                     │
  // │    parts[1] → o token JWT em si                                        │
  // └─────────────────────────────────────────────────────────────────────────┘
  const parts = authHeader.split(' ');

  // Validação: o header deve ter EXATAMENTE 2 partes
  if (parts.length !== 2) {
    const error = new Error('Formato do token inválido. Use: Bearer <token>');
    error.statusCode = 401;
    return next(error);
  }

  // Destructuring: extrai as duas partes em variáveis nomeadas
  const [scheme, token] = parts;

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  PASSO 4: Validar que o esquema é "Bearer"                              │
  // ├─────────────────────────────────────────────────────────────────────────┤
  // │  /^Bearer$/i é uma expressão regular:                                  │
  // │    ^       → início da string                                          │
  // │    Bearer  → texto literal                                             │
  // │    $       → fim da string                                             │
  // │    i       → case-insensitive (aceita "bearer", "BEARER", etc.)        │
  // │                                                                         │
  // │  .test(scheme) retorna true/false se a string combina com o regex.     │
  // └─────────────────────────────────────────────────────────────────────────┘
  if (!/^Bearer$/i.test(scheme)) {
    const error = new Error('Token mal formatado. O esquema deve ser "Bearer".');
    error.statusCode = 401;
    return next(error);
  }

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  PASSO 5: Verificar e decodificar o token com jwt.verify()              │
  // ├─────────────────────────────────────────────────────────────────────────┤
  // │                                                                         │
  // │  jwt.verify(token, segredo) faz TUDO isso internamente:                │
  // │                                                                         │
  // │  5a. DECODIFICA BASE64URL                                               │
  // │      O token JWT tem 3 partes: HEADER.PAYLOAD.SIGNATURE                │
  // │      Cada parte é codificada em Base64URL (variação segura para URLs). │
  // │      A lib decodifica Header e Payload para ler seus campos.           │
  // │                                                                         │
  // │  5b. RECALCULA O HASH HMAC-SHA256                                       │
  // │      Pega o HEADER + "." + PAYLOAD e aplica HMAC-SHA256 com o segredo. │
  // │      HMAC = Hash-based Message Authentication Code                     │
  // │      SHA256 = Secure Hash Algorithm de 256 bits                        │
  // │      O resultado é uma nova assinatura.                                │
  // │                                                                         │
  // │  5c. COMPARAÇÃO DE TEMPO CONSTANTE                                      │
  // │      Compara a assinatura recalculada com a assinatura do token.       │
  // │      Usa crypto.timingSafeEqual() internamente.                        │
  // │                                                                         │
  // │      ⚠️ POR QUE NÃO USAR "===" ?                                      │
  // │      O operador === para nas primeiras diferenças entre strings.       │
  // │      Um atacante pode medir o tempo de resposta e descobrir            │
  // │      byte a byte qual é a assinatura correta (Timing Attack).          │
  // │      timingSafeEqual() SEMPRE leva o mesmo tempo, não importa          │
  // │      quantos bytes estejam corretos.                                   │
  // │                                                                         │
  // │  5d. VERIFICA EXPIRAÇÃO                                                 │
  // │      O payload contém o campo "exp" (expiration time) em segundos      │
  // │      desde Unix Epoch (01/01/1970).                                    │
  // │      Se exp < Date.now()/1000, o token está expirado.                  │
  // │                                                                         │
  // └─────────────────────────────────────────────────────────────────────────┘
  try {
    // jwt.verify() retorna o payload decodificado SE o token for válido.
    // Caso contrário, LANÇA uma exceção (por isso usamos try/catch).
    const decoded = jwt.verify(token, authConfig.secret);

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │  PASSO 6: Injetar os dados do usuário no objeto req                   │
    // ├───────────────────────────────────────────────────────────────────────┤
    // │  Adicionamos o payload decodificado em req.user.                     │
    // │  Assim, qualquer rota protegida que vier depois pode acessar         │
    // │  os dados do usuário autenticado via req.user.                       │
    // │                                                                       │
    // │  Exemplo de payload decodificado:                                    │
    // │  {                                                                    │
    // │    id: 42,                                                            │
    // │    email: "aluno@senai.com",                                         │
    // │    role: "admin",                                                     │
    // │    iat: 1691234567,    ← issued at (quando foi criado)               │
    // │    exp: 1691238167     ← expiration (quando expira)                  │
    // │  }                                                                    │
    // └───────────────────────────────────────────────────────────────────────┘
    req.user = decoded;

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │  PASSO 7: Chamar next() — Passar o controle adiante                   │
    // ├───────────────────────────────────────────────────────────────────────┤
    // │  next() sem argumentos diz ao Express: "tudo certo, pode seguir      │
    // │  para o próximo middleware ou para a rota final".                     │
    // │                                                                       │
    // │  Se não chamássemos next(), a requisição ficaria "pendurada"         │
    // │  (hanging) e o cliente nunca receberia resposta.                     │
    // └───────────────────────────────────────────────────────────────────────┘
    return next();

  } catch (jwtError) {
    // ┌───────────────────────────────────────────────────────────────────────┐
    // │  TRATAMENTO DE ERROS DO jwt.verify()                                  │
    // ├───────────────────────────────────────────────────────────────────────┤
    // │  A lib jsonwebtoken lança erros específicos:                         │
    // │                                                                       │
    // │  • TokenExpiredError  → O token era válido, mas expirou.             │
    // │    Propriedade extra: err.expiredAt (data de expiração)              │
    // │                                                                       │
    // │  • JsonWebTokenError  → O token é inválido (assinatura errada,      │
    // │    payload corrompido, formato incorreto, etc.)                      │
    // │                                                                       │
    // │  • NotBeforeError     → O token ainda não é válido (campo "nbf")    │
    // │                                                                       │
    // │  Identificamos o tipo do erro para dar mensagens melhores ao         │
    // │  cliente, mas NUNCA vazamos detalhes internos (segurança).           │
    // └───────────────────────────────────────────────────────────────────────┘

    let message;

    if (jwtError.name === 'TokenExpiredError') {
      // O token foi assinado corretamente, mas o tempo de vida acabou.
      // O cliente deve fazer login novamente ou usar um refresh token.
      message = 'Token expirado. Faça login novamente.';
    } else if (jwtError.name === 'JsonWebTokenError') {
      // O token foi adulterado, tem formato inválido, ou foi assinado
      // com um segredo diferente.
      message = 'Token inválido. Autenticação negada.';
    } else {
      // Qualquer outro erro inesperado.
      message = 'Falha na autenticação.';
    }

    const error = new Error(message);
    error.statusCode = 401;

    // Passamos para o errorMiddleware tratar
    return next(error);
  }
}

module.exports = authMiddleware;

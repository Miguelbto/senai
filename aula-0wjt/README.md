# 🔐 Aula JWT — Autenticação com JSON Web Token

> Projeto didático para estudar JWT com Express.js — SENAI

---

## 📂 Estrutura do Projeto

```
aula-0wjt/
├── .env                              ← Variáveis de ambiente (NÃO commitar!)
├── .env.example                      ← Template das variáveis (commitar)
├── .gitignore                        ← Arquivos ignorados pelo Git
├── package.json                      ← Dependências e scripts
├── README.md                         ← Este arquivo
└── src/
    ├── server.js                     ← Ponto de entrada (inicia o servidor)
    ├── app.js                        ← Configuração do Express (middlewares + rotas)
    ├── config/
    │   └── auth.js                   ← Segredo e expiração do JWT
    ├── controllers/
    │   └── authController.js         ← Lógica de registro e login
    ├── middlewares/
    │   ├── authMiddleware.js         ← ⭐ Verificação do token JWT
    │   └── errorMiddleware.js        ← Tratamento global de erros
    └── routes/
        ├── authRoutes.js             ← Rotas públicas (register, login)
        └── protectedRoutes.js        ← Rotas protegidas (profile, dashboard)
```

---

## 🧠 O que é JWT?

**JWT (JSON Web Token)** é um padrão aberto ([RFC 7519](https://tools.ietf.org/html/rfc7519)) que define uma forma compacta e autossuficiente de transmitir informações entre partes como um objeto JSON assinado digitalmente.

### Anatomia de um Token JWT

Um token JWT tem **3 partes** separadas por pontos (`.`):

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0ZUB0ZXN0ZS5jb20ifQ.abc123
├───────── HEADER ─────────┤├──────────── PAYLOAD ───────────────┤├── SIGNATURE ──┤
```

| Parte | Conteúdo | Codificação |
|-------|----------|-------------|
| **Header** | Algoritmo (`HS256`) e tipo (`JWT`) | Base64URL |
| **Payload** | Dados do usuário (`id`, `email`, `exp`...) | Base64URL |
| **Signature** | Hash HMAC-SHA256 do Header + Payload com o segredo | Base64URL |

> ⚠️ **Base64 NÃO é criptografia!** Qualquer pessoa pode decodificar o Header e o Payload. A assinatura garante apenas **integridade** (ninguém alterou os dados) e **autenticidade** (só quem tem o segredo pode criar tokens válidos).

---

## 🔄 Fluxo Completo (Diagrama de Sequência)

```
Cliente                    authMiddleware              jwt.verify()               Rota Protegida
  │                              │                          │                          │
  │── Request + Bearer token ──→ │                          │                          │
  │                              │── Extrai token ─────────→│                          │
  │                              │                          │── Decodifica Base64URL   │
  │                              │                          │── Recalcula HMAC-SHA256  │
  │                              │                          │── Comparação segura      │
  │                              │                          │── Verifica expiração     │
  │                              │                          │                          │
  │                              │←── Payload decodificado ─│                          │
  │                              │                          │                          │
  │                              │── req.user = payload     │                          │
  │                              │── next() ───────────────────────────────────────────→│
  │                              │                                                     │
  │←──────────────────── 200 OK + Dados ──────────────────────────────────────────────│
```

---

## ⚙️ Como Rodar

### 1. Instalar dependências

```bash
cd aula-0wjt
npm install
```

### 2. Configurar variáveis de ambiente

Copie o `.env.example` para `.env`:

```bash
cp .env.example .env
```

### 3. Iniciar o servidor

```bash
npm run dev
```

O servidor vai rodar em `http://localhost:3000`.

---

## 🧪 Testando com cURL / Thunder Client / Postman

### 1️⃣ Registrar um usuário

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Miguel","email":"miguel@senai.com","password":"123456"}'
```

**Resposta esperada:**
```json
{
  "status": "success",
  "message": "Usuário registrado com sucesso!",
  "user": { "id": 1, "name": "Miguel", "email": "miguel@senai.com" }
}
```

### 2️⃣ Fazer Login (receber o token)

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"miguel@senai.com","password":"123456"}'
```

**Resposta esperada:**
```json
{
  "status": "success",
  "message": "Login realizado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "name": "Miguel", "email": "miguel@senai.com" }
}
```

### 3️⃣ Acessar rota protegida (com token)

```bash
curl http://localhost:3000/protected/profile \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resposta esperada (200 OK):**
```json
{
  "status": "success",
  "message": "Você acessou uma rota protegida!",
  "user": { "id": 1, "name": "Miguel", "email": "miguel@senai.com" }
}
```

### 4️⃣ Acessar sem token (erro)

```bash
curl http://localhost:3000/protected/profile
```

**Resposta esperada (401):**
```json
{
  "status": "error",
  "statusCode": 401,
  "message": "Token não fornecido. Envie o header: Authorization: Bearer <token>"
}
```

### 5️⃣ Acessar com token inválido (erro)

```bash
curl http://localhost:3000/protected/profile \
  -H "Authorization: Bearer token_falso_123"
```

**Resposta esperada (401):**
```json
{
  "status": "error",
  "statusCode": 401,
  "message": "Token inválido. Autenticação negada."
}
```

---

## 📚 Conceitos-Chave para Estudar

### 🔑 HMAC-SHA256
- **HMAC** = Hash-based Message Authentication Code
- **SHA-256** = Algoritmo de hash de 256 bits
- Combina os dados (Header + Payload) com um **segredo** para gerar uma assinatura
- Só quem tem o segredo pode recriar a mesma assinatura

### ⏰ Timing Attack (e por que importa)
- Se compararmos strings byte a byte com `===`, o tempo de resposta varia
- Um atacante pode medir essas variações e descobrir a assinatura correta
- `crypto.timingSafeEqual()` **SEMPRE leva o mesmo tempo**, independente de quantos bytes estão corretos

### 🔒 bcrypt (Hash de Senhas)
- **Nunca** armazene senhas em texto puro
- bcrypt adiciona um **salt** (string aleatória) antes de fazer o hash
- O hash é **irreversível** — não dá para "desencriptar"
- `bcrypt.compare()` verifica a senha sem expor o hash

### 🍪 JWT vs. Sessão (Session)

| Aspecto | JWT (Token) | Sessão (Cookie) |
|---------|-------------|------------------|
| **Armazenamento** | Cliente (localStorage/cookie) | Servidor (memória/banco) |
| **Stateless?** | ✅ Sim | ❌ Não |
| **Escalabilidade** | Alta (sem estado no servidor) | Baixa (precisa compartilhar estado) |
| **Revogação** | Difícil (precisa de blacklist) | Fácil (deletar do banco) |
| **Tamanho** | Maior (payload embutido) | Menor (apenas um ID) |

---

## 📦 Dependências Utilizadas

| Pacote | Para quê? |
|--------|-----------|
| `express` | Framework web para criar o servidor HTTP e gerenciar rotas |
| `jsonwebtoken` | Criar (`sign`) e verificar (`verify`) tokens JWT |
| `bcryptjs` | Hash seguro de senhas com salt |
| `dotenv` | Carregar variáveis de ambiente do arquivo `.env` |

---

## 🗺️ Ordem de Leitura Recomendada

Para entender o projeto completo, leia os arquivos nesta ordem:

1. **`.env`** — Entender as variáveis de configuração
2. **`src/config/auth.js`** — Como o segredo é carregado
3. **`src/server.js`** — Como o servidor inicia
4. **`src/app.js`** — Como o Express é configurado (ordem dos middlewares!)
5. **`src/routes/authRoutes.js`** — Rotas públicas
6. **`src/controllers/authController.js`** — Lógica de registro e login + jwt.sign()
7. **`src/middlewares/authMiddleware.js`** — ⭐ O coração do projeto: jwt.verify()
8. **`src/middlewares/errorMiddleware.js`** — Tratamento de erros
9. **`src/routes/protectedRoutes.js`** — Rotas que usam o middleware

---

## 🎯 Exercícios Sugeridos

1. **Adicione um campo `role`** (ex: `"admin"`, `"user"`) ao registro e inclua no payload do JWT
2. **Crie um middleware `authorizeRole()`** que verifique se `req.user.role === 'admin'`
3. **Troque o expiresIn** para `"10s"` e veja o que acontece quando o token expira
4. **Cole um token** em [jwt.io](https://jwt.io) e inspecione o Header e Payload
5. **Altere o JWT_SECRET** no `.env` e tente usar um token antigo — o que acontece?

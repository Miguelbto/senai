// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  src/app.js — Configuração do Aplicativo Express                           ║
// ╠══════════════════════════════════════════════════════════════════════════════╣
// ║                                                                            ║
// ║  POR QUE SEPARAR app.js DE server.js?                                     ║
// ║  ─────────────────────────────────────                                    ║
// ║  • app.js → configura o Express (middlewares, rotas, etc.)                ║
// ║  • server.js → inicia o servidor (app.listen)                             ║
// ║                                                                            ║
// ║  Essa separação facilita testes: você pode importar o app sem             ║
// ║  iniciar o servidor, ideal para testes automatizados com Supertest.       ║
// ║                                                                            ║
// ║  ORDEM DOS MIDDLEWARES (IMPORTA MUITO!):                                  ║
// ║  1. express.json() — para parsear JSON do corpo da requisição             ║
// ║  2. Rotas públicas (login, registro)                                      ║
// ║  3. Rotas protegidas (com authMiddleware)                                 ║
// ║  4. Middleware de erro (SEMPRE por último!)                                ║
// ║                                                                            ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

const express = require('express');

// ── Importação das rotas ──────────────────────────────────────────────────────
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

// ── Importação do middleware de erro ──────────────────────────────────────────
const errorMiddleware = require('./middlewares/errorMiddleware');

// ═══════════════════════════════════════════════════════════════════════════════
// CRIAÇÃO DA INSTÂNCIA DO EXPRESS
// ────────────────────────────────
// express() cria uma instância de aplicação Express.
// Esta instância é o coração do nosso servidor:
// • Registra middlewares com app.use()
// • Define rotas com app.get(), app.post(), etc.
// • Inicia o servidor com app.listen()
// ═══════════════════════════════════════════════════════════════════════════════
const app = express();

// ┌─────────────────────────────────────────────────────────────────────────────┐
// │  MIDDLEWARE: express.json()                                                │
// ├─────────────────────────────────────────────────────────────────────────────┤
// │  Parseia o corpo (body) de requisições com Content-Type: application/json │
// │                                                                            │
// │  Sem este middleware:                                                      │
// │    req.body → undefined                                                   │
// │                                                                            │
// │  Com este middleware:                                                      │
// │    req.body → { "email": "aluno@senai.com", "password": "123" }          │
// │                                                                            │
// │  DEVE ser registrado ANTES de qualquer rota que lê req.body.             │
// └─────────────────────────────────────────────────────────────────────────────┘
app.use(express.json());

// ┌─────────────────────────────────────────────────────────────────────────────┐
// │  ROTA RAIZ — Health Check / Boas-vindas                                    │
// ├─────────────────────────────────────────────────────────────────────────────┤
// │  Rota simples para verificar se o servidor está rodando.                  │
// │  Acessar: GET http://localhost:3000/                                       │
// └─────────────────────────────────────────────────────────────────────────────┘
app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: '🔐 API JWT — Aula SENAI — Servidor rodando!',
    endpoints: {
      registro: 'POST /auth/register',
      login: 'POST /auth/login',
      perfil: 'GET /protected/profile  (requer token)',
      dashboard: 'GET /protected/dashboard  (requer token)',
    },
  });
});

// ┌─────────────────────────────────────────────────────────────────────────────┐
// │  MONTAGEM DAS ROTAS                                                        │
// ├─────────────────────────────────────────────────────────────────────────────┤
// │  app.use('/prefixo', router) monta um grupo de rotas sob um prefixo.     │
// │                                                                            │
// │  '/auth'      + authRoutes      → POST /auth/register, POST /auth/login  │
// │  '/protected' + protectedRoutes → GET /protected/profile, GET /protected/dashboard │
// └─────────────────────────────────────────────────────────────────────────────┘
app.use('/auth', authRoutes);          // Rotas PÚBLICAS (sem token)
app.use('/protected', protectedRoutes); // Rotas PROTEGIDAS (com token)

// ┌─────────────────────────────────────────────────────────────────────────────┐
// │  MIDDLEWARE DE ERRO — DEVE SER O ÚLTIMO app.use()!                         │
// ├─────────────────────────────────────────────────────────────────────────────┤
// │  O Express processa middlewares na ORDEM em que são registrados.           │
// │  O middleware de erro deve vir por último para capturar erros de          │
// │  qualquer rota ou middleware que veio antes.                               │
// │                                                                            │
// │  Se registrar o errorMiddleware ANTES das rotas, ele nunca será chamado   │
// │  porque os erros ainda não foram gerados.                                 │
// └─────────────────────────────────────────────────────────────────────────────┘
app.use(errorMiddleware);

module.exports = app;

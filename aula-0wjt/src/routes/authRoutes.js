// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  src/routes/authRoutes.js — Rotas Públicas de Autenticação                 ║
// ╠══════════════════════════════════════════════════════════════════════════════╣
// ║                                                                            ║
// ║  Estas rotas são PÚBLICAS (não exigem token):                             ║
// ║  • POST /auth/register → Cria um novo usuário                             ║
// ║  • POST /auth/login    → Autentica e retorna um token JWT                 ║
// ║                                                                            ║
// ║  POR QUE SÃO PÚBLICAS?                                                    ║
// ║  Um usuário que ainda não tem conta não pode ter token.                    ║
// ║  Portanto, registro e login devem ser acessíveis sem autenticação.        ║
// ║                                                                            ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

const { Router } = require('express');
const authController = require('../controllers/authController');

// ═══════════════════════════════════════════════════════════════════════════════
// O QUE É O Router() DO EXPRESS?
// ───────────────────────────────
// Router() cria um "mini-aplicativo" de rotas que pode ser montado no app
// principal. Isso permite organizar as rotas em arquivos separados.
//
// É como criar um "módulo" de rotas. No app.js, fazemos:
//   app.use('/auth', authRoutes)
//
// Isso significa que todas as rotas definidas aqui terão o prefixo /auth:
//   router.post('/register')  →  POST /auth/register
//   router.post('/login')     →  POST /auth/login
// ═══════════════════════════════════════════════════════════════════════════════
const router = Router();

// POST /auth/register — Registro de novo usuário
// O Express pega o corpo da requisição (JSON), parseia, e disponibiliza em req.body.
// (Isso só funciona porque ativamos express.json() no app.js)
router.post('/register', authController.register);

// POST /auth/login — Login (retorna o token JWT)
router.post('/login', authController.login);

module.exports = router;

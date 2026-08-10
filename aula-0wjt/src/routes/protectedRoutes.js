// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  src/routes/protectedRoutes.js — Rotas Protegidas (exigem JWT)             ║
// ╠══════════════════════════════════════════════════════════════════════════════╣
// ║                                                                            ║
// ║  Estas rotas são PROTEGIDAS pelo authMiddleware:                           ║
// ║  • GET /protected/profile   → Retorna dados do usuário autenticado        ║
// ║  • GET /protected/dashboard → Dados simulados de um dashboard             ║
// ║                                                                            ║
// ║  Para acessar essas rotas, o cliente DEVE enviar:                         ║
// ║    Header: Authorization: Bearer <token_jwt_aqui>                         ║
// ║                                                                            ║
// ║  Se não enviar ou se o token for inválido/expirado, o authMiddleware      ║
// ║  rejeita a requisição ANTES de chegar aqui.                               ║
// ║                                                                            ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

// ═══════════════════════════════════════════════════════════════════════════════
// APLICANDO O MIDDLEWARE NO NÍVEL DO ROUTER
// ──────────────────────────────────────────
// router.use(authMiddleware) aplica o middleware a TODAS as rotas definidas
// neste router. Isso significa que qualquer rota abaixo desta linha
// passará pelo authMiddleware antes de executar.
//
// Alternativa: aplicar em rotas individuais:
//   router.get('/profile', authMiddleware, (req, res) => { ... })
//
// A abordagem com router.use() é mais limpa quando TODAS as rotas do
// grupo precisam de autenticação.
// ═══════════════════════════════════════════════════════════════════════════════
router.use(authMiddleware);

// ┌─────────────────────────────────────────────────────────────────────────────┐
// │  GET /protected/profile — Perfil do Usuário Autenticado                    │
// ├─────────────────────────────────────────────────────────────────────────────┤
// │  req.user foi injetado pelo authMiddleware (passo 6 do diagrama).         │
// │  Contém o payload decodificado do token JWT:                              │
// │  { id, name, email, iat, exp }                                            │
// │                                                                            │
// │  Note que os dados vêm do TOKEN, não do banco de dados.                   │
// │  Se o usuário alterar o nome no banco depois de gerar o token,            │
// │  o token ainda terá o nome antigo até expirar.                            │
// │  Isso é uma limitação de tokens stateless.                                │
// └─────────────────────────────────────────────────────────────────────────────┘
router.get('/profile', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'Você acessou uma rota protegida!',
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    },
    // Informações extras sobre o token (para fins didáticos):
    tokenInfo: {
      // iat = Issued At → Quando o token foi criado (Unix timestamp)
      emitidoEm: new Date(req.user.iat * 1000).toLocaleString('pt-BR'),
      // exp = Expiration → Quando o token expira (Unix timestamp)
      expiraEm: new Date(req.user.exp * 1000).toLocaleString('pt-BR'),
    },
  });
});

// ┌─────────────────────────────────────────────────────────────────────────────┐
// │  GET /protected/dashboard — Exemplo de rota com dados simulados            │
// ├─────────────────────────────────────────────────────────────────────────────┤
// │  Simula dados de um dashboard que só usuários autenticados podem ver.     │
// │  Em um app real, esses dados viriam do banco de dados.                    │
// └─────────────────────────────────────────────────────────────────────────────┘
router.get('/dashboard', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: `Bem-vindo ao dashboard, ${req.user.name}!`,
    data: {
      totalPedidos: 42,
      faturamentoMensal: 'R$ 15.320,00',
      ticketMedio: 'R$ 364,76',
    },
  });
});

module.exports = router;

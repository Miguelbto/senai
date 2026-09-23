const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

/**
 * @openapi
 * /auth/registrar:
 *   post:
 *     tags: [Autenticacao]
 *     summary: Registra um usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha]
 *             properties:
 *               nome: { type: string }
 *               email: { type: string, format: email }
 *               senha: { type: string, format: password }
 *               papel: { type: string, enum: [cliente, admin] }
 *     responses:
 *       200: { description: Usuario registrado }
 *       201: { description: Usuario registrado }
 *       400: { description: Dados obrigatorios ausentes }
 *       500: { description: Erro interno do servidor }
 */
// Rota para cadastrar um novo usuário (Pode ser aberta ou bloqueada no futuro)
router.post('/registrar', UsuarioController.registrar);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Autenticacao]
 *     summary: Autentica um usuario e retorna um JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email: { type: string, format: email }
 *               senha: { type: string, format: password }
 *     responses:
 *       200:
 *         description: Login realizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso: { type: boolean }
 *                 token: { type: string }
 *                 usuario: { type: object }
 *       400: { description: Credenciais ausentes }
 *       500: { description: Erro interno do servidor }
 */
// Rota de Login (Recebe email e senha, devolve o token)
router.post('/login', UsuarioController.login);

module.exports = router;

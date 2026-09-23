const express = require('express');
const router = express.Router();
const CardapioController = require('../controllers/CardapioController');

/**
 * @openapi
 * /cardapios:
 *   get:
 *     tags: [Cardapios]
 *     summary: Lista os cardapios
 *     responses:
 *       200: { description: Lista de cardapios }
 *       400: { description: Requisicao invalida }
 *       500: { description: Erro interno do servidor }
 */
router.get('/', CardapioController.listar);

/**
 * @openapi
 * /cardapios/{id}:
 *   get:
 *     tags: [Cardapios]
 *     summary: Busca um cardapio pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Cardapio encontrado }
 *       400: { description: ID invalido }
 *       500: { description: Erro interno do servidor }
 */
router.get('/:id', CardapioController.buscarPorId);

/**
 * @openapi
 * /cardapios:
 *   post:
 *     tags: [Cardapios]
 *     summary: Cadastra um cardapio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, produtos]
 *             properties:
 *               nome: { type: string }
 *               descricao: { type: string }
 *               disponivel: { type: boolean }
 *               produtos: { type: array, items: { type: integer }, example: [1, 2] }
 *     responses:
 *       200: { description: Cardapio cadastrado }
 *       201: { description: Cardapio cadastrado }
 *       400: { description: Dados invalidos }
 *       500: { description: Erro interno do servidor }
 */
router.post('/', CardapioController.cadastrar);

/**
 * @openapi
 * /cardapios/{id}:
 *   delete:
 *     tags: [Cardapios]
 *     summary: Exclui um cardapio
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Cardapio excluido }
 *       400: { description: ID invalido }
 *       500: { description: Erro interno do servidor }
 */
router.delete('/:id', CardapioController.deletar);

module.exports = router;

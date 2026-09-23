const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/PedidoController');

/**
 * @openapi
 * /pedidos:
 *   post:
 *     tags: [Pedidos]
 *     summary: Cria um pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [cliente, itens]
 *             properties:
 *               cliente: { type: string }
 *               itens: { type: array, items: { $ref: '#/components/schemas/ItemPedido' } }
 *     responses:
 *       200: { description: Pedido criado }
 *       201: { description: Pedido criado }
 *       400: { description: Dados invalidos }
 *       500: { description: Erro interno do servidor }
 */
router.post('/', PedidoController.create);

/**
 * @openapi
 * /pedidos:
 *   get:
 *     tags: [Pedidos]
 *     summary: Lista os pedidos
 *     responses:
 *       200: { description: Lista de pedidos }
 *       400: { description: Requisicao invalida }
 *       500: { description: Erro interno do servidor }
 */
router.get('/', PedidoController.getAll);

/**
 * @openapi
 * /pedidos/{id}:
 *   get:
 *     tags: [Pedidos]
 *     summary: Busca um pedido pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Pedido encontrado }
 *       400: { description: ID invalido }
 *       500: { description: Erro interno do servidor }
 */
router.get('/:id', PedidoController.getById);

/**
 * @openapi
 * /pedidos/{id}/status:
 *   patch:
 *     tags: [Pedidos]
 *     summary: Atualiza o status de um pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status: { type: string, enum: [pendente, preparo, pronto, entregue] }
 *     responses:
 *       200: { description: Status atualizado }
 *       400: { description: Status invalido ou ausente }
 *       500: { description: Erro interno do servidor }
 */
router.patch('/:id/status', PedidoController.updateStatus);

/**
 * @openapi
 * /pedidos/{id}:
 *   delete:
 *     tags: [Pedidos]
 *     summary: Exclui um pedido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Pedido excluido }
 *       400: { description: ID ou pedido invalido }
 *       500: { description: Erro interno do servidor }
 */
router.delete('/:id', PedidoController.delete);

module.exports = router;

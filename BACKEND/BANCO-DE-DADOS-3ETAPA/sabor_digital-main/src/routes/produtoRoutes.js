const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');
const upload = require('../config/multer');
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

/**
 * @openapi
 * /produtos:
 *   get:
 *     tags: [Produtos]
 *     summary: Lista os produtos
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso: { type: boolean }
 *                 dados: { type: array, items: { $ref: '#/components/schemas/Produto' } }
 *                 total: { type: integer }
 *       400:
 *         description: Requisicao invalida
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Erro' }
 */
router.get('/', ProdutoController.listar);

/**
 * @openapi
 * /produtos/{id}:
 *   get:
 *     tags: [Produtos]
 *     summary: Busca um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Produto' }
 *       400:
 *         description: ID invalido
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Erro' }
 */
router.get('/:id', ProdutoController.buscarPorId);

/**
 * @openapi
 * /produtos:
 *   post:
 *     tags: [Produtos]
 *     summary: Cadastra um produto
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [nome, descricao, preco]
 *             properties:
 *               nome: { type: string }
 *               descricao: { type: string }
 *               preco: { type: number, format: float }
 *               categoria: { type: string }
 *               disponivel: { type: boolean }
 *               imagem: { type: string, format: binary }
 *     responses:
 *       200: { description: Produto cadastrado }
 *       201: { description: Produto cadastrado }
 *       400: { description: Dados invalidos }
 *       500: { description: Erro interno do servidor }
 */
router.post('/', verificarToken, verificarAdmin, upload.single('imagem'), ProdutoController.cadastrar);

/**
 * @openapi
 * /produtos/{id}:
 *   put:
 *     tags: [Produtos]
 *     summary: Atualiza um produto
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome: { type: string }
 *               descricao: { type: string }
 *               preco: { type: number, format: float }
 *               categoria: { type: string }
 *               disponivel: { type: boolean }
 *               imagem: { type: string, format: binary }
 *     responses:
 *       200: { description: Produto atualizado }
 *       400: { description: ID ou dados invalidos }
 *       500: { description: Erro interno do servidor }
 */
router.put('/:id', verificarToken, verificarAdmin, upload.single('imagem'), ProdutoController.atualizar);

/**
 * @openapi
 * /produtos/{id}:
 *   delete:
 *     tags: [Produtos]
 *     summary: Exclui um produto
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Produto excluido }
 *       400: { description: ID invalido }
 *       500: { description: Erro interno do servidor }
 */
router.delete('/:id', verificarToken, verificarAdmin, ProdutoController.deletar);

module.exports = router;

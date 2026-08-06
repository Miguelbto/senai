const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produto.controller');

// Definindo os "caminhos" (endpoints) e qual função do Controller vai atender cada um
router.get('/', produtoController.listarProdutos);
router.get('/:id', produtoController.buscarProdutoPorId);
router.post('/', produtoController.cadastrarProduto);
router.put('/:id', produtoController.atualizarProduto);
router.delete('/:id', produtoController.apagarProduto);

module.exports = router;
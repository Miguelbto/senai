const express = require('express')
const router = express.Router()
const ProdutoController = require("../controllers/ProdutoController")

router.get('/', ProdutoController.listarProduto)
router.get('/:id', ProdutoController.buscarProdutoPorId)
router.post('/', ProdutoController.cadastrarProduto)
router.put('/:id', ProdutoController.atualizarProduto)
router.delete('/:id', ProdutoController.deletarProduto)


module.exports = router
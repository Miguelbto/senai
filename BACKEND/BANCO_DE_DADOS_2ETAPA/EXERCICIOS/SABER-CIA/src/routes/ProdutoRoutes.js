const express = require('express')
const router = express.Router()
const ProdutoController = require("../controllers/ProdutoController")
const upload = require ("../config/uploadConfig")

router.get('/', ProdutoController.listarProduto)
router.get('/:id', ProdutoController.buscarProdutoPorId)
router.post('/', upload.single('imagem'), ProdutoController.cadastrarProduto)
router.put('/:id', upload.single('imagem'), ProdutoController.atualizarProduto)
router.delete('/:id', ProdutoController.deletarProduto)


module.exports = router
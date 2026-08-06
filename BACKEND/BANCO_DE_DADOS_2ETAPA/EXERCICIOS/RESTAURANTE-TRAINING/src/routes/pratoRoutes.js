const express = require ('express')
const router = express.Router()
const produtoController = require('../controllers/produtoController')

router.delete('/:id', produtoController.deletarProduto)

module.exports = router
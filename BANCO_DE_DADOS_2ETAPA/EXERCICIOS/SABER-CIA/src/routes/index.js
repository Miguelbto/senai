const express = require('express')
const router = express.Router()
const pedidoRoutes = require('./pedidosRouters')

const produtoRoutes = require('./ProdutoRoutes')

router.get('/', (req, res) => {
    res.json({
        mensagem: 'API Sabor digital',
        versao: '5.0.8'
    })
})

router.use('/produtos', produtoRoutes)
//router.use('/pedidos', pedidoRoutes)


module.exports = router
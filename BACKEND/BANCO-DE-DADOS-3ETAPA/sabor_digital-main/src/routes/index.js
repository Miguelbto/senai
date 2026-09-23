const express = require('express');
const router = express.Router();

const produtoRoutes = require('./produtoRoutes');
const cardapioRoutes = require('./cardapioRoutes');
const pedidoRoutes = require('./pedidoRoutes');
const authRoutes = require('./authRoutes');

/**
 * @openapi
 * /:
 *   get:
 *     tags: [Sistema]
 *     summary: Verifica se a API esta funcionando
 *     responses:
 *       200:
 *         description: API disponivel
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
// Rota base (Root endpoint que estava em app.js)
router.get('/', (req, res) => {
    res.json({
        mensagem: "API SaborDigital funcionando 🍝",
        versao: "1.0.0",
        arquitetura: "MVC + SOLID (Refatorada)"
    });
});

// Registrar domínios de rotas
router.use('/produtos', produtoRoutes);
router.use('/cardapios', cardapioRoutes);
router.use('/pedidos', pedidoRoutes);
router.use('/auth', authRoutes);

module.exports = router;

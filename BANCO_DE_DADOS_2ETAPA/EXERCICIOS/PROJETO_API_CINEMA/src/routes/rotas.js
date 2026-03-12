// rotas.js

const express = require('express');
const router = express.Router();
const filmeController = require('.filmeController');

// Quando alguém fizer um GET em /filmes/:id, chame a função obterFilme
router.get('/filmes/:id', filmeController.obterFilme);

module.exports = router
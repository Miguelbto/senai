const express = require('express');
const router = express.Router();
const SaidaController = require('../controllers/SaidaController');

router.get('/', SaidaController.listar);
router.get('/:id', SaidaController.buscarPorId);
router.post('/', SaidaController.cadastrar)

module.exports = router;

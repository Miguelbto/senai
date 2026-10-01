const express = require('express');
const router = express.Router();
const DevolucaoController = require('../controllers/DevolucaoController');

router.get('/', DevolucaoController.listar);
router.get('/:id', DevolucaoController.buscarPorId);
router.post('/', DevolucaoController.cadastrar)

module.exports = router;

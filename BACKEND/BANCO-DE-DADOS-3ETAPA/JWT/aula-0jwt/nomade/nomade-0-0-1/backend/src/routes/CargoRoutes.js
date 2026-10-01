const express = require('express');
const router = express.Router();
const CargoController = require('../controllers/CargoController');

router.get('/', CargoController.listar);
router.get('/:id', CargoController.buscarPorId);
router.post('/', CargoController.cadastrar);
router.put('/:id', CargoController.atualizar);
router.put('/:id', CargoController.excluir);

module.exports = router;

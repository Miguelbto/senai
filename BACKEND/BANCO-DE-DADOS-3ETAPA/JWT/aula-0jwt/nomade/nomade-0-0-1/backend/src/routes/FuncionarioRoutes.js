const express = require('express');
const router = express.Router();
const FuncionarioController = require('../controllers/FuncionarioController');

router.get('/', FuncionarioController.listarFuncionarios);

router.get('/:id', FuncionarioController.buscarPorId);

router.post('/', FuncionarioController.cadastrar);

router.put('/:id', FuncionarioController.atualizar);

router.delete('/:id', FuncionarioController.excluir);




module.exports = router;
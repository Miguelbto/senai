const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// Rota para cadastrar um novo usuário (Pode ser aberta ou bloqueada no futuro)
router.post('/registrar', UsuarioController.registrar);

// Rota de Login (Recebe email e senha, devolve o token)
router.post('/login', UsuarioController.login);

module.exports = router;

const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const router = express.Router()


router.post('/registro', UsuarioController.registrar)
router.post('/login', UsuarioController.login)
router.post('/refresh-token', UsuarioController.refresh)
router.post('/logout', UsuarioController.logout)


module.exports = router
const { Router } = require('express');
const controller = require('../controllers/favoritosController');
const delay = require('../middleware/delay');
const simularErro = require('../middleware/simularErro');

const router = Router();

router.get('/', delay, controller.listar);
router.post('/', simularErro, controller.criar);
router.put('/:id', simularErro, controller.atualizar);
router.delete('/:id', simularErro, controller.remover);

module.exports = router;

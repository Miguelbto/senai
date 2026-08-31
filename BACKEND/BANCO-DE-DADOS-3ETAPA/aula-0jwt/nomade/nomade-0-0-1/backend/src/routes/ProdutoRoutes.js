const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

router.get('/ativos', ProdutoController.listarAtivos);
router.get('/desativados', ProdutoController.listarDesativados);

router.get('/:id', (req, res, next) => {
  if (!/^\d+$/.test(req.params.id)) {
    return res.status(404).json({ sucesso: false, mensagem: 'Rota não encontrada.' });
  }
  next();
}, ProdutoController.buscarPorId);

router.post('/', ProdutoController.cadastrar);
router.put('/:id', ProdutoController.atualizar);

module.exports = router;

const express = require('express');

function createProdutosRouter(controller) {
  const router = express.Router();

  router.get('/', (req, res) => controller.listar(req, res));
  router.get('/:id', (req, res) => controller.buscarPorId(req, res));
  router.post('/', (req, res) => controller.criar(req, res));
  router.delete('/:id', (req, res) => controller.remover(req, res));

  return router;
}

module.exports = createProdutosRouter;

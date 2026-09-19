const express = require('express');
const ProdutoRepository = require('../repositories/ProdutoRepository');
const ProdutoService = require('./services/ProdutoService');
const ProdutoController = require('./controllers/ProdutoController');
const createProdutosRouter = require('./routes/produtos.routes');

// Factory: cada chamada cria uma instancia nova e isolada da app.
// Isso permite que os testes de integracao partam sempre de um estado limpo.
function createApp() {
  const app = express();
  app.use(express.json());

  const repository = new ProdutoRepository();
  const service = new ProdutoService(repository);
  const controller = new ProdutoController(service);

  app.use('/produtos', createProdutosRouter(controller));

  return app;
}

module.exports = createApp;

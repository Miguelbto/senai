const express = require("express");
const ProdutoRepository = require("../repositories/ProdutoRepository");
const ProdutoService = require("./services/ProdutoService");
const ProdutoController = require("./controllers/ProdutoController");
const createProdutosRouter = require("./routes/produtos.routes");

const ClienteRepository = require("../repositories/ClienteRepository");
const ClienteService = require("./services/ClienteService");
const ClienteController = require("./controllers/ClienteController");
const createClientesRouter = require("./routes/clientes.routes");

const PedidoRepository = require("../repositories/PedidoRepository");
const PedidoService = require("./services/PedidoService");
const PedidoController = require("./controllers/PedidoController");
const createPedidosRouter = require("./routes/pedidos.routes");

// Factory: cada chamada cria uma instancia nova e isolada da app.
// Isso permite que os testes de integracao partam sempre de um estado limpo.
function createApp() {
  const app = express();
  app.use(express.json());

  const repository = new ProdutoRepository();
  const service = new ProdutoService(repository);
  const controller = new ProdutoController(service);

  app.use("/produtos", createProdutosRouter(controller));

  const clienteRepository = new ClienteRepository();
  const clienteService = new ClienteService(clienteRepository);
  const clienteController = new ClienteController(clienteService);

  app.use("/clientes", createClientesRouter(clienteController));

  const pedidoRepository = new PedidoRepository();
  const pedidoService = new PedidoService(pedidoRepository);
  const pedidoController = new PedidoController(pedidoService);

  app.use("/pedidos", createPedidosRouter(pedidoController));

  return app;
}

module.exports = createApp;

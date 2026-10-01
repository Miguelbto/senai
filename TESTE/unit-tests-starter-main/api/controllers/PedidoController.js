class PedidoController {
  constructor(service) {
    this.service = service;
  }

  listar(req, res) {
    const pedidos = this.service.listar();
    res.json(pedidos);
  }

  buscarPorId(req, res) {
    try {
      const pedido = this.service.buscarPorId(req.params.id);
      res.json(pedido);
    } catch (err) {
      res.status(404).json({ erro: err.message });
    }
  }

  criar(req, res) {
    try {
      const pedido = this.service.criar(req.body);
      res.status(201).json(pedido);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

  atualizarStatus(req, res) {
    try {
      const pedido = this.service.atualizarStatus(req.params.id, req.body.status);
      res.json(pedido);
    } catch (err) {
      if (err.message === "Pedido nao encontrado") {
        res.status(404).json({ erro: err.message });
      } else {
        res.status(400).json({ erro: err.message });
      }
    }
  }

  remover(req, res) {
    try {
      this.service.remover(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ erro: err.message });
    }
  }
}

module.exports = PedidoController;

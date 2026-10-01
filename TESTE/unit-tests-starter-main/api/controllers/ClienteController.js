class ClienteController {
  constructor(service) {
    this.service = service;
  }

  listar(req, res) {
    const clientes = this.service.listar();
    res.json(clientes);
  }

  buscarPorId(req, res) {
    try {
      const cliente = this.service.buscarPorId(req.params.id);
      res.json(cliente);
    } catch (err) {
      res.status(404).json({ erro: err.message });
    }
  }

  criar(req, res) {
    try {
      const cliente = this.service.criar(req.body);
      res.status(201).json(cliente);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

  atualizar(req, res) {
    try {
      const cliente = this.service.atualizar(req.params.id, req.body);
      res.json(cliente);
    } catch (err) {
      if (err.message === "Cliente nao encontrado") {
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

module.exports = ClienteController;

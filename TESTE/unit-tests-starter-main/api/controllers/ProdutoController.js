class ProdutoController {
  constructor(service) {
    this.service = service;
  }

  listar(req, res) {
    const produtos = this.service.listar();
    res.json(produtos);
  }

  buscarPorId(req, res) {
    try {
      const produto = this.service.buscarPorId(req.params.id);
      res.json(produto);
    } catch (err) {
      res.status(404).json({ erro: err.message });
    }
  }

  criar(req, res) {
    try {
      const produto = this.service.criar(req.body);
      res.status(201).json(produto);
    } catch (err) {
      res.status(400).json({ erro: err.message });
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

module.exports = ProdutoController;

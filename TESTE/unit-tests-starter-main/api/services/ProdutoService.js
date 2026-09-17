class ProdutoService {
  constructor(repository) {
    this.repository = repository;
  }

  listar() {
    return this.repository.findAll();
  }

  buscarPorId(id) {
    const produto = this.repository.findById(id);
    if (!produto) throw new Error('Produto nao encontrado');
    return produto;
  }

  criar(dados) {
    return this.repository.create(dados);
  }

  remover(id) {
    const removido = this.repository.delete(id);
    if (!removido) throw new Error('Produto nao encontrado');
  }
}

module.exports = ProdutoService;

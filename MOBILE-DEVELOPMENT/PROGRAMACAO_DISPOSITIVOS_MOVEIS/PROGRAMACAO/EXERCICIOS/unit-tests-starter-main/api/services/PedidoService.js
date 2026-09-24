class PedidoService {
  constructor(repository) {
    this.repository = repository;
  }

  listar() {
    return this.repository.findAll();
  }

  buscarPorId(id) {
    const pedido = this.repository.findById(id);
    if (!pedido) throw new Error("Pedido nao encontrado");
    return pedido;
  }

  criar(dados) {
    return this.repository.create(dados);
  }

  atualizarStatus(id, novoStatus) {
    const pedidoExistente = this.repository.findById(id);
    if (!pedidoExistente) throw new Error("Pedido nao encontrado");
    return this.repository.updateStatus(id, novoStatus);
  }

  remover(id) {
    const removido = this.repository.delete(id);
    if (!removido) throw new Error("Pedido nao encontrado");
  }
}

module.exports = PedidoService;

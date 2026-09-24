class ClienteService {
  constructor(repository) {
    this.repository = repository;
  }

  listar() {
    return this.repository.findAll();
  }

  buscarPorId(id) {
    const cliente = this.repository.findById(id);
    if (!cliente) throw new Error("Cliente nao encontrado");
    return cliente;
  }

  criar(dados) {
    return this.repository.create(dados);
  }

  atualizar(id, dados) {
    const clienteExistente = this.repository.findById(id);
    if (!clienteExistente) throw new Error("Cliente nao encontrado");
    return this.repository.update(id, dados);
  }

  remover(id) {
    const removido = this.repository.delete(id);
    if (!removido) throw new Error("Cliente nao encontrado");
  }
}

module.exports = ClienteService;

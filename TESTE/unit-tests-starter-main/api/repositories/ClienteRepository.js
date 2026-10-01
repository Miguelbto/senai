class ClienteRepository {
  constructor() {
    this.clientes = [
      { id: 1, nome: "Ana Souza", email: "ana@email.com" },
      { id: 2, nome: "Bruno Lima", email: "bruno@email.com" },
    ];
    this.nextId = 3;
  }

  findAll() {
    return this.clientes;
  }

  findById(id) {
    return this.clientes.find((c) => c.id === Number(id)) || null;
  }

  findByEmail(email) {
    return this.clientes.find((c) => c.email === email) || null;
  }

  create(dados) {
    if (!dados.nome || !dados.email) {
      throw new Error("Nome e email sao obrigatorios");
    }
    if (this.findByEmail(dados.email)) {
      throw new Error("Email ja cadastrado");
    }
    const cliente = { id: this.nextId++, ...dados };
    this.clientes.push(cliente);
    return cliente;
  }

  update(id, dados) {
    const cliente = this.findById(id);
    if (!cliente) return null;

    if (dados.email && dados.email !== cliente.email && this.findByEmail(dados.email)) {
      throw new Error("Email ja cadastrado");
    }

    Object.assign(cliente, dados);
    return cliente;
  }

  delete(id) {
    const index = this.clientes.findIndex((c) => c.id === Number(id));
    if (index === -1) return false;
    this.clientes.splice(index, 1);
    return true;
  }
}

module.exports = ClienteRepository;

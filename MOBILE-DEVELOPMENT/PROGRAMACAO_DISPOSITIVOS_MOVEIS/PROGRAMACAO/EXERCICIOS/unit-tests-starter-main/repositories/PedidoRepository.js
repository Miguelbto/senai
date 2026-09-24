const STATUS_VALIDOS = ["pendente", "pago", "cancelado"];

class PedidoRepository {
  constructor() {
    this.pedidos = [
      {
        id: 1,
        cliente: "Ana Souza",
        itens: [{ nome: "Coxinha", precoUnitario: 5, quantidade: 2 }],
        status: "pendente",
        total: 10,
      },
    ];
    this.nextId = 2;
  }

  findAll() {
    return this.pedidos;
  }

  findById(id) {
    return this.pedidos.find((p) => p.id === Number(id)) || null;
  }

  create(dados) {
    if (!dados.cliente) {
      throw new Error("Cliente e obrigatorio");
    }
    if (!Array.isArray(dados.itens) || dados.itens.length === 0) {
      throw new Error("Pedido deve ter ao menos um item");
    }

    const itemInvalido = dados.itens.some(
      (item) => !item.nome || item.precoUnitario <= 0 || item.quantidade <= 0,
    );
    if (itemInvalido) {
      throw new Error("Itens devem ter nome, preco e quantidade validos");
    }

    const total = dados.itens.reduce(
      (soma, item) => soma + item.precoUnitario * item.quantidade,
      0,
    );

    const pedido = {
      id: this.nextId++,
      cliente: dados.cliente,
      itens: dados.itens,
      status: "pendente",
      total,
    };
    this.pedidos.push(pedido);
    return pedido;
  }

  updateStatus(id, novoStatus) {
    const pedido = this.findById(id);
    if (!pedido) return null;

    if (!STATUS_VALIDOS.includes(novoStatus)) {
      throw new Error("Status invalido");
    }
    if (pedido.status === "cancelado") {
      throw new Error("Pedido cancelado nao pode ser alterado");
    }

    pedido.status = novoStatus;
    return pedido;
  }

  delete(id) {
    const index = this.pedidos.findIndex((p) => p.id === Number(id));
    if (index === -1) return false;
    this.pedidos.splice(index, 1);
    return true;
  }
}

module.exports = PedidoRepository;

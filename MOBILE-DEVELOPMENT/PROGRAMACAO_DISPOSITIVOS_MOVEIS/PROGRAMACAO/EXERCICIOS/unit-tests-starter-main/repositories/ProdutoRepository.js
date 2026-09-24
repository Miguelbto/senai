class ProdutoRepository {
  constructor() {
    this.produtos = [
      { id: 1, nome: 'Coxinha', preco: 5 },
      { id: 2, nome: 'Pastel', preco: 8 },
      { id: 3, nome: 'Empada', preco: 6 },
    ];
    this.nextId = 4;
  }

  findAll() {
    return this.produtos;
  }

  findById(id) {
    return this.produtos.find((p) => p.id === Number(id)) || null;
  }

  create(dados) {
    if (!dados.nome || !dados.preco) {
      throw new Error('Nome e preco sao obrigatorios');
    }
    const produto = { id: this.nextId++, ...dados };
    this.produtos.push(produto);
    return produto;
  }

  delete(id) {
    const index = this.produtos.findIndex((p) => p.id === Number(id));
    if (index === -1) return false;
    this.produtos.splice(index, 1);
    return true;
  }
}

module.exports = ProdutoRepository;

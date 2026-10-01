function calcularDesconto(preco, percentual) {
  if (typeof preco !== 'number' || preco < 0) {
    throw new Error('Preco invalido');
  }
  if (typeof percentual !== 'number' || percentual < 0 || percentual > 100) {
    throw new Error('Percentual de desconto invalido');
  }
  return preco - (preco * percentual) / 100;
}

function calcularTotal(itens) {
  if (!Array.isArray(itens) || itens.length === 0) {
    throw new Error('A lista de itens nao pode ser vazia');
  }
  return itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

function calcularFrete(totalPedido) {
  if (totalPedido >= 150) return 0;
  if (totalPedido >= 80) return 10;
  return 20;
}

module.exports = { calcularDesconto, calcularTotal, calcularFrete };

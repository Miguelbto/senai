const livros = require('../data/livros');

function buscarTodos() {
  return livros;
}

function buscarPorId(id) {
  return livros.find((l) => l.id === id) ?? null;
}

module.exports = { buscarTodos, buscarPorId };

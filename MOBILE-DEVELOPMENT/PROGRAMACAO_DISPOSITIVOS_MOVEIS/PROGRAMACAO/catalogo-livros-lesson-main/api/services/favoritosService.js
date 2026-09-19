const store = require('../data/favoritosStore');
const livrosService = require('./livrosService');

function listar() {
  // Join manual: embute os dados do livro em cada favorito
  return store.getAll().map((fav) => ({
    ...fav,
    livro: livrosService.buscarPorId(fav.livroId),
  }));
}

function criar(livroId, observacao) {
  const livro = livrosService.buscarPorId(livroId);
  if (!livro) return { erro: 'livroId invalido — livro nao encontrado', status: 400 };

  if (store.findByLivroId(livroId)) {
    return { erro: 'Este livro ja esta nos favoritos', status: 409 };
  }

  const favorito = store.create(livroId, observacao);
  return { dados: favorito, status: 201 };
}

function atualizar(id, observacao) {
  const atualizado = store.update(id, observacao);
  if (!atualizado) return { erro: 'Favorito nao encontrado', status: 404 };
  return { dados: atualizado, status: 200 };
}

function remover(id) {
  const removido = store.remove(id);
  if (!removido) return { erro: 'Favorito nao encontrado', status: 404 };
  return { status: 204 };
}

module.exports = { listar, criar, atualizar, remover };

const livrosService = require('../services/livrosService');

function listar(req, res) {
  const livros = livrosService.buscarTodos();
  res.json(livros);
}

function detalhe(req, res) {
  const id = parseInt(req.params.id, 10);
  const livro = livrosService.buscarPorId(id);
  if (!livro) return res.status(404).json({ erro: 'Livro nao encontrado' });
  res.json(livro);
}

module.exports = { listar, detalhe };

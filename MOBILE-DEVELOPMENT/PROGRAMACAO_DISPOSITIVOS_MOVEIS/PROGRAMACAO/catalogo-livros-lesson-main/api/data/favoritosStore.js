// Armazenamento em memoria dos favoritos.
// Encapsula o array mutavel e o contador de ids para evitar acesso direto.

let favoritos = [];
let nextId = 1;

function getAll() {
  return favoritos;
}

function findById(id) {
  return favoritos.find((f) => f.id === id) ?? null;
}

function findByLivroId(livroId) {
  return favoritos.find((f) => f.livroId === livroId) ?? null;
}

function create(livroId, observacao) {
  const favorito = { id: nextId++, livroId, observacao };
  favoritos.push(favorito);
  return favorito;
}

function update(id, observacao) {
  const idx = favoritos.findIndex((f) => f.id === id);
  if (idx === -1) return null;
  favoritos[idx].observacao = observacao;
  return favoritos[idx];
}

function remove(id) {
  const idx = favoritos.findIndex((f) => f.id === id);
  if (idx === -1) return false;
  favoritos.splice(idx, 1);
  return true;
}

module.exports = { getAll, findById, findByLivroId, create, update, remove };

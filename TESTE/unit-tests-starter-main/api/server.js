const express = require('express');
const createApp = require('./app');

const PORT = process.env.PORT || 3000;
const modoE2E = process.argv.includes('--e2e');

// A app "de verdade" fica numa variavel para poder ser trocada no reset.
let app = createApp();

// Servidor externo: so repassa cada requisicao para a app atual.
const server = express();

if (modoE2E) {
  // Usado pelos testes E2E para voltar aos dados iniciais antes de cada teste.
  server.post('/__reset', (req, res) => {
    app = createApp();
    res.status(204).send();
  });
}

server.use((req, res, next) => app(req, res, next));

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  if (modoE2E) {
    console.log('Modo E2E ativo: POST /__reset recria os dados iniciais');
  }
});

const createApp = require('./app');

const PORT = 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

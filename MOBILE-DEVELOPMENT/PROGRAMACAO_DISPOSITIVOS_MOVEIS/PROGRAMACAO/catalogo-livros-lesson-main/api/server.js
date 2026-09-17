const app = require('./app');
const { PORTA, SIMULAR_ERROS } = require('./config');

app.listen(PORTA, () => {
  console.log(`API Pagina Virada rodando em http://localhost:${PORTA}`);
  console.log(`Simulacao de erros: ${SIMULAR_ERROS ? 'ATIVADA' : 'DESATIVADA'}`);
});

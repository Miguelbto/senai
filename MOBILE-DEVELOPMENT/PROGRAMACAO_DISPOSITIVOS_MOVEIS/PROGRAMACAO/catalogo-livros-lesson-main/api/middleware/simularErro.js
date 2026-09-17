const { SIMULAR_ERROS, PROBABILIDADE_ERRO } = require('../config');

// Retorna 500 aleatorio em requisicoes de escrita para forcar tratamento de erro nos alunos.
// Controlado pela flag SIMULAR_ERROS em config.js.
function simularErroMiddleware(req, res, next) {
  if (SIMULAR_ERROS && Math.random() < PROBABILIDADE_ERRO) {
    return res.status(500).json({ erro: 'Erro interno simulado — veja SIMULAR_ERROS em config.js' });
  }
  next();
}

module.exports = simularErroMiddleware;

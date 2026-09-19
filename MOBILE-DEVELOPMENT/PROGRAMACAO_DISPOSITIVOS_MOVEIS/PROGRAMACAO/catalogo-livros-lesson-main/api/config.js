// Defina como false para desligar os erros simulados durante demonstracoes
const SIMULAR_ERROS = true;

const PORTA = 3000;

// Faixa de delay artificial nos GETs (ms)
const DELAY_MIN = 300;
const DELAY_MAX = 600;

// Probabilidade de erro simulado em escrita (0.0 a 1.0)
const PROBABILIDADE_ERRO = 0.1;

module.exports = { SIMULAR_ERROS, PORTA, DELAY_MIN, DELAY_MAX, PROBABILIDADE_ERRO };

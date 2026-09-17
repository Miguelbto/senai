const { DELAY_MIN, DELAY_MAX } = require('../config');

// Aplica delay aleatorio para simular latencia de rede real nos GETs
async function delayMiddleware(req, res, next) {
  const ms = Math.floor(Math.random() * (DELAY_MAX - DELAY_MIN + 1)) + DELAY_MIN;
  await new Promise((resolve) => setTimeout(resolve, ms));
  next();
}

module.exports = delayMiddleware;

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  src/server.js — Ponto de Entrada da Aplicação                             ║
// ╠══════════════════════════════════════════════════════════════════════════════╣
// ║                                                                            ║
// ║  Este arquivo é responsável por:                                          ║
// ║  1. Carregar as variáveis de ambiente (.env)                              ║
// ║  2. Importar o app Express configurado                                    ║
// ║  3. Iniciar o servidor HTTP na porta especificada                         ║
// ║                                                                            ║
// ║  Para rodar: npm run dev (com --watch para auto-reload)                   ║
// ║              npm start   (sem auto-reload)                                ║
// ║                                                                            ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ── Carregar .env ANTES de qualquer outra importação ──────────────────────────
// dotenv.config() lê o arquivo .env na raiz do projeto e injeta cada
// variável em process.env. Deve ser a PRIMEIRA coisa a executar.
require('dotenv').config();

const app = require('./app');

// ── Definir a porta do servidor ───────────────────────────────────────────────
// process.env.PORT vem do .env. Se não existir, usamos 3000 como fallback.
// O operador || (OR) retorna o primeiro valor "truthy".
const PORT = process.env.PORT || 3000;

// ── Iniciar o servidor ───────────────────────────────────────────────────────
// app.listen() inicia um servidor HTTP que escuta na porta especificada.
// O callback é executado quando o servidor está pronto para receber conexões.
app.listen(PORT, () => {
  console.log('═══════════════════════════════════════════════════');
  console.log(`🔐 Servidor JWT rodando em: http://localhost:${PORT}`);
  console.log('═══════════════════════════════════════════════════');
  console.log('');
  console.log('Endpoints disponíveis:');
  console.log(`  GET  http://localhost:${PORT}/                    → Health Check`);
  console.log(`  POST http://localhost:${PORT}/auth/register       → Registrar`);
  console.log(`  POST http://localhost:${PORT}/auth/login          → Login`);
  console.log(`  GET  http://localhost:${PORT}/protected/profile   → Perfil (🔒)`);
  console.log(`  GET  http://localhost:${PORT}/protected/dashboard → Dashboard (🔒)`);
  console.log('');
  console.log('🔒 = Requer header: Authorization: Bearer <token>');
  console.log('═══════════════════════════════════════════════════');
});

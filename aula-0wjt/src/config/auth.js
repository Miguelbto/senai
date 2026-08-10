// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  src/config/auth.js — Configuração centralizada de autenticação            ║
// ╠══════════════════════════════════════════════════════════════════════════════╣
// ║                                                                            ║
// ║  POR QUE CENTRALIZAR?                                                      ║
// ║  ──────────────────                                                        ║
// ║  Se o segredo ou o tempo de expiração forem usados em vários arquivos      ║
// ║  (login, middleware, refresh-token…), basta alterar AQUI.                  ║
// ║  Isso segue o princípio DRY (Don't Repeat Yourself).                       ║
// ║                                                                            ║
// ║  SEGURANÇA DO SEGREDO                                                      ║
// ║  ────────────────────                                                      ║
// ║  • O JWT_SECRET NUNCA deve ficar hardcoded no código-fonte.                ║
// ║  • Em produção, use variáveis de ambiente injetadas pelo servidor          ║
// ║    (ex: Docker secrets, AWS Parameter Store, Vault).                       ║
// ║  • Um segredo fraco (ex: "123") permite que atacantes FORJEM tokens.       ║
// ║                                                                            ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// Carrega as variáveis de ambiente do arquivo .env para process.env
// Isso deve acontecer o mais cedo possível na aplicação.
require('dotenv').config();

module.exports = {
  // ─── Segredo para assinar/verificar tokens ────────────────────────────
  // process.env.JWT_SECRET lê a variável de ambiente JWT_SECRET.
  // Se ela não existir, usamos um fallback (apenas para desenvolvimento local).
  secret: process.env.JWT_SECRET || 'fallback_inseguro_trocar_em_prod',

  // ─── Tempo de expiração do token ──────────────────────────────────────
  // Formatos aceitos pela lib jsonwebtoken:
  //   '15m'  → 15 minutos
  //   '1h'   → 1 hora
  //   '7d'   → 7 dias
  //   3600   → 3600 segundos (número inteiro = segundos)
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
};

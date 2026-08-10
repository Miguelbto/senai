// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║  src/middlewares/errorMiddleware.js — Tratamento Global de Erros            ║
// ╠══════════════════════════════════════════════════════════════════════════════╣
// ║                                                                            ║
// ║  POR QUE UM MIDDLEWARE DE ERRO CENTRALIZADO?                               ║
// ║  ──────────────────────────────────────────                                ║
// ║  1. Evita repetir try/catch em cada rota                                  ║
// ║  2. Garante formato de resposta PADRONIZADO (JSON consistente)            ║
// ║  3. Impede vazamento de stacktrace para o cliente (segurança)             ║
// ║  4. Facilita logging centralizado (salvar erros em arquivo/serviço)       ║
// ║                                                                            ║
// ║  COMO O EXPRESS RECONHECE UM MIDDLEWARE DE ERRO?                           ║
// ║  ───────────────────────────────────────────────                           ║
// ║  O Express identifica middlewares de erro pela QUANTIDADE DE PARÂMETROS:  ║
// ║  • Middleware normal:  function(req, res, next) { }     → 3 parâmetros    ║
// ║  • Middleware de erro: function(err, req, res, next) { } → 4 parâmetros   ║
// ║                                                                            ║
// ║  ⚠️  Os 4 parâmetros são OBRIGATÓRIOS, mesmo que você não use o `next`.   ║
// ║      Se remover um, o Express não reconhece como middleware de erro!       ║
// ║                                                                            ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// eslint-disable-next-line no-unused-vars — next é obrigatório para o Express reconhecer
function errorMiddleware(err, req, res, next) {
  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  1. DETERMINAR O STATUS CODE                                            │
  // ├─────────────────────────────────────────────────────────────────────────┤
  // │  Se o erro que chegou tem statusCode (definido por nós no authMiddle-  │
  // │  ware), usamos ele. Caso contrário, assumimos 500 (Internal Server     │
  // │  Error) como padrão seguro.                                            │
  // │                                                                         │
  // │  Códigos comuns:                                                        │
  // │  • 400 → Bad Request (dados do cliente inválidos)                      │
  // │  • 401 → Unauthorized (não autenticado)                                │
  // │  • 403 → Forbidden (autenticado, sem permissão)                        │
  // │  • 404 → Not Found (recurso não existe)                                │
  // │  • 500 → Internal Server Error (erro do servidor)                      │
  // └─────────────────────────────────────────────────────────────────────────┘
  const statusCode = err.statusCode || 500;

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  2. LOGAR O ERRO NO SERVIDOR (apenas no console do servidor)            │
  // ├─────────────────────────────────────────────────────────────────────────┤
  // │  console.error imprime o erro completo (com stacktrace) no terminal.   │
  // │  Isso ajuda o desenvolvedor a debugar, mas NUNCA é enviado ao cliente. │
  // │                                                                         │
  // │  Em produção, substitua isso por um logger profissional como:          │
  // │  • Winston  (https://github.com/winstonjs/winston)                     │
  // │  • Pino     (https://github.com/pinojs/pino)                          │
  // │  • Morgan   (https://github.com/expressjs/morgan) — para HTTP logs    │
  // └─────────────────────────────────────────────────────────────────────────┘
  console.error('─── ERRO CAPTURADO PELO ERROR MIDDLEWARE ───');
  console.error(`Status: ${statusCode}`);
  console.error(`Mensagem: ${err.message}`);
  // Stack trace completo (mostra o caminho exato onde o erro ocorreu)
  console.error(`Stack: ${err.stack}`);
  console.error('────────────────────────────────────────────');

  // ┌─────────────────────────────────────────────────────────────────────────┐
  // │  3. ENVIAR RESPOSTA JSON PADRONIZADA                                    │
  // ├─────────────────────────────────────────────────────────────────────────┤
  // │  REGRA DE SEGURANÇA: Nunca enviar err.stack ao cliente!                │
  // │                                                                         │
  // │  O stacktrace revela:                                                  │
  // │  • Nomes de arquivos e pastas internas do servidor                     │
  // │  • Versões de bibliotecas (ajuda atacantes a encontrar CVEs)           │
  // │  • Estrutura interna da aplicação                                      │
  // │                                                                         │
  // │  Formato da resposta:                                                  │
  // │  {                                                                      │
  // │    "status": "error",                                                  │
  // │    "statusCode": 401,                                                  │
  // │    "message": "Token inválido. Autenticação negada."                   │
  // │  }                                                                      │
  // │                                                                         │
  // │  Note que APENAS a mensagem amigável é enviada.                        │
  // │  Nenhum detalhe técnico vaza para o cliente.                           │
  // └─────────────────────────────────────────────────────────────────────────┘
  return res.status(statusCode).json({
    status: 'error',
    statusCode,
    // Para erros 500, enviamos uma mensagem genérica ao cliente
    // para não vazar detalhes internos do servidor.
    message: statusCode === 500
      ? 'Erro interno do servidor. Tente novamente mais tarde.'
      : err.message,
  });
}

module.exports = errorMiddleware;

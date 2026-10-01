// ═══════════════════════════════════════════════════════════════════════════════
// src/shared/middlewares/errorMiddleware.js — Tratamento Global de Erros
// ═══════════════════════════════════════════════════════════════════════════════
//
// Middleware de erro centralizado. O Express identifica middlewares de erro
// pela QUANTIDADE DE PARÂMETROS (4 obrigatórios: err, req, res, next).
//
// ═══════════════════════════════════════════════════════════════════════════════

// eslint-disable-next-line no-unused-vars — next é obrigatório para o Express reconhecer
function errorMiddleware(err, req, res, next) {
    const statusCode = err.statusCode || err.status || 500;

    console.error('─── ERRO CAPTURADO PELO ERROR MIDDLEWARE ───');
    console.error(`Status: ${statusCode}`);
    console.error(`Mensagem: ${err.message}`);
    console.error(`Stack: ${err.stack}`);
    console.error('────────────────────────────────────────────');

    return res.status(statusCode).json({
        status: 'error',
        statusCode,
        message: statusCode === 500
            ? 'Erro interno do servidor. Tente novamente mais tarde.'
            : err.message,
    });
}

export default errorMiddleware;

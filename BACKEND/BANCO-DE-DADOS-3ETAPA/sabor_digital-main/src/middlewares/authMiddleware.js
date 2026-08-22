const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'chave_super_secreta_sabor_digital_123';

const verificarToken = (req, res, next) => {
    // Busca o header de autorização (ex: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ sucesso: false, mensagem: "Token de autenticação não fornecido" });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ sucesso: false, mensagem: "Token inválido (Formato esperado: Bearer <token>)" });
    }

    const token = parts[1];

    try {
        const decodificado = jwt.verify(token, JWT_SECRET);
        req.usuarioId = decodificado.id;
        req.usuarioPapel = decodificado.papel;
        return next();
    } catch (err) {
        return res.status(401).json({ sucesso: false, mensagem: "Token inválido ou expirado" });
    }
};

const verificarAdmin = (req, res, next) => {
    // Esse middleware deve ser chamado DEPOIS de verificarToken
    if (req.usuarioPapel !== 'admin') {
        return res.status(403).json({ sucesso: false, mensagem: "Acesso negado. Apenas administradores podem realizar esta ação." });
    }
    return next();
};

module.exports = {
    verificarToken,
    verificarAdmin
};

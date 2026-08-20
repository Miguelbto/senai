const jwt = require('jsonwebtoken');
const { runInNewContext } = require('node:vm');

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'] //formato bearer
    const token = authHeader && authHeader.split(' ')[1]


    if (!token) {
        return res.status(401).json({ mensagem: 'Token não fornecido' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (erro, payload) => {
        if (erro) {
            return res.status(403).json({ mensagem: 'Token inválido ou expirado' })
        }
        req.usuario = payload
        next()
    })

}

function verificarAdmin(req, res, next) {
    if (req.usuario?.papel !== 'admin') {
        return res.status(403).json({ mensagem: 'Acesso restrito a administrador' })
    }
    next()
}




module.exports = { verificarAdmin, verificarToken }
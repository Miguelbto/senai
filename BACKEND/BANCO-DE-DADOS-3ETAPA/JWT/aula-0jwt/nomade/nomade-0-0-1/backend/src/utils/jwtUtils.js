const jwt = require('jsonwebtoken')
const config = require('../config/environment')

const jwtUtils = {
    //Gerar token de acesso
    generateToken(payload, expiresIn = config.jwt.expiry) {
        return jwt.sign(payload, config.jwt.secret, {expiresIn})
    },

    //Gerer token de atualização
    generateRefreshToken(payload) {
        return jwt.sign(payload, config.jwt.secret, { expiresIn: '30d' })
    },

    //verificar token
    verifyToken(token) {
        try {
            return jwt.verify(token, config.jwt.secret)
        } catch (error) {
            return null
        }
    },

    //Decodificar sem verificar (apenas para debug)
    decodeToken(token){
        return jwt.decode(token)
    },

    //Exemplo de payload
    examplePayload: {
        id: 1,
        email: 'user@example.com',
        role: 'user'
    }
}


module.exports = jwtUtils
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'my_secret_key'

const verifyToken = (req, res, next) => {
    
    const authHeader = req.headers.authorization

    if(!authHeader) {
        return res.status(401).json({ sucesso: false, mensagem: "Token de autenticação não fornecido" });
    }

    const parts = authHeader.split(' ')

    if(parts.length !== 2 || parts[0] !== 'Bearer' ) {
        res.status(401).json({ success: false, message: 'Invalid token(format: Bearer)'})
    }


    const token = parts[1]

    try {
        const decodificated = jwt.verify(token, JWT_SECRET)
        req.user.id = decodificated.id,
        req.user.role = decodificated.role
        return next()
    } catch (error) {
        return status(401).json({ success: false, message: 'Acess danied. invalid token or expired'})
    }
}



const verifyAdmin  = (req, res, next) => {

    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Acess danied. ondly admin can carry out this action' })
    }
    return next()
}

module.exports = {
    verifyToken,
    verifyAdmin,
}
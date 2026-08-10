const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authheader = req.headers['authorization']
    const token = authheader && authheader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Nenhum token provido'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded // Attach decoded payload (including role) to request
        next()
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token'})
    }
}

const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user) {
            return res.status(403).json({ message: 'Not authenticated'})
        }

        if(!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: `Acess danied. Required role:${allowedRoles.join('or')}. Your role: ${req.user.role}`,})
        }

        next()
    }
}


module.exports = {verifyToken, checkRole}
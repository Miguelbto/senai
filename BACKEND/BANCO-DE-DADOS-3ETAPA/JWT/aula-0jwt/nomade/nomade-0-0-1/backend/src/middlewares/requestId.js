const { v4: uuidv4 } = require('uuid')

const requestIdMiddleware = (req, res, next) => {
    req.id = req.headers
    ['x-request-id'] || uuidv4()
    res.setHeader('X-Request-Id', req.id)
    next()
}

module.exports = requestIdMiddleware
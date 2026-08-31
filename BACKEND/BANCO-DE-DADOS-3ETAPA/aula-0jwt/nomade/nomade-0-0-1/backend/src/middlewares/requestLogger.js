// Registra o histórico de todas as requisições HTTP que chegamda API


const logger = require('../utils/logger')

const requestLogger = (req, res, next) => {
    const start = Date.now()

    res.on('finish', () => {
        const duration = Date.now() - start
        logger.info({
            requestId: req.id,
            method: req.method,
            path: req.path,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip,
            userAgent: req.get('user-agent')
        })
    })

    next()
}

module.exports = requestLogger

const winston = require('winston')
const path = require('path')

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'backend-ferraz' },
    transports: [
        // Log de erros em arquivo separado
        new winston.transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        // Todos os logs em arquivo
        new winston.transports.File({
            filename: path.join('logs', 'combined.log'),
            maxsize: 5242880,
            maxFiles: 5
        })
    ]
})

// Em desenvolvimento, também loga no console
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ level, message, timestamp, service, ...meta }) => {
                // Se message for um objeto (ex: logger.info({ method, path, ... })), serializa tudo
                const msg = typeof message === 'object'
                    ? JSON.stringify({ ...message, ...meta }, null, 2)
                    : `${message}${Object.keys(meta).length ? ' ' + JSON.stringify(meta) : ''}`
                return `${timestamp} [${level}]: ${msg}`
            })
        )
    }))
}

module.exports = logger

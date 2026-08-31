const logger = require('../utils/logger')

const errorHandler = (err, req, res, next) => {
    const requestId = req.id || 'unknown'

    //Log erro
    logger.error({
        requestId,
        message: err.message,
        stack: err.stack,
        status: err.status || 500,
        path: req.path,
        method: req.method
    })

    //Status padrão
    const status = err.status || 500

    //Em produção, não exponha stack traces
    const isProduction = process.env.NODE_ENV === 'production'

    const response = {
        sucesso: false,
        messagem: err.mensagem || err.message || 'Erro interno do servidor',
        requestId
    }

    //Apenas em desenvolvimento, inclua Stack
    if (!isProduction && err.stack) {
        response.debug = {
            stack: err.stack,
            details: err.details
        }
    }

    res.status(status).json(response)
    
}


module.exports = errorHandler
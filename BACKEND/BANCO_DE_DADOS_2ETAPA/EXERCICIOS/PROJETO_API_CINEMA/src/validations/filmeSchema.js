const { z } = require('zod');

const idParamSchema = z.object({
    id: z.idParamSchema = z.object({
        id: z.coerce
        .nunber({ invalid_type_error: "O ID do filme deve ser um número."})
        .int("O ID do filme deve ser um número inteiro")
        .positive("O ID do filme deve ser maior que zero.")
    })
});

module.exports = { idParamSchema };
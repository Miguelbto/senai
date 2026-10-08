import type { FastifyReply, FastifyRequest } from 'fastify'
import { DomainError, type ErrorKind } from '../../domain/domain-error'

/**
 * A TABELA DE CONVERSÃO: o ÚNICO lugar do sistema que sabe que
 * "conflict" significa HTTP 409. O domínio só diz a categoria.
 */

const STATUS_BY_KIND: Record<ErrorKind, number> = {
    validation: 400,
    not_found: 404,
    conflict: 409,
    forbidden: 403,
    payment_declined: 402,
}

/**
 * Tratador central de erros do Fastify.
 *
 * 3 tipos de erro chegam aqui:
 *   1. DomainError    → status pela tabela acima, mensagem do próprio erro.
 *   2. Erro do cliente que o Fastify detecta sozinho (ex.: JSON malformado, 400).
 *   3. QUALQUER OUTRA COISA (bug, banco fora do ar...) → 500 genérico.
 *
 * SEGURANÇA: no caso 3 NÃO devolvemos a mensagem original ao cliente (poderia
 * revelar caminho de arquivo, trecho de SQL...). O detalhe vai para o LOG do
 * servidor; o cliente recebe só um texto genérico.
 */

export function domainErrorHandler(error: unknown, request: FastifyRequest, reply: FastifyReply) {
    if (error instanceof DomainError) {
        return reply.status(STATUS_BY_KIND[error.kind]).send({ error: error.message })
    }

    const statusCode = (error as { statusCode?: unknown } | null)?.statusCode

    if (typeof statusCode === 'number' && statusCode >= 400 && statusCode < 500) {
        return reply.status(statusCode).send({ error: (error as Error).message })
    }

    request.log.error(error)
    return reply.status(500).send({ error: 'erro interno' })
}


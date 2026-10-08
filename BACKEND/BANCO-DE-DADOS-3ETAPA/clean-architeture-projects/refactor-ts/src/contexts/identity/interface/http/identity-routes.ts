import type { FastifyPluginAsync } from 'fastify'
import { domainErrorHandler } from '../../../../shared-kernel/interface/http/domain-error-handler'
import type { GetUser } from '../../application/use-cases/get-user'
import type { RegisterUser } from '../../application/use-cases/register-user'


export interface IdentityRouteDeps {
    registerUser: RegisterUser;
    getUser: GetUser;
}

/** Texto ou nada: valores que não são string são tratados como "ausentes" (viram 400). */
function asString(value: unknown): string {
    return typeof value === 'string' ? value : ''
}

/**
 * ============================================================
 *  Rotas HTTP do contexto Identity (um PLUGIN do Fastify)
 * ============================================================
 * Regra das rotas FINAS: cada rota faz exatamente 3 coisas:
 *   extrair dados da requisição → chamar UM caso de uso → montar a resposta.
 * Se aparecer um `if` de regra de negócio aqui, a rota está gorda demais.
 *
 * Os casos de uso chegam por parâmetro (injeção): este arquivo não cria nada.
 *
 * ENCAPSULAMENTO DO FASTIFY: o `setErrorHandler` abaixo vale SÓ para as rotas deste
 * plugin. Na Fase 7 a mesma função vira o tratador global.
 */

export const identityRoutes: FastifyPluginAsync<IdentityRouteDeps> = async (app, deps) => {
    app.setErrorHandler(domainErrorHandler)

    app.post('/users', async (req, reply) => {
        const body = (req.body || {}) as Record<string, unknown>

        const output = await deps.registerUser.execute({
            name: asString(body.name),
            email: asString(body.email),
            password: asString(body.password),
            // QUIRK PRESERVADO NA BORDA: o legado fazia `isVip ? 1 : 0`, ou seja, QUALQUER
            // valor "truthy" vira VIP (inclusive a string 'false'!). Esse comportamento
            // estranho fica AQUI, na interface, e o domínio recebe um boolean limpo.
            isVip: Boolean(body.isVip),
        })

        return reply.status(201).send(output)
    })

    app.get<{ Params: { id: string } }>('/users/:id', async (req) => {
        return deps.getUser.execute(req.params.id)
    })
}
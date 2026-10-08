import { describe, it, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import Fastify, { type FastifyInstance } from 'fastify'
import type { RegisterUserInput } from '../../../src/contexts/identity/application/dto/register-user.dto'
import type { GetUser } from '../../../src/contexts/identity/application/use-cases/get-user'
import type { RegisterUser } from '../../../src/contexts/identity/application/use-cases/register-user'
import { identityRoutes } from '../../../src/contexts/identity/interface/http/identity-routes'

/**
 * Aqui testamos SÓ a camada HTTP, com casos de uso FALSOS (stubs). Se a rota tivesse
 * regra de negócio, estes testes não conseguiriam isolá-la. Rota fina = fácil de testar.
 */
describe('identityRoutes (camada HTTP isolada)', () => {
    let app: FastifyInstance

    afterEach(async () => app.close())

    async function build(registerUser: Partial<RegisterUser>, getUser: Partial<GetUser> = {}) {
        app = Fastify({ logger: false })
        app.register(identityRoutes, { registerUser: registerUser as RegisterUser, getUser: getUser as GetUser })
        await app.ready()
        return app
    }

    it('QUIRK na borda: isVip "false" (string) chega ao caso de uso como true', async () => {
        let received: RegisterUserInput | undefined
        await build({
            execute: async (input) => {
                received = input
                return { id: '1', name: 'A', email: 'a@b.c', isVip: input.isVip }
            },
        })

        const res = await app.inject({
            method: 'POST',
            url: '/users',
            payload: { name: 'Miguel', email: 'm@x.com', password: 'secret1', isVip: 'false' },
        })

        assert.equal(res.statusCode, 201)
        assert.equal(received?.isVip, true)
    })

    it('valores que não são texto viram "ausentes" (string vazia) antes de chegar ao caso de uso', async () => {
        let received: RegisterUserInput | undefined
        await build({
            execute: async (input) => {
                received = input
                return { id: '1', name: '', email: '', isVip: false }
            },
        })

        await app.inject({ method: 'POST', url: '/users', payload: { name: 123, email: null } })

        assert.deepEqual(received, { name: '', email: '', password: '', isVip: false })
    })

    it('erro inesperado vira 500 GENÉRICO e não vaza a mensagem interna', async () => {
        await build({
            execute: async () => {
                throw new Error('SELECT * FROM users falhou em /var/db/loja.db')
            },
        })

        const res = await app.inject({
            method: 'POST',
            url: '/users',
            payload: { name: 'Miguel', email: 'm@x.com', password: 'secret1' },
        })

        assert.equal(res.statusCode, 500)
        assert.deepEqual(res.json(), { error: 'erro interno' })
        assert.equal(res.body.includes('loja.db'), false)
    })

    it('JSON malformado continua sendo 400 (erro do cliente, não 500)', async () => {
        await build({ execute: async () => ({ id: '1', name: '', email: '', isVip: false }) })

        const res = await app.inject({
            method: 'POST',
            url: '/users',
            headers: { 'content-type': 'application/json' },
            payload: '{ isso nao e json',
        })

        assert.equal(res.statusCode, 400)
    })
})

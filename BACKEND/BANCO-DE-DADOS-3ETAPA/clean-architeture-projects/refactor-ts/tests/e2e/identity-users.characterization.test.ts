import { describe, it, beforeEach, afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'
import type { FastifyInstance } from 'fastify'
import { buildIdentityApp } from '../support/identity/build-identity-app'

// >>> ESTE ARQUIVO É O SEU users.test.ts (e2e), SEM NENHUMA ALTERAÇÃO NAS EXPECTATIVAS. <<<
// A única diferença: em vez de buildApp() do monolito, usa o app montado com o código novo.

describe('Módulo de Usuários (/users)', () => {
    let app: FastifyInstance

    beforeEach(async () => {
        mock.method(console, 'log', () => { })
        app = buildIdentityApp()
        await app.ready()
    })

    afterEach(async () => {
        await app.close()
        mock.restoreAll()
    })

    describe('POST /users', () => {
        it('cadastra usuário válido e normaliza o e-mail, registrando o e-mail original no log', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/users',
                payload: { name: 'Miguel', email: 'Miguel@X.com', password: 'secret1' },
            })

            assert.equal(res.statusCode, 201)
            const body = res.json()
            assert.equal(body.email, 'miguel@x.com')
            assert.equal(body.isVip, false)
            assert.ok(body.id)
            assert.equal('password' in body, false)

            const logs = (console.log as any).mock.calls.map((c: any) => c.arguments[0])
            assert.ok(logs.some((l: string) => l.includes('[EMAIL FAKE] Bem-vindo') && l.includes('Miguel@X.com')))
        })

        it('cadastra usuário VIP com sucesso quando isVip é enviado como true', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/users',
                payload: { name: 'VIP User', email: 'vip@x.com', password: 'secret1', isVip: true },
            })

            assert.equal(res.statusCode, 201)
            const body = res.json()
            assert.equal(body.isVip, true)
        })

        it('cadastra usuário como VIP quando isVip é enviado como string ("false")', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/users',
                payload: { name: 'VIP String', email: 'vipstring@x.com', password: 'secret1', isVip: 'false' },
            })

            assert.equal(res.statusCode, 201)
            const body = res.json()
            assert.equal(body.isVip, true)
        })

        it('aceita nome composto por 2 espaços', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/users',
                payload: { name: '  ', email: 'spaces@x.com', password: 'secret1' },
            })

            assert.equal(res.statusCode, 201)
        })

        it('rejeita nome inválido com mensagem exata (menos de 2 caracteres)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/users',
                payload: { name: 'A', email: 'valid@x.com', password: 'secret1' },
            })

            assert.equal(res.statusCode, 400)
            assert.deepEqual(res.json(), { error: 'nome invalido' })
        })

        it('rejeita e-mail inválido sem ponto (ex: a@b)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/users',
                payload: { name: 'Miguel', email: 'a@b', password: 'secret1' },
            })

            assert.equal(res.statusCode, 400)
            assert.deepEqual(res.json(), { error: 'email invalido' })
        })

        it('rejeita e-mail sem @ com mensagem exata', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/users',
                payload: { name: 'Miguel', email: 'emailinvalido.com', password: 'secret1' },
            })

            assert.equal(res.statusCode, 400)
            assert.deepEqual(res.json(), { error: 'email invalido' })
        })

        it('rejeita senha inválida com mensagem exata (menos de 6 caracteres)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/users',
                payload: { name: 'Miguel', email: 'valid@x.com', password: '123' },
            })

            assert.equal(res.statusCode, 400)
            assert.deepEqual(res.json(), { error: 'senha deve ter no minimo 6 caracteres' })
        })

        it('respeita a ordem das validações: nome > email > senha', async () => {
            const resName = await app.inject({
                method: 'POST',
                url: '/users',
                payload: { name: '', email: 'invalid', password: '123' },
            })
            assert.equal(resName.json().error, 'nome invalido')

            const resEmail = await app.inject({
                method: 'POST',
                url: '/users',
                payload: { name: 'Miguel', email: 'invalid', password: '123' },
            })
            assert.equal(resEmail.json().error, 'email invalido')

            const resPass = await app.inject({
                method: 'POST',
                url: '/users',
                payload: { name: 'Miguel', email: 'valid@x.com', password: '123' },
            })
            assert.equal(resPass.json().error, 'senha deve ter no minimo 6 caracteres')
        })

        it('retorna 409 quando o e-mail já existe (mesmo com variação de caixa alta/baixa)', async () => {
            await app.inject({
                method: 'POST',
                url: '/users',
                payload: { name: 'Miguel', email: 'miguel@x.com', password: 'secret1' },
            })

            const res = await app.inject({
                method: 'POST',
                url: '/users',
                payload: { name: 'Outro Miguel', email: 'MIGUEL@X.COM', password: 'secret2' },
            })

            assert.equal(res.statusCode, 409)
            assert.deepEqual(res.json(), { error: 'email ja cadastrado' })
        })
    })

    describe('GET /users/:id', () => {
        it('retorna os detalhes do usuário cadastrado', async () => {
            const createRes = await app.inject({
                method: 'POST',
                url: '/users',
                payload: { name: 'Ana', email: 'ana@x.com', password: 'secret1', isVip: true },
            })
            const { id } = createRes.json()

            const res = await app.inject({
                method: 'GET',
                url: `/users/${id}`,
            })

            assert.equal(res.statusCode, 200)
            const body = res.json()
            assert.equal(body.id, id)
            assert.equal(body.name, 'Ana')
            assert.equal(body.email, 'ana@x.com')
            assert.equal(body.isVip, true)
            assert.ok(body.createdAt)
        })

        it('retorna 404 para usuário inexistente', async () => {
            const res = await app.inject({
                method: 'GET',
                url: '/users/non-existent-id',
            })

            assert.equal(res.statusCode, 404)
            assert.deepEqual(res.json(), { error: 'usuario nao encontrado' })
        })
    })
})

import { describe, it, beforeEach, afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'
import type { FastifyInstance } from 'fastify'
import { buildApp } from '../../src/server'
import { createUser, capturedLogs } from './helpers'

describe('Módulo de Usuários (/users)', () => {
    let app: FastifyInstance

    beforeEach(async () => {
        mock.method(console, 'log', () => { })
        app = buildApp({ dbPath: ':memory:' })
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
            // a senha nunca deve ser exposta na resposta
            assert.equal('password' in body, false)

            // verifica que o e-mail original (antes do toLowerCase) foi usado no log
            const logs = capturedLogs()
            assert.ok(logs.some((l) => l.includes('[EMAIL FAKE] Bem-vindo') && l.includes('Miguel@X.com')))
        })

        it('cadastra usuário VIP com sucesso quando isVip é enviado como true', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/users',
                payload: { name: 'VIP User', email: 'vip@x.com', password: 'secret1', isVip: true },
            })

            assert.equal(res.statusCode, 201)
            assert.equal(res.json().isVip, true)
        })

        /**
         * QUIRK 1 – isVip como string não-vazia (ex: 'false') é tratado como truthy pelo monolito.
         * O monolito usa `isVip ? 1 : 0` sem coerção booleana explícita,
         * então qualquer string não-vazia, incluindo 'false', gera isVip = true.
         * Isso é um bug conhecido documentado aqui intencionalmente.
         */
        it('[QUIRK] registra isVip=true quando isVip é enviado como string não-vazia ("false")', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/users',
                payload: { name: 'VIP String', email: 'vipstring@x.com', password: 'secret1', isVip: 'false' },
            })

            assert.equal(res.statusCode, 201)
            // String 'false' é truthy em JS → monolito salva is_vip = 1
            assert.equal(res.json().isVip, true)
        })

        /**
         * QUIRK 2 – O monolito valida nome com `name.length < 2`, sem trim().
         * Uma string com exatamente 2 espaços ("  ") tem length === 2 e passa na validação,
         * apesar de ser semanticamente inválida. Bug documentado.
         */
        it('[QUIRK] aceita nome composto por 2 espaços (length === 2 passa na validação sem trim)', async () => {
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
            await createUser(app, { name: 'Miguel', email: 'miguel@x.com' })

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
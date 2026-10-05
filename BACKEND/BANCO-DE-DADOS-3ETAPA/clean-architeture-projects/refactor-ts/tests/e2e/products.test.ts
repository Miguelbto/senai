import { describe, it, beforeEach, afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'
import type { FastifyInstance } from 'fastify'
import { buildApp } from '../../src/server'

describe('Módulo de Produtos (/products)', () => {
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

    describe('POST /products', () => {
        it('cadastra um produto com sucesso e converte o preço para valor decimal', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/products',
                payload: { name: ' Teclado Mechanical ', price: 150.5, stock: 10 },
            })

            assert.equal(res.statusCode, 201)
            const body = res.json()
            assert.equal(body.name, 'Teclado Mechanical')
            assert.equal(body.price, 150.5)
            assert.equal(body.stock, 10)
            assert.ok(body.id)
        })

        it('valida campos obrigatórios e formatos de produto', async () => {
            const resName = await app.inject({
                method: 'POST',
                url: '/products',
                payload: { name: '   ', price: 10, stock: 5 },
            })
            assert.equal(resName.statusCode, 400)
            assert.deepEqual(resName.json(), { error: 'nome invalido' })

            const resPrice = await app.inject({
                method: 'POST',
                url: '/products',
                payload: { name: 'Mouse', price: 0, stock: 5 },
            })
            assert.equal(resPrice.statusCode, 400)
            assert.deepEqual(resPrice.json(), { error: 'preco invalido' })

            const resStock = await app.inject({
                method: 'POST',
                url: '/products',
                payload: { name: 'Mouse', price: 50, stock: -1 },
            })
            assert.equal(resStock.statusCode, 400)
            assert.deepEqual(resStock.json(), { error: 'estoque invalido' })

            const resStockFloat = await app.inject({
                method: 'POST',
                url: '/products',
                payload: { name: 'Mouse', price: 50, stock: 2.5 },
            })
            assert.equal(resStockFloat.statusCode, 400)
            assert.deepEqual(resStockFloat.json(), { error: 'estoque invalido' })
        })
    })

    describe('GET /products', () => {
        it('lista apenas produtos ativos', async () => {
            const p1 = await app.inject({
                method: 'POST',
                url: '/products',
                payload: { name: 'Monitor', price: 900, stock: 2 },
            })
            const p2 = await app.inject({
                method: 'POST',
                url: '/products',
                payload: { name: 'Mousepad', price: 50, stock: 10 },
            })

            const p1Id = p1.json().id
            const p2Id = p2.json().id

            await app.inject({ method: 'DELETE', url: `/products/${p1Id}` })

            const listRes = await app.inject({ method: 'GET', url: '/products' })
            assert.equal(listRes.statusCode, 200)

            const products = listRes.json()
            assert.equal(products.length, 1)
            assert.equal(products[0].id, p2Id)
            assert.equal(products[0].name, 'Mousepad')
        })
    })

    describe('DELETE /products/:id', () => {
        it('desativa um produto existente', async () => {
            const p = await app.inject({
                method: 'POST',
                url: '/products',
                payload: { name: 'Headset', price: 200, stock: 5 },
            })
            const id = p.json().id

            const delRes = await app.inject({ method: 'DELETE', url: `/products/${id}` })
            assert.equal(delRes.statusCode, 204)

            const listRes = await app.inject({ method: 'GET', url: '/products' })
            assert.equal(listRes.json().length, 0)
        })

        it('retorna 404 ao tentar remover produto inexistente', async () => {
            const res = await app.inject({ method: 'DELETE', url: '/products/non-existent' })
            assert.equal(res.statusCode, 404)
            assert.deepEqual(res.json(), { error: 'produto nao encontrado' })
        })

        it('retorna 409 ao tentar remover produto associado a um pedido PENDING', async () => {
            const userRes = await app.inject({
                method: 'POST',
                url: '/users',
                payload: { name: 'Carlos', email: 'carlos@x.com', password: 'secret1' },
            })
            const prodRes = await app.inject({
                method: 'POST',
                url: '/products',
                payload: { name: 'Cadeira Gaming', price: 500, stock: 10 },
            })

            const userId = userRes.json().id
            const productId = prodRes.json().id

            await app.inject({
                method: 'POST',
                url: '/orders',
                payload: { userId, items: [{ productId, quantity: 1 }] },
            })

            const delRes = await app.inject({ method: 'DELETE', url: `/products/${productId}` })
            assert.equal(delRes.statusCode, 409)
            assert.deepEqual(delRes.json(), { error: 'produto em pedido pendente' })
        })
    })
})
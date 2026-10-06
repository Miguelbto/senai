import { describe, it, beforeEach, afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'
import type { FastifyInstance } from 'fastify'
import { buildApp } from '../../src/server'
import { createUser, createProduct } from './helpers'

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
            // o monolito faz name.trim() antes de salvar
            assert.equal(body.name, 'Teclado Mechanical')
            assert.equal(body.price, 150.5)
            assert.equal(body.stock, 10)
            assert.ok(body.id)
        })

        it('arredonda o preço do produto (ex: 19.999 vira 20)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/products',
                payload: { name: 'Gabinete', price: 19.999, stock: 5 },
            })

            assert.equal(res.statusCode, 201)
            // Math.round(19.999 * 100) = 2000 → 2000 / 100 = 20
            assert.equal(res.json().price, 20)
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

            const resStringPrice = await app.inject({
                method: 'POST',
                url: '/products',
                payload: { name: 'Mouse', price: '10', stock: 5 },
            })
            assert.equal(resStringPrice.statusCode, 400)
            assert.deepEqual(resStringPrice.json(), { error: 'preco invalido' })

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

            // desativa o Monitor via DELETE (soft-delete, active = 0)
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
        it('desativa um produto existente (soft-delete)', async () => {
            const p = await app.inject({
                method: 'POST',
                url: '/products',
                payload: { name: 'Headset', price: 200, stock: 5 },
            })
            const id = p.json().id

            const delRes = await app.inject({ method: 'DELETE', url: `/products/${id}` })
            assert.equal(delRes.statusCode, 204)

            // produto desativado não aparece na listagem
            const listRes = await app.inject({ method: 'GET', url: '/products' })
            assert.equal(listRes.json().length, 0)
        })

        /**
         * QUIRK – DELETE em produto já inativo retorna 204 em vez de 404.
         * O monolito faz SELECT sem filtrar por active=1, então encontra o produto
         * e executa o UPDATE active=0 novamente, sem erro. Bug documentado.
         */
        it('[QUIRK] retorna 204 ao tentar deletar o mesmo produto duas vezes', async () => {
            const p = await app.inject({
                method: 'POST',
                url: '/products',
                payload: { name: 'Headset', price: 200, stock: 5 },
            })
            const id = p.json().id

            const del1 = await app.inject({ method: 'DELETE', url: `/products/${id}` })
            assert.equal(del1.statusCode, 204)

            // segundo DELETE num produto já inativo ainda retorna 204 (bug)
            const del2 = await app.inject({ method: 'DELETE', url: `/products/${id}` })
            assert.equal(del2.statusCode, 204)
        })

        it('retorna 404 ao tentar remover produto inexistente', async () => {
            const res = await app.inject({ method: 'DELETE', url: '/products/non-existent' })
            assert.equal(res.statusCode, 404)
            assert.deepEqual(res.json(), { error: 'produto nao encontrado' })
        })

        it('retorna 409 ao tentar remover produto associado a um pedido PENDING', async () => {
            const userId = await createUser(app, { name: 'Carlos', email: 'carlos@x.com' })
            const productId = await createProduct(app, { name: 'Cadeira Gaming', price: 500, stock: 10 })

            // cria pedido que mantém o produto em status PENDING
            await app.inject({
                method: 'POST',
                url: '/orders',
                payload: { userId, items: [{ productId, quantity: 1 }] },
            })

            const delRes = await app.inject({ method: 'DELETE', url: `/products/${productId}` })
            assert.equal(delRes.statusCode, 409)
            assert.deepEqual(delRes.json(), { error: 'produto em pedido pendente' })
        })

        it('permite deletar produto associado a pedido PAID', async () => {
            const userId = await createUser(app, { name: 'Ana', email: 'ana@x.com' })
            const productId = await createProduct(app, { name: 'Teclado RGB', price: 300, stock: 10 })

            // cria pedido, paga via PIX → status = PAID
            const orderRes = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: { userId, items: [{ productId, quantity: 1 }] },
            })
            await app.inject({
                method: 'POST',
                url: `/orders/${orderRes.json().id}/pay`,
                payload: { method: 'PIX' },
            })

            // produto em pedido PAID pode ser desativado
            const delRes = await app.inject({ method: 'DELETE', url: `/products/${productId}` })
            assert.equal(delRes.statusCode, 204)
        })

        it('permite deletar produto associado a pedido CANCELED', async () => {
            const userId = await createUser(app, { name: 'Carlos2', email: 'carlos2@x.com' })
            const productId = await createProduct(app, { name: 'Mouse Wireless', price: 150, stock: 10 })

            // cria pedido e cancela → status = CANCELED
            const orderRes = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: { userId, items: [{ productId, quantity: 1 }] },
            })
            await app.inject({ method: 'POST', url: `/orders/${orderRes.json().id}/cancel` })

            // produto em pedido CANCELED pode ser desativado
            const delRes = await app.inject({ method: 'DELETE', url: `/products/${productId}` })
            assert.equal(delRes.statusCode, 204)
        })
    })
})
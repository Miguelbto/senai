import { describe, it, beforeEach, afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'
import type { FastifyInstance } from 'fastify'
import { buildApp } from '../../src/server'
import { createUser, createProduct, createOrder, payOrder, shipOrder, cancelOrder } from './helpers'

describe('Módulo de Relatórios (/reports)', () => {
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

    it('calcula o faturamento somando apenas os pedidos PAID e SHIPPED', async () => {
        const userId = await createUser(app, { name: 'Cliente', email: 'cliente@x.com' })
        const productId = await createProduct(app, { name: 'Item', price: 100, stock: 20 })

        // Pedido 1: PAID via PIX → total = 100 * 0.95 = 95
        const o1 = await createOrder(app, userId, [{ productId, quantity: 1 }])
        await payOrder(app, o1.id, 'PIX')

        // Pedido 2: SHIPPED via PIX → total = 100 * 0.95 = 95
        const o2 = await createOrder(app, userId, [{ productId, quantity: 1 }])
        await payOrder(app, o2.id, 'PIX')
        await shipOrder(app, o2.id)

        // Pedido 3: PENDING — não deve entrar no faturamento
        await createOrder(app, userId, [{ productId, quantity: 1 }])

        // Pedido 4: CANCELED — não deve entrar no faturamento
        const o4 = await createOrder(app, userId, [{ productId, quantity: 1 }])
        await cancelOrder(app, o4.id)

        const res = await app.inject({ method: 'GET', url: '/reports/sales' })
        assert.equal(res.statusCode, 200)

        const body = res.json()
        // produto R$100, frete R$19.90 (100 < 200) → total no banco = 11990 centavos
        // PIX: Math.round(11990 * 0.95) = Math.round(11390.5) = 11391 centavos = R$113.91
        // dois pedidos PAID + SHIPPED: 11391 + 11391 = 22782 centavos = R$227.82
        assert.equal(body.faturamento, 227.82)
        assert.ok(Array.isArray(body.porStatus))

        // verifica a contagem por status
        const byStatus = Object.fromEntries(body.porStatus.map((r: any) => [r.status, r]))
        assert.equal(byStatus.PAID.qtd, 1)
        assert.equal(byStatus.SHIPPED.qtd, 1)
        assert.equal(byStatus.PENDING.qtd, 1)
        assert.equal(byStatus.CANCELED.qtd, 1)

        // valores em centavos no banco: PIX sobre 11990 → Math.round(11990 * 0.95) = 11391
        assert.equal(byStatus.PAID.soma, 11391)
        assert.equal(byStatus.SHIPPED.soma, 11391)
    })
})
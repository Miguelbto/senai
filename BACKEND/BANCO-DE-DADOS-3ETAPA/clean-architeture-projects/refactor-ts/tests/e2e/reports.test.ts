import { describe, it, beforeEach, afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'
import type { FastifyInstance } from 'fastify'
import { buildApp } from '../../src/server'
import { brotliDecompressSync } from 'node:zlib';

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
        const userRes = await app.inject({
            method: 'POST',
            url: '/users',
            payload: { name: 'Cliente', email: 'cliente@x.com', password: 'secret1' },
        })
        const userId = userRes.json().id

        const prodRes = await app.inject({
            method: 'POST',
            url: '/products',
            payload: { name: 'Item', price: 100, stock: 20 },
        })
        const productId = prodRes.json().id

        // Pedido 1: Pago via PIX (100 * 0.95 = 95)
        const o1 = await app.inject({
            method: 'POST',
            url: '/orders',
            payload: { userId, items: [{ productId, quantity: 1 }] },
        })
        await app.inject({ method: 'POST', url: `/orders/${o1.json().id}/pay`, payload: { method: 'PIX' } })

        // Pedido 2: Pago via PIX e Enviado (95)
        const o2 = await app.inject({
            method: 'POST',
            url: '/orders',
            payload: { userId, items: [{ productId, quantity: 1 }] },
        })
        await app.inject({ method: 'POST', url: `/orders/${o2.json().id}/pay`, payload: { method: 'PIX' } })
        await app.inject({ method: 'POST', url: `/orders/${o2.json().id}/ship` })

        // Pedido 3: Pendente (Não deve somar ao faturamento)
        await app.inject({
            method: 'POST',
            url: '/orders',
            payload: { userId, items: [{ productId, quantity: 1 }] },
        })

        // Pedido 4: Cancelado (Não deve somar ao faturamento)
        const o4 = await app.inject({
            method: 'POST',
            url: '/orders',
            payload: { userId, items: [{ productId, quantity: 1 }] },
        })
        await app.inject({ method: 'POST', url: `/orders/${o4.json().id}/cancel` })

        const res = await app.inject({ method: 'GET', url: '/reports/sales' })
        assert.equal(res.statusCode, 200)

        const body = res.json()
        assert.equal(body.faturamento, 227.82) // 95 + 95
        assert.ok(Array.isArray(body.porStatus))
    })

    const byStatus = Object.fromEntries(body.porStatus.map((r: any) => [r.status, r]))
    assert.equal(byStatus.PAID.qtd, 1)
assert.equal(byStatus.SHIPPED.qtd, 1)
assert.equal(byStatus.PENDING.qtd, 1)
assert.equal(byStatus.CANCELED.qtd, 1)
assert.equal(byStatus.PAID.soma, 11391)        // centavos (quirk 7)
assert.equal(byStatus.CANCELED.soma, 11990)  
})
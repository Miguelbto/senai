import { describe, it, beforeEach, afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'
import type { FastifyInstance } from 'fastify'
import { buildApp } from '../../src/server'

describe('Módulo de Pedidos (/orders)', () => {
    let app: FastifyInstance
    let userId: string
    let vipUserId: string
    let productId: string

    beforeEach(async () => {
        mock.method(console, 'log', () => { })
        app = buildApp({ dbPath: ':memory:' })
        await app.ready()

        const userRes = await app.inject({
            method: 'POST',
            url: '/users',
            payload: { name: 'João', email: 'joao@x.com', password: 'secret1' },
        })
        userId = userRes.json().id

        const vipRes = await app.inject({
            method: 'POST',
            url: '/users',
            payload: { name: 'Maria VIP', email: 'maria@x.com', password: 'secret1', isVip: true },
        })
        vipUserId = vipRes.json().id

        const prodRes = await app.inject({
            method: 'POST',
            url: '/products',
            payload: { name: 'Processador', price: 200, stock: 10 },
        })
        productId = prodRes.json().id
    })

    afterEach(async () => {
        await app.close()
        mock.restoreAll()
    })

    describe('POST /orders', () => {
        it('cria pedido com sucesso e decrementa o estoque', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    items: [{ productId, quantity: 2 }],
                },
            })

            assert.equal(res.statusCode, 201)
            const body = res.json()
            assert.equal(body.status, 'PENDING')
            assert.equal(body.subtotal, 400)
            assert.equal(body.discount, 20)
            assert.equal(body.shipping, 19.9) // subtotal >= 200
            assert.equal(body.total, 199.9)

            const prodList = await app.inject({ method: 'GET', url: '/products' })
            assert.equal(prodList.json()[0].stock, 8)
        })

        it('aplica cupom PROMO10 corretamente (10% de desconto)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    coupon: 'promo10',
                    items: [{ productId, quantity: 1 }],
                },
            })

            assert.equal(res.statusCode, 201)
            const body = res.json()
            assert.equal(body.subtotal, 200)
            assert.equal(body.discount, 20)
            assert.equal(body.shipping, 0)
            assert.equal(body.total, 180)
        })

        it('impede uso de cupom VIP20 por usuário não-VIP (retorna 403)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    coupon: 'VIP20',
                    items: [{ productId, quantity: 1 }],
                },
            })

            assert.equal(res.statusCode, 403)
            assert.deepEqual(res.json(), { error: 'cupom exclusivo para clientes VIP' })
        })

        it('permite uso de cupom VIP20 para usuário VIP (20% de desconto)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId: vipUserId,
                    coupon: 'VIP20',
                    items: [{ productId, quantity: 1 }],
                },
            })

            assert.equal(res.statusCode, 201)
            const body = res.json()
            assert.equal(body.discount, 40)
        })

        it('rejeita se a quantidade do item for superior a 10', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    items: [{ productId, quantity: 11 }],
                },
            })

            assert.equal(res.statusCode, 400)
            assert.deepEqual(res.json(), { error: 'maximo de 10 unidades por item' })
        })

        it('rejeita pedido com estoque insuficiente (retorna 409)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    items: [{ productId, quantity: 10 }],
                },
            })
            assert.equal(res.statusCode, 201)

            const secondOrder = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    items: [{ productId, quantity: 1 }],
                },
            })

            assert.equal(secondOrder.statusCode, 409)
            assert.deepEqual(secondOrder.json(), { error: 'estoque insuficiente para Processador' })
        })

        it('rejeita se o valor total for inferior ao valor mínimo de R$ 10,00', async () => {
            const cheapProd = await app.inject({
                method: 'POST',
                url: '/products',
                payload: { name: 'Bala', price: 2, stock: 100 },
            })

            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    coupon: 'FRETEGRATIS',
                    items: [{ productId: cheapProd.json().id, quantity: 1 }],
                },
            })

            assert.equal(res.statusCode, 400)
            assert.deepEqual(res.json(), { error: 'pedido minimo de R$ 10,00' })
        })
    })

    describe('POST /orders/:id/pay', () => {
        let orderId: string

        beforeEach(async () => {
            const orderRes = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: { userId, items: [{ productId, quantity: 1 }] },
            })
            orderId = orderRes.json().id
        })

        it('processa pagamento via PIX aplicando 5% de desconto', async () => {
            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'PIX' },
            })

            assert.equal(res.statusCode, 200)
            const body = res.json()
            assert.equal(body.status, 'PAID')
            assert.equal(body.total, 190) // 200 * 0.95
        })

        it('processa pagamento via CARD com até 6 parcelas sem juros', async () => {
            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'CARD', installments: 6, cardNumber: '12345678901234' },
            })

            assert.equal(res.statusCode, 200)
            assert.equal(res.json().total, 200)
        })

        it('aplica taxa de 3% no cartão para parcelamentos acima de 6x', async () => {
            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'CARD', installments: 10, cardNumber: '12345678901234' },
            })

            assert.equal(res.statusCode, 200)
            assert.equal(res.json().total, 206) // 200 * 1.03
        })

        it('recusa pagamento via cartão se o número iniciar com 0000 (retorna 402)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'CARD', installments: 1, cardNumber: '00001234567890' },
            })

            assert.equal(res.statusCode, 402)
            assert.deepEqual(res.json(), { error: 'pagamento recusado' })
        })

        it('retorna 409 ao tentar pagar um pedido que não esteja PENDING', async () => {
            await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'PIX' },
            })

            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'PIX' },
            })

            assert.equal(res.statusCode, 409)
            assert.ok(res.json().error.includes('pedido nao esta pendente'))
        })
    })

    describe('POST /orders/:id/ship e POST /orders/:id/cancel', () => {
        let orderId: string

        beforeEach(async () => {
            const orderRes = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: { userId, items: [{ productId, quantity: 2 }] },
            })
            orderId = orderRes.json().id
        })

        it('impede envio de pedido não pago (retorna 409)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/ship`,
            })

            assert.equal(res.statusCode, 409)
            assert.deepEqual(res.json(), { error: 'so e possivel enviar pedidos pagos' })
        })

        it('despacha o pedido e gera código de rastreamento', async () => {
            await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'PIX' },
            })

            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/ship`,
            })

            assert.equal(res.statusCode, 200)
            const body = res.json()
            assert.equal(body.status, 'SHIPPED')
            assert.ok(body.trackingCode.startsWith('BR'))
        })

        it('cancela um pedido e devolve os itens ao estoque', async () => {
            const cancelRes = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/cancel`,
            })

            assert.equal(cancelRes.statusCode, 200)
            assert.equal(cancelRes.json().status, 'CANCELED')

            const prodRes = await app.inject({ method: 'GET', url: '/products' })
            assert.equal(prodRes.json()[0].stock, 10)
        })

        it('impede o cancelamento de um pedido com status SHIPPED', async () => {
            await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'PIX' },
            })
            await app.inject({ method: 'POST', url: `/orders/${orderId}/ship` })

            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/cancel`,
            })

            assert.equal(res.statusCode, 409)
            assert.deepEqual(res.json(), { error: 'pedido ja enviado nao pode ser cancelado' })
        })
    })
})
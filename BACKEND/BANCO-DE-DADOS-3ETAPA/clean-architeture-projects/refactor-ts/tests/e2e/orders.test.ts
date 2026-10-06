import { describe, it, beforeEach, afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'
import type { FastifyInstance } from 'fastify'
import { buildApp } from '../../src/server'
import { createUser, createProduct, createOrder, payOrder, shipOrder } from './helpers'

describe('Módulo de Pedidos (/orders)', () => {
    let app: FastifyInstance
    let userId: string
    let vipUserId: string
    let productId: string
    let logMock: ReturnType<typeof mock.method>

    beforeEach(async () => {
        logMock = mock.method(console, 'log', () => { })
        app = buildApp({ dbPath: ':memory:' })
        await app.ready()

        userId = await createUser(app, { name: 'João', email: 'joao@x.com' })
        vipUserId = await createUser(app, { name: 'Maria VIP', email: 'maria@x.com', isVip: true })
        // produto de R$200 com estoque 10
        productId = await createProduct(app, { name: 'Processador', price: 200, stock: 10 })
    })

    afterEach(async () => {
        await app.close()
        mock.restoreAll()
    })

    describe('POST /orders', () => {
        it('cria pedido com sucesso e decrementa o estoque', async () => {
            // subtotal = 200 * 2 = 400 → >= 200 → frete grátis
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
            assert.equal(body.discount, 0)   // sem cupom → sem desconto
            assert.equal(body.shipping, 0)   // subtotal >= 200 → frete grátis
            assert.equal(body.total, 400)

            // estoque deve ter sido decrementado de 10 para 8
            const prodList = await app.inject({ method: 'GET', url: '/products' })
            assert.equal(prodList.json()[0].stock, 8)
        })

        it('aplica cupom PROMO10 corretamente (10% de desconto)', async () => {
            // subtotal = 200 * 1 = 200; desconto = 20; subtotal - discount = 180 < 200 → frete = 19.90
            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    coupon: 'promo10', // o monolito faz toUpperCase() internamente
                    items: [{ productId, quantity: 1 }],
                },
            })

            assert.equal(res.statusCode, 201)
            const body = res.json()
            assert.equal(body.subtotal, 200)
            assert.equal(body.discount, 20)
            assert.equal(body.shipping, 19.9) // 200 - 20 = 180 < 200 → frete cobrado
            assert.equal(body.total, 199.9)   // 200 - 20 + 19.9
        })

        it('aplica cupom FRETEGRATIS zerando o frete independente do subtotal', async () => {
            const mouseId = await createProduct(app, { name: 'Mouse', price: 50, stock: 10 })

            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    coupon: 'FRETEGRATIS',
                    items: [{ productId: mouseId, quantity: 1 }],
                },
            })

            assert.equal(res.statusCode, 201)
            const body = res.json()
            assert.equal(body.subtotal, 50)
            assert.equal(body.shipping, 0)  // FRETEGRATIS zera o frete
            assert.equal(body.total, 50)
        })

        it('rejeita se o valor total for inferior ao valor mínimo de R$ 10,00 com cupom FRETEGRATIS', async () => {
            const balaId = await createProduct(app, { name: 'Bala', price: 2, stock: 100 })

            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    coupon: 'FRETEGRATIS',
                    items: [{ productId: balaId, quantity: 1 }],
                },
            })

            // total = 2 + 0 (frete grátis) = 2 → < 10 → rejeitado
            assert.equal(res.statusCode, 400)
            assert.deepEqual(res.json(), { error: 'pedido minimo de R$ 10,00' })
        })

        it('rejeita cupom inválido (retorna 400)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    coupon: 'CUPOM_INVALIDO',
                    items: [{ productId, quantity: 1 }],
                },
            })

            assert.equal(res.statusCode, 400)
            assert.deepEqual(res.json(), { error: 'cupom invalido' })
        })

        it('rejeita pedido se userId estiver ausente (retorna 400)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    items: [{ productId, quantity: 1 }],
                },
            })

            assert.equal(res.statusCode, 400)
        })

        it('rejeita pedido com lista de items vazia (retorna 400)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    items: [],
                },
            })

            assert.equal(res.statusCode, 400)
        })

        it('retorna 404 se o usuário não for encontrado', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId: '99999999-9999-9999-9999-999999999999',
                    items: [{ productId, quantity: 1 }],
                },
            })

            assert.equal(res.statusCode, 404)
        })

        it('retorna 404 se o produto não for encontrado', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    items: [{ productId: '99999999-9999-9999-9999-999999999999', quantity: 1 }],
                },
            })

            assert.equal(res.statusCode, 404)
        })

        it('rejeita pedido com produto inativo (retorna 400)', async () => {
            // cria e depois desativa o produto via DELETE
            const prodId = await createProduct(app, { name: 'Placa de Vídeo', price: 500, stock: 5 })
            await app.inject({ method: 'DELETE', url: `/products/${prodId}` })

            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    items: [{ productId: prodId, quantity: 1 }],
                },
            })

            assert.equal(res.statusCode, 400)
            assert.deepEqual(res.json(), { error: 'produto Placa de Vídeo indisponivel' })
        })

        it('rejeita item inválido com quantidade 0 (retorna 400)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    items: [{ productId, quantity: 0 }],
                },
            })

            assert.equal(res.statusCode, 400)
        })

        it('rejeita item inválido com quantidade decimal (retorna 400)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    items: [{ productId, quantity: 1.5 }],
                },
            })

            assert.equal(res.statusCode, 400)
        })

        it('rejeita item sem productId (retorna 400)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    items: [{ quantity: 1 }],
                },
            })

            assert.equal(res.statusCode, 400)
        })

        it('calcula frete de R$ 19,90 para subtotal de R$ 199,99', async () => {
            const tecladoId = await createProduct(app, { name: 'Teclado', price: 199.99, stock: 10 })

            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    items: [{ productId: tecladoId, quantity: 1 }],
                },
            })

            assert.equal(res.statusCode, 201)
            const body = res.json()
            assert.equal(body.subtotal, 199.99)
            assert.equal(body.shipping, 19.9) // 199.99 < 200 → frete cobrado
        })

        it('calcula frete grátis (0) para subtotal de R$ 200,00 exatos', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    items: [{ productId, quantity: 1 }], // R$200 exatos
                },
            })

            assert.equal(res.statusCode, 201)
            const body = res.json()
            assert.equal(body.subtotal, 200)
            assert.equal(body.shipping, 0) // 200 >= 200 → frete grátis
        })

        /**
         * QUIRK – O monolito valida estoque item a item na ordem do array.
         * Quando o mesmo produto aparece duas vezes, a segunda entrada encontra
         * o estoque ainda intacto no banco (o decremento só ocorre na transação final).
         * Logo: item1=6 (ok, 6<=10), item2=5 (ok, 5<=10) → ambos passam → pedido criado.
         * O comportamento correto seria somar as quantidades do mesmo produto antes de validar.
         */
        it('[QUIRK] cria pedido com dois itens do mesmo produto mesmo somando acima do estoque', async () => {
            // estoque = 10; item1 = 6 (passa), item2 = 5 (passa pois checa stock original)
            // resultado: pedido criado com 11 unidades, mas estoque só tinha 10
            const res = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    items: [
                        { productId, quantity: 6 },
                        { productId, quantity: 5 },
                    ],
                },
            })

            // o monolito cria o pedido (201) — o Quirk está documentado aqui
            assert.equal(res.statusCode, 201)
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
            // subtotal = 200; desconto = 40 (20%); 200 - 40 = 160 < 200 → frete 19.90
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
            assert.equal(res.json().discount, 40)
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
            // esgota o estoque com um primeiro pedido bem-sucedido
            const firstOrder = await app.inject({
                method: 'POST',
                url: '/orders',
                payload: {
                    userId,
                    items: [{ productId, quantity: 10 }],
                },
            })
            assert.equal(firstOrder.statusCode, 201)

            // segunda tentativa deve falhar pois estoque = 0
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
    })

    describe('GET /orders/:id', () => {
        it('retorna 200 com o pedido e seus itens', async () => {
            const order = await createOrder(app, userId, [{ productId, quantity: 2 }])

            const res = await app.inject({
                method: 'GET',
                url: `/orders/${order.id}`,
            })

            assert.equal(res.statusCode, 200)
            const body = res.json()
            assert.equal(body.id, order.id)
            assert.equal(body.userId, userId)
            assert.ok(Array.isArray(body.items))
            assert.equal(body.items.length, 1)
            assert.equal(body.items[0].productId, productId)
            assert.equal(body.items[0].quantity, 2)
        })

        it('retorna 404 se o pedido não for encontrado', async () => {
            const res = await app.inject({
                method: 'GET',
                url: '/orders/99999999-9999-9999-9999-999999999999',
            })

            assert.equal(res.statusCode, 404)
        })
    })

    describe('POST /orders/:id/pay', () => {
        let orderId: string

        beforeEach(async () => {
            const order = await createOrder(app, userId, [{ productId, quantity: 1 }])
            orderId = order.id
        })

        it('processa pagamento via PIX aplicando 5% de desconto', async () => {
            // pedido total = 200; PIX desconto 5% → 200 * 0.95 = 190
            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'PIX' },
            })

            assert.equal(res.statusCode, 200)
            const body = res.json()
            assert.equal(body.status, 'PAID')
            assert.equal(body.total, 190)

            // verifica no GET que o installments foi salvo como 1 (PIX = 1 parcela)
            const orderGet = await app.inject({ method: 'GET', url: `/orders/${orderId}` })
            assert.equal(orderGet.json().installments, 1)
        })

        it('processa pagamento via CARD sem informar installments e grava 1 por padrão', async () => {
            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'CARD', cardNumber: '12345678901234' },
            })

            assert.equal(res.statusCode, 200)
            // installments não vem na resposta do /pay, verificar via GET
            const orderGet = await app.inject({ method: 'GET', url: `/orders/${orderId}` })
            assert.equal(orderGet.json().installments, 1)
        })

        /**
         * QUIRK – installments: 0 é normalizado silenciosamente para 1 pelo monolito.
         * O monolito faz `const inst = installments || 1` antes de validar.
         * Então 0 || 1 = 1, que é válido (1 >= 1), e o pagamento é processado normalmente.
         * O comportamento esperado seria rejeitar 0 explicitamente, mas o monolito aceita.
         */
        it('[QUIRK] normaliza installments=0 para 1 silenciosamente e aceita o pagamento', async () => {
            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'CARD', installments: 0, cardNumber: '12345678901234' },
            })

            // 0 || 1 = 1 → válido → monolito aceita e retorna 200
            assert.equal(res.statusCode, 200)
            const orderGet = await app.inject({ method: 'GET', url: `/orders/${orderId}` })
            assert.equal(orderGet.json().installments, 1)
        })

        it('rejeita pagamento se o número de parcelas for superior a 12 (retorna 400)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'CARD', installments: 13, cardNumber: '12345678901234' },
            })

            assert.equal(res.statusCode, 400)
        })

        it('rejeita pagamento com parcelas decimais (retorna 400)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'CARD', installments: 1.5, cardNumber: '12345678901234' },
            })

            assert.equal(res.statusCode, 400)
        })

        it('rejeita pagamento se o número do cartão for curto (retorna 400)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'CARD', installments: 1, cardNumber: '123' },
            })

            assert.equal(res.statusCode, 400)
            assert.deepEqual(res.json(), { error: 'cartao invalido' })
        })

        it('rejeita método de pagamento inválido (retorna 400)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'BOLETO' },
            })

            assert.equal(res.statusCode, 400)
        })

        it('processa pagamento via CARD com até 6 parcelas sem juros', async () => {
            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'CARD', installments: 6, cardNumber: '12345678901234' },
            })

            assert.equal(res.statusCode, 200)
            assert.equal(res.json().total, 200) // 6x sem juros
        })

        it('aplica taxa de 3% no cartão para parcelamentos acima de 6x', async () => {
            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'CARD', installments: 10, cardNumber: '12345678901234' },
            })

            assert.equal(res.statusCode, 200)
            assert.equal(res.json().total, 206) // 200 * 1.03 = 206
        })

        it('recusa pagamento via cartão se o número iniciar com 0000 e mantém o pedido como PENDING', async () => {
            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'CARD', installments: 1, cardNumber: '00001234567890' },
            })

            assert.equal(res.statusCode, 402)
            assert.deepEqual(res.json(), { error: 'pagamento recusado' })

            // status não pode ter mudado
            const checkOrder = await app.inject({ method: 'GET', url: `/orders/${orderId}` })
            assert.equal(checkOrder.json().status, 'PENDING')
        })

        it('recusa cartão 0000... com 7x sem aplicar os 3% de juros no total armazenado', async () => {
            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'CARD', installments: 7, cardNumber: '00001234567890' },
            })

            assert.equal(res.statusCode, 402)

            // o pedido não foi pago → total original = 200, não 206 (sem os 3% de juros)
            const checkOrder = await app.inject({ method: 'GET', url: `/orders/${orderId}` })
            assert.equal(checkOrder.json().status, 'PENDING')
            assert.equal(checkOrder.json().total, 200)
        })

        it('retorna 404 ao tentar pagar um pedido inexistente', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders/99999999-9999-9999-9999-999999999999/pay',
                payload: { method: 'PIX' },
            })

            assert.equal(res.statusCode, 404)
        })

        it('retorna 409 ao tentar pagar um pedido que não esteja PENDING', async () => {
            // paga uma vez
            await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/pay`,
                payload: { method: 'PIX' },
            })

            // tenta pagar de novo
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
            // pedido de 2 unidades → subtotal = 400 → frete grátis
            const order = await createOrder(app, userId, [{ productId, quantity: 2 }])
            orderId = order.id
        })

        it('impede envio de pedido não pago (retorna 409)', async () => {
            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/ship`,
            })

            assert.equal(res.statusCode, 409)
            assert.deepEqual(res.json(), { error: 'so e possivel enviar pedidos pagos' })
        })

        it('despacha o pedido e gera código de rastreamento no formato BR...XX', async () => {
            await payOrder(app, orderId, 'PIX')

            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/ship`,
            })

            assert.equal(res.statusCode, 200)
            const body = res.json()
            assert.equal(body.status, 'SHIPPED')
            assert.match(body.trackingCode, /^BR\d+XX$/)
        })

        it('cancela um pedido pendente e devolve os itens ao estoque', async () => {
            const cancelRes = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/cancel`,
            })

            assert.equal(cancelRes.statusCode, 200)
            assert.equal(cancelRes.json().status, 'CANCELED')

            // os 2 itens devem ter voltado ao estoque (10 - 2 + 2 = 10)
            const prodRes = await app.inject({ method: 'GET', url: '/products' })
            assert.equal(prodRes.json()[0].stock, 10)
        })

        it('cancela um pedido com status PAID e registra estorno nos logs', async () => {
            await payOrder(app, orderId, 'PIX')

            const cancelRes = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/cancel`,
            })

            assert.equal(cancelRes.statusCode, 200)
            assert.equal(cancelRes.json().status, 'CANCELED')

            // verifica que o log de estorno foi registrado
            const logCalls = logMock.mock.calls
            const estornoLogged = logCalls.some((call) =>
                call.arguments.some((arg) => typeof arg === 'string' && arg.includes('[GATEWAY FAKE] estornando'))
            )
            assert.ok(estornoLogged)
        })

        it('impede o cancelamento de um pedido já cancelado (retorna 409)', async () => {
            await app.inject({ method: 'POST', url: `/orders/${orderId}/cancel` })

            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/cancel`,
            })

            assert.equal(res.statusCode, 409)
            assert.deepEqual(res.json(), { error: 'pedido ja cancelado' })
        })

        it('impede o cancelamento de um pedido com status SHIPPED', async () => {
            await payOrder(app, orderId, 'PIX')
            await shipOrder(app, orderId)

            const res = await app.inject({
                method: 'POST',
                url: `/orders/${orderId}/cancel`,
            })

            assert.equal(res.statusCode, 409)
            assert.deepEqual(res.json(), { error: 'pedido ja enviado nao pode ser cancelado' })
        })

        it('retorna 404 ao tentar despachar (ship) um pedido inexistente', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders/99999999-9999-9999-9999-999999999999/ship',
            })

            assert.equal(res.statusCode, 404)
        })

        it('retorna 404 ao tentar cancelar um pedido inexistente', async () => {
            const res = await app.inject({
                method: 'POST',
                url: '/orders/99999999-9999-9999-9999-999999999999/cancel',
            })

            assert.equal(res.statusCode, 404)
        })
    })
})
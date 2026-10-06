import assert from 'node:assert/strict'
import type { FastifyInstance } from 'fastify'

let seq = 0

export async function createUser(
    app: FastifyInstance,
    o: { name?: string; email?: string; password?: string; isVip?: boolean } = {},
): Promise<string> {
    seq++
    const res = await app.inject({
        method: 'POST', url: '/users',
        payload: { name: 'Cliente', email: `user${seq}@x.com`, password: 'secret1', ...o },
    })
    assert.equal(res.statusCode, 201)
    return res.json().id
}

export async function createProduct(
    app: FastifyInstance,
    o: { name?: string; price?: number; stock?: number } = {},
): Promise<string> {
    const res = await app.inject({
        method: 'POST', url: '/products',
        payload: { name: 'Produto', price: 200, stock: 10, ...o },
    })
    assert.equal(res.statusCode, 201)
    return res.json().id
}

export async function createOrder(
    app: FastifyInstance,
    userId: string,
    items: { productId: string; quantity: number }[],
    coupon?: string,
): Promise<{ id: string; status: string; subtotal: number; discount: number; shipping: number; total: number }> {
    const res = await app.inject({ method: 'POST', url: '/orders', payload: { userId, items, coupon } })
    assert.equal(res.statusCode, 201)
    return res.json()
}

export async function payOrder(
    app: FastifyInstance,
    orderId: string,
    method: 'PIX' | 'CARD' = 'PIX',
    extra: { cardNumber?: string; installments?: number } = {},
): Promise<{ id: string; status: string; total: number }> {
    const payload = method === 'PIX'
        ? { method }
        : { method, cardNumber: extra.cardNumber ?? '12345678901234', ...extra }
    const res = await app.inject({
        method: 'POST', url: `/orders/${orderId}/pay`,
        payload,
    })
    assert.equal(res.statusCode, 200)
    return res.json()
}

export async function shipOrder(
    app: FastifyInstance,
    orderId: string,
): Promise<{ id: string; status: string; trackingCode: string }> {
    const res = await app.inject({ method: 'POST', url: `/orders/${orderId}/ship` })
    assert.equal(res.statusCode, 200)
    return res.json()
}

export async function cancelOrder(
    app: FastifyInstance,
    orderId: string,
): Promise<{ id: string; status: string }> {
    const res = await app.inject({ method: 'POST', url: `/orders/${orderId}/cancel` })
    assert.equal(res.statusCode, 200)
    return res.json()
}

/**
 * Retorna todos os argumentos dos calls de console.log capturados pelo mock.
 * Deve ser chamado depois de mock.method(console, 'log', ...) estar ativo.
 */
export function capturedLogs(): string[] {
    return (console.log as any).mock.calls.map((c: any) => c.arguments[0])
}
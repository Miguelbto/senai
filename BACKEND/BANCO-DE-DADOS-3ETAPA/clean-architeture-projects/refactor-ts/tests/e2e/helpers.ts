// tests/e2e/helpers.ts
export async function createUser(app, o = {}) { /* retorna id */ }
export async function createProduct(app, o = {}) { /* retorna id */ }
export async function createOrder(app, userId, items, coupon?) { /* retorna { id, ...body } */ }
export async function payOrder(app, orderId, method = 'PIX') { /* ... */ }
export async function shipOrder(app, orderId) { /* ... */ }
export function capturedLogs(): string[] { /* lê console.log mockado */ }
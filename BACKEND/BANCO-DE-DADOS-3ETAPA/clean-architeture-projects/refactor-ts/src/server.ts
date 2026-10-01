/**
 * ============================================================
 *  MINI LOJA - VERSÃO LEGADA (MONOLÍTICA, DE PROPÓSITO BAGUNÇADA)
 * ============================================================
 *  Este arquivo é o ponto de partida do exercício de refatoração.
 *  NÃO "conserte" nada antes de ler o guia de estudos.
 *
 *  Setup:
 *    npm init -y
 *    npm i fastify better-sqlite3
 *    npm i -D typescript tsx @types/node @types/better-sqlite3
 *    npx tsc --init   (deixe "strict": false por enquanto)
 *    npx tsx src/server.ts
 */

import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import Fastify, {FastifyInstance} from 'fastify'
import Database from 'better-sqlite3'
import crypto from 'crypto'


const app = Fastify({ logger: false })
const db = new Database('loja.db')

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    is_vip INTEGER DEFAULT 0,
    created_at TEXT
  );
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT,
    price_cents INTEGER,
    stock INTEGER,
    active INTEGER DEFAULT 1
  );
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    status TEXT,
    subtotal INTEGER,
    discount INTEGER,
    shipping INTEGER,
    total INTEGER,
    coupon TEXT,
    payment_method TEXT,
    installments INTEGER,
    tracking_code TEXT,
    created_at TEXT,
    paid_at TEXT,
    shipped_at TEXT,
    canceled_at TEXT
  );
  CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY,
    order_id TEXT,
    product_id TEXT,
    quantity INTEGER,
    unit_price INTEGER
  );
`)




// ---------- USUÁRIOS ----------
app.post('/users', async (req: any, reply: any) => {
  const { name, email, password, isVip } = req.body || {}

  if (!name || name.length < 2) {
    return reply.status(400).send({ error: 'nome invalido' })
  }
  if (!email || !email.includes('@') || !email.includes('.')) {
    return reply.status(400).send({ error: 'email invalido' })
  }
  if (!password || password.length < 6) {
    return reply.status(400).send({ error: 'senha deve ter no minimo 6 caracteres' })
  }

  const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase())
  if (exists) {
    return reply.status(409).send({ error: 'email ja cadastrado' })
  }

  const id = crypto.randomUUID()
  const hash = crypto.createHash('sha256').update(password + 'segredo123').digest('hex')

  db.prepare(
    'INSERT INTO users (id, name, email, password, is_vip, created_at) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(id, name, email.toLowerCase(), hash, isVip ? 1 : 0, new Date().toISOString())

  console.log('[EMAIL FAKE] Bem-vindo, ' + name + '! Enviado para ' + email)

  return reply.status(201).send({ id, name, email: email.toLowerCase(), isVip: !!isVip })
})

app.get('/users/:id', async (req: any, reply: any) => {
  const u: any = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id)
  if (!u) return reply.status(404).send({ error: 'usuario nao encontrado' })
  return { id: u.id, name: u.name, email: u.email, isVip: !!u.is_vip, createdAt: u.created_at }
})

// ---------- PRODUTOS ----------
app.post('/products', async (req: any, reply: any) => {
  const { name, price, stock } = req.body || {}

  if (!name || name.trim() === '') {
    return reply.status(400).send({ error: 'nome invalido' })
  }
  if (typeof price !== 'number' || price <= 0) {
    return reply.status(400).send({ error: 'preco invalido' })
  }
  if (typeof stock !== 'number' || stock < 0 || !Number.isInteger(stock)) {
    return reply.status(400).send({ error: 'estoque invalido' })
  }

  const id = crypto.randomUUID()
  const priceCents = Math.round(price * 100)

  db.prepare('INSERT INTO products (id, name, price_cents, stock, active) VALUES (?, ?, ?, ?, 1)').run(
    id,
    name.trim(),
    priceCents,
    stock
  )

  return reply.status(201).send({ id, name: name.trim(), price: priceCents / 100, stock })
})

app.get('/products', async () => {
  const rows: any[] = db.prepare('SELECT * FROM products WHERE active = 1').all()
  return rows.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price_cents / 100,
    stock: p.stock,
  }))
})

app.delete('/products/:id', async (req: any, reply: any) => {
  const p: any = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id)
  if (!p) return reply.status(404).send({ error: 'produto nao encontrado' })

  // nao deixa desativar produto que esta em pedido pendente
  const pend: any = db
    .prepare(
      `SELECT COUNT(*) as c FROM order_items oi
       JOIN orders o ON o.id = oi.order_id
       WHERE oi.product_id = ? AND o.status = 'PENDING'`
    )
    .get(req.params.id)
  if (pend.c > 0) {
    return reply.status(409).send({ error: 'produto em pedido pendente' })
  }

  db.prepare('UPDATE products SET active = 0 WHERE id = ?').run(req.params.id)
  return reply.status(204).send()
})

// ---------- PEDIDOS ----------
app.post('/orders', async (req: any, reply: any) => {
  const { userId, items, coupon } = req.body || {}

  if (!userId) return reply.status(400).send({ error: 'userId obrigatorio' })
  if (!items || !Array.isArray(items) || items.length === 0) {
    return reply.status(400).send({ error: 'pedido sem itens' })
  }

  const user: any = db.prepare('SELECT * FROM users WHERE id = ?').get(userId)
  if (!user) return reply.status(404).send({ error: 'usuario nao encontrado' })

  let subtotal = 0
  const lines: any[] = []

  for (const it of items) {
    if (!it.productId || !it.quantity || it.quantity <= 0 || !Number.isInteger(it.quantity)) {
      return reply.status(400).send({ error: 'item invalido' })
    }
    if (it.quantity > 10) {
      return reply.status(400).send({ error: 'maximo de 10 unidades por item' })
    }
    const p: any = db.prepare('SELECT * FROM products WHERE id = ?').get(it.productId)
    if (!p) return reply.status(404).send({ error: 'produto ' + it.productId + ' nao encontrado' })
    if (!p.active) return reply.status(400).send({ error: 'produto ' + p.name + ' indisponivel' })
    if (p.stock < it.quantity) {
      return reply.status(409).send({ error: 'estoque insuficiente para ' + p.name })
    }
    subtotal += p.price_cents * it.quantity
    lines.push({ productId: p.id, quantity: it.quantity, unitPrice: p.price_cents })
  }

  let discount = 0
  let freeShipping = false

  if (coupon) {
    const c = String(coupon).toUpperCase()
    if (c === 'PROMO10') {
      discount = Math.round(subtotal * 0.1)
    } else if (c === 'VIP20') {
      if (!user.is_vip) {
        return reply.status(403).send({ error: 'cupom exclusivo para clientes VIP' })
      }
      discount = Math.round(subtotal * 0.2)
    } else if (c === 'FRETEGRATIS') {
      freeShipping = true
    } else {
      return reply.status(400).send({ error: 'cupom invalido' })
    }
  }

  let shipping = 1990
  if (subtotal - discount >= 20000) shipping = 0
  if (freeShipping) shipping = 0

  const total = subtotal - discount + shipping
  if (total < 1000) {
    return reply.status(400).send({ error: 'pedido minimo de R$ 10,00' })
  }

  const orderId = crypto.randomUUID()

  const tx = db.transaction(() => {
    db.prepare(
      `INSERT INTO orders (id, user_id, status, subtotal, discount, shipping, total, coupon, created_at)
       VALUES (?, ?, 'PENDING', ?, ?, ?, ?, ?, ?)`
    ).run(orderId, userId, subtotal, discount, shipping, total, coupon ? String(coupon).toUpperCase() : null, new Date().toISOString())

    for (const l of lines) {
      db.prepare('INSERT INTO order_items (id, order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?, ?)').run(
        crypto.randomUUID(),
        orderId,
        l.productId,
        l.quantity,
        l.unitPrice
      )
      db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(l.quantity, l.productId)
    }
  })
  tx()

  console.log('[EMAIL FAKE] Pedido ' + orderId + ' criado para ' + user.email + ' no valor de R$ ' + (total / 100).toFixed(2))

  return reply.status(201).send({
    id: orderId,
    status: 'PENDING',
    subtotal: subtotal / 100,
    discount: discount / 100,
    shipping: shipping / 100,
    total: total / 100,
  })
})

app.get('/orders/:id', async (req: any, reply: any) => {
  const o: any = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id)
  if (!o) return reply.status(404).send({ error: 'pedido nao encontrado' })
  const items: any[] = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(o.id)
  return {
    id: o.id,
    userId: o.user_id,
    status: o.status,
    subtotal: o.subtotal / 100,
    discount: o.discount / 100,
    shipping: o.shipping / 100,
    total: o.total / 100,
    coupon: o.coupon,
    paymentMethod: o.payment_method,
    installments: o.installments,
    trackingCode: o.tracking_code,
    items: items.map((i) => ({ productId: i.product_id, quantity: i.quantity, unitPrice: i.unit_price / 100 })),
  }
})

app.post('/orders/:id/pay', async (req: any, reply: any) => {
  const { method, installments, cardNumber } = req.body || {}
  const o: any = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id)
  if (!o) return reply.status(404).send({ error: 'pedido nao encontrado' })

  if (o.status !== 'PENDING') {
    return reply.status(409).send({ error: 'pedido nao esta pendente, status atual: ' + o.status })
  }

  let finalTotal = o.total

  if (method === 'PIX') {
    finalTotal = Math.round(o.total * 0.95)
  } else if (method === 'CARD') {
    const inst = installments || 1
    if (!Number.isInteger(inst) || inst < 1 || inst > 12) {
      return reply.status(400).send({ error: 'parcelas devem ser entre 1 e 12' })
    }
    if (!cardNumber || String(cardNumber).length < 13) {
      return reply.status(400).send({ error: 'cartao invalido' })
    }
    if (inst > 6) {
      finalTotal = Math.round(o.total * 1.03)
    }
    // gateway de pagamento "fake"
    if (String(cardNumber).startsWith('0000')) {
      console.log('[GATEWAY FAKE] cartao recusado')
      return reply.status(402).send({ error: 'pagamento recusado' })
    }
    console.log('[GATEWAY FAKE] cartao aprovado em ' + inst + 'x')
  } else {
    return reply.status(400).send({ error: 'metodo de pagamento invalido (PIX ou CARD)' })
  }

  db.prepare(
    "UPDATE orders SET status = 'PAID', total = ?, payment_method = ?, installments = ?, paid_at = ? WHERE id = ?"
  ).run(finalTotal, method, method === 'CARD' ? installments || 1 : 1, new Date().toISOString(), o.id)

  const u: any = db.prepare('SELECT * FROM users WHERE id = ?').get(o.user_id)
  console.log('[EMAIL FAKE] Pagamento confirmado do pedido ' + o.id + ' para ' + u.email)

  return { id: o.id, status: 'PAID', total: finalTotal / 100 }
})

app.post('/orders/:id/ship', async (req: any, reply: any) => {
  const o: any = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id)
  if (!o) return reply.status(404).send({ error: 'pedido nao encontrado' })

  if (o.status !== 'PAID') {
    return reply.status(409).send({ error: 'so e possivel enviar pedidos pagos' })
  }

  const tracking = 'BR' + Math.floor(Math.random() * 1000000000) + 'XX'

  db.prepare("UPDATE orders SET status = 'SHIPPED', tracking_code = ?, shipped_at = ? WHERE id = ?").run(
    tracking,
    new Date().toISOString(),
    o.id
  )

  const u: any = db.prepare('SELECT * FROM users WHERE id = ?').get(o.user_id)
  console.log('[EMAIL FAKE] Seu pedido ' + o.id + ' foi enviado! Rastreio: ' + tracking + ' -> ' + u.email)

  return { id: o.id, status: 'SHIPPED', trackingCode: tracking }
})

app.post('/orders/:id/cancel', async (req: any, reply: any) => {
  const o: any = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id)
  if (!o) return reply.status(404).send({ error: 'pedido nao encontrado' })

  if (o.status === 'SHIPPED') {
    return reply.status(409).send({ error: 'pedido ja enviado nao pode ser cancelado' })
  }
  if (o.status === 'CANCELED') {
    return reply.status(409).send({ error: 'pedido ja cancelado' })
  }

  const items: any[] = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(o.id)

  const tx = db.transaction(() => {
    db.prepare("UPDATE orders SET status = 'CANCELED', canceled_at = ? WHERE id = ?").run(
      new Date().toISOString(),
      o.id
    )
    for (const i of items) {
      db.prepare('UPDATE products SET stock = stock + ? WHERE id = ?').run(i.quantity, i.product_id)
    }
  })
  tx()

  if (o.status === 'PAID') {
    console.log('[GATEWAY FAKE] estornando R$ ' + (o.total / 100).toFixed(2) + ' do pedido ' + o.id)
  }

  const u: any = db.prepare('SELECT * FROM users WHERE id = ?').get(o.user_id)
  console.log('[EMAIL FAKE] Pedido ' + o.id + ' cancelado. Aviso enviado para ' + u.email)

  return { id: o.id, status: 'CANCELED' }
})

// ---------- RELATÓRIO ----------
app.get('/reports/sales', async () => {
  const rows: any[] = db
    .prepare("SELECT status, COUNT(*) as qtd, SUM(total) as soma FROM orders GROUP BY status")
    .all()
  let faturamento = 0
  for (const r of rows) {
    if (r.status === 'PAID' || r.status === 'SHIPPED') faturamento += r.soma
  }
  return { porStatus: rows, faturamento: faturamento / 100 }
})

// ---------- START ----------
app.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
  console.log('Servidor rodando em http://localhost:3000')
})



//------------------------------------------------
//     TESTES
//-------------------------------------------------------


describe('Suíte de Testes de Integração em Memória', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = buildApp({ dbInMemoria: true });
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  // ==========================================
  // 1. USUÁRIOS E CADASTRO
  // ==========================================
  describe('Cadastro de Usuários', () => {
    it('deve cadastrar um usuário com dados válidos', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/users',
        payload: {
          nome: 'Miguel Silva',
          email: 'miguel@email.com',
          senha: 'SenhaSegura123!',
          isVip: false,
        },
      });

      assert.equal(response.statusCode, 201);
      assert.ok(response.json().id);
    });

    it('deve recusar cadastro com e-mail duplicado', async () => {
      const payload = { nome: 'Ana', email: 'ana@email.com', senha: 'Password123!' };

      await app.inject({ method: 'POST', url: '/users', payload });
      const response = await app.inject({ method: 'POST', url: '/users', payload });

      assert.equal(response.statusCode, 409);
    });

    it('deve recusar dados inválidos (e-mail, senha e nome)', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/users',
        payload: {
          nome: '', // Inválido
          email: 'email-invalido', // Inválido
          senha: '123', // Senha fraca/curta
        },
      });

      assert.equal(response.statusCode, 400);
    });
  });

  // ==========================================
  // 2. PRODUTOS
  // ==========================================
  describe('Gestão de Produtos', () => {
    it('deve criar um produto válido', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/products',
        payload: {
          nome: 'Teclado Mecânico',
          preco: 150.0,
          estoque: 20,
          ativo: true,
        },
      });

      assert.equal(response.statusCode, 201);
    });

    it('deve recusar produto inválido (preço negativo)', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/products',
        payload: { nome: 'Mouse', preco: -10, estoque: 5 },
      });

      assert.equal(response.statusCode, 400);
    });

    it('deve listar todos os produtos ativos', async () => {
      const response = await app.inject({ method: 'GET', url: '/products' });

      assert.equal(response.statusCode, 200);
      assert.ok(Array.isArray(response.json()));
    });

    it('deve permitir exclusão de produto sem pedido pendente', async () => {
      const createRes = await app.inject({
        method: 'POST',
        url: '/products',
        payload: { nome: 'Monitor', preco: 800, estoque: 2 },
      });
      const productId = createRes.json().id;

      const deleteRes = await app.inject({
        method: 'DELETE',
        url: `/products/${productId}`,
      });

      assert.equal(deleteRes.statusCode, 200);
    });

    it('deve impedir exclusão de produto com pedido pendente', async () => {
      // Cria produto, cria pedido vinculado e tenta excluir o produto
      const prodRes = await app.inject({
        method: 'POST',
        url: '/products',
        payload: { nome: 'Cadeira', preco: 500, estoque: 10 },
      });
      const productId = prodRes.json().id;

      await app.inject({
        method: 'POST',
        url: '/orders',
        payload: { itens: [{ produtoId: productId, quantidade: 1 }] },
      });

      const deleteRes = await app.inject({
        method: 'DELETE',
        url: `/products/${productId}`,
      });

      assert.equal(deleteRes.statusCode, 400);
    });
  });

  // ==========================================
  // 3. PEDIDOS E REGRAS DE NEGÓCIO
  // ==========================================
  describe('Criação de Pedidos', () => {
    it('deve criar pedido no caminho feliz', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/orders',
        payload: {
          clienteId: 'user-1',
          itens: [{ produtoId: 'prod-1', quantidade: 2 }],
        },
      });

      assert.equal(response.statusCode, 201);
    });

    it('deve rejeitar pedido sem itens', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/orders',
        payload: { clienteId: 'user-1', itens: [] },
      });

      assert.equal(response.statusCode, 400);
    });

    it('deve rejeitar quantidade maior que o limite permitido (ex: 11 unidades)', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/orders',
        payload: {
          clienteId: 'user-1',
          itens: [{ produtoId: 'prod-1', quantidade: 11 }],
        },
      });

      assert.equal(response.statusCode, 400);
    });

    it('deve rejeitar pedido por estoque insuficiente', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/orders',
        payload: {
          clienteId: 'user-1',
          itens: [{ produtoId: 'prod-baixo-estoque', quantidade: 10 }],
        },
      });

      assert.equal(response.statusCode, 400);
    });

    it('deve rejeitar pedido com produto inativo', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/orders',
        payload: {
          clienteId: 'user-1',
          itens: [{ produtoId: 'prod-inativo', quantidade: 1 }],
        },
      });

      assert.equal(response.statusCode, 400);
    });

    it('deve aplicar cupom válido', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/orders',
        payload: {
          clienteId: 'user-1',
          itens: [{ produtoId: 'prod-1', quantidade: 1 }],
          cupom: 'PROMO10',
        },
      });

      assert.equal(response.statusCode, 201);
      assert.ok(response.json().desconto > 0);
    });

    it('deve impedir uso de cupom VIP por usuário não-VIP', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/orders',
        payload: {
          clienteId: 'user-normal',
          itens: [{ produtoId: 'prod-1', quantidade: 1 }],
          cupom: 'CUPOM_VIP',
        },
      });

      assert.equal(response.statusCode, 403);
    });

    it('deve conceder frete grátis ao atingir valor mínimo', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/orders',
        payload: {
          clienteId: 'user-1',
          itens: [{ produtoId: 'prod-caro', quantidade: 1 }], // Valor > R$ 200
        },
      });

      assert.equal(response.json().valorFrete, 0);
    });

    it('deve rejeitar pedido abaixo do valor mínimo exigido', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/orders',
        payload: {
          clienteId: 'user-1',
          itens: [{ produtoId: 'prod-barato', quantidade: 1 }], // Valor < R$ 10
        },
      });

      assert.equal(response.statusCode, 400);
    });
  });

  // ==========================================
  // 4. PAGAMENTOS
  // ==========================================
  describe('Processamento de Pagamentos', () => {
    it('deve processar pagamento via PIX', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/payments',
        payload: { pedidoId: 'order-1', metodo: 'PIX' },
      });

      assert.equal(response.statusCode, 200);
      assert.equal(response.json().status, 'PAGO');
    });

    it('deve processar cartão à vista', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/payments',
        payload: { pedidoId: 'order-1', metodo: 'CREDITO', parcelas: 1 },
      });

      assert.equal(response.statusCode, 200);
    });

    it('deve processar cartão em 7x', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/payments',
        payload: { pedidoId: 'order-1', metodo: 'CREDITO', parcelas: 7 },
      });

      assert.equal(response.statusCode, 200);
    });

    it('deve tratar cartão recusado pela operadora', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/payments',
        payload: { pedidoId: 'order-1', metodo: 'CREDITO', numeroCartao: '0000000000000000' },
      });

      assert.equal(response.statusCode, 402); // Payment Required / Recusado
    });

    it('deve recusar pagamento para pedido já pago', async () => {
      await app.inject({
        method: 'POST',
        url: '/payments',
        payload: { pedidoId: 'order-pago', metodo: 'PIX' },
      });

      const segundoPgto = await app.inject({
        method: 'POST',
        url: '/payments',
        payload: { pedidoId: 'order-pago', metodo: 'PIX' },
      });

      assert.equal(segundoPgto.statusCode, 400);
    });
  });

  // ==========================================
  // 5. ENVIO E CANCELAMENTO
  // ==========================================
  describe('Fluxo de Estados (Envio e Cancelamento)', () => {
    it('deve enviar pedido com status PAGO', async () => {
      const response = await app.inject({
        method: 'PATCH',
        url: '/orders/order-paga/ship',
      });

      assert.equal(response.statusCode, 200);
      assert.equal(response.json().status, 'ENVIADO');
    });

    it('deve recusar envio de pedido com status PENDENTE', async () => {
      const response = await app.inject({
        method: 'PATCH',
        url: '/orders/order-pendente/ship',
      });

      assert.equal(response.statusCode, 400);
    });

    it('deve permitir cancelamento de pedido PENDENTE', async () => {
      const response = await app.inject({
        method: 'PATCH',
        url: '/orders/order-pendente/cancel',
      });

      assert.equal(response.statusCode, 200);
      assert.equal(response.json().status, 'CANCELADO');
    });

    it('deve permitir cancelamento de pedido PAGO e estornar', async () => {
      const response = await app.inject({
        method: 'PATCH',
        url: '/orders/order-paga/cancel',
      });

      assert.equal(response.statusCode, 200);
      assert.equal(response.json().estornado, true);
    });

    it('deve recusar cancelamento de pedido já ENVIADO ou ENTREGUE', async () => {
      const response = await app.inject({
        method: 'PATCH',
        url: '/orders/order-enviada/cancel',
      });

      assert.equal(response.statusCode, 400);
    });
  });

  // ==========================================
  // 6. RELATÓRIO DE VENDAS
  // ==========================================
  describe('Relatórios', () => {
    it('deve gerar relatório de vendas com totais calculados', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/reports/sales?dataInicio=2026-01-01&dataFim=2026-12-31',
      });

      assert.equal(response.statusCode, 200);
      const data = response.json();
      assert.ok('totalVendas' in data);
      assert.ok('faturamentoTotal' in data);
    });
  });
});
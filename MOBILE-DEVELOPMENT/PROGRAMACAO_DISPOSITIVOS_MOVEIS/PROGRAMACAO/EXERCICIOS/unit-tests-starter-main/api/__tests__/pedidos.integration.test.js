const request = require('supertest');
const createApp = require('../app');

// Teste de integracao: testa a API de ponta a ponta via HTTP real.
// Cada teste recebe uma app nova (factory), garantindo estado isolado.

describe('API /pedidos (integracao com supertest)', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  describe('GET /pedidos', () => {
    test('retorna 200 e um array com os pedidos iniciais', async () => {
      const res = await request(app).get('/pedidos');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
    });
  });

  describe('GET /pedidos/:id', () => {
    test('retorna 200 e o pedido quando o id existe', async () => {
      const listRes = await request(app).get('/pedidos');
      const pedidoExistente = listRes.body[0];

      const res = await request(app).get(`/pedidos/${pedidoExistente.id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', pedidoExistente.id);
    });

    test('retorna 404 com mensagem de erro quando o pedido nao existe', async () => {
      const res = await request(app).get('/pedidos/99999');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('mensagem');
    });
  });

  describe('POST /pedidos', () => {
    test('retorna 201 e o pedido criado com o total calculado corretamente', async () => {
      const novoPedido = {
        cliente: 'Carlos Silva',
        itens: [
          { nome: 'Hamburguer X Bacon', preco: 20, quantidade: 2 },
          { nome: 'Refrigerante', preco: 10, quantidade: 1 }
        ]
      };

      const res = await request(app)
        .post('/pedidos')
        .send(novoPedido);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.cliente).toBe(novoPedido.cliente);
      expect(res.body.total).toBe(50);
    });

    test('retorna 400 quando o cliente esta faltando', async () => {
      const res = await request(app)
        .post('/pedidos')
        .send({
          itens: [{ nome: 'Hamburguer', preco: 25, quantidade: 1 }]
        });

      expect(res.status).toBe(400);
    });

    test('retorna 400 quando a lista de itens esta vazia', async () => {
      const res = await request(app)
        .post('/pedidos')
        .send({
          cliente: 'Carlos Silva',
          itens: []
        });

      expect(res.status).toBe(400);
    });

    test('retorna 400 quando algum item tem preco ou quantidade invalidos', async () => {
      const res = await request(app)
        .post('/pedidos')
        .send({
          cliente: 'Carlos Silva',
          itens: [{ nome: 'Hamburguer', preco: -10, quantidade: 0 }]
        });

      expect(res.status).toBe(400);
    });
  });

  describe('PATCH /pedidos/:id/status', () => {
    test('retorna 200 e o pedido com o novo status quando o id existe', async () => {
      const listRes = await request(app).get('/pedidos');
      const pedidoExistente = listRes.body[0];

      const res = await request(app)
        .patch(`/pedidos/${pedidoExistente.id}/status`)
        .send({ status: 'em_preparo' });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('em_preparo');
    });

    test('retorna 404 quando o pedido nao existe', async () => {
      const res = await request(app)
        .patch('/pedidos/99999/status')
        .send({ status: 'em_preparo' });

      expect(res.status).toBe(404);
    });

    test('retorna 400 quando o status enviado e invalido', async () => {
      const listRes = await request(app).get('/pedidos');
      const pedidoExistente = listRes.body[0];

      const res = await request(app)
        .patch(`/pedidos/${pedidoExistente.id}/status`)
        .send({ status: 'status_invalido' });

      expect(res.status).toBe(400);
    });

    test('retorna 400 ao tentar alterar o status de um pedido ja cancelado', async () => {
      const listRes = await request(app).get('/pedidos');
      const pedidoExistente = listRes.body[0];

      await request(app)
        .patch(`/pedidos/${pedidoExistente.id}/status`)
        .send({ status: 'cancelado' });

      const res = await request(app)
        .patch(`/pedidos/${pedidoExistente.id}/status`)
        .send({ status: 'entregue' });

      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /pedidos/:id', () => {
    test('retorna 204 quando o pedido e removido com sucesso', async () => {
      const listRes = await request(app).get('/pedidos');
      const pedidoParaDeletar = listRes.body[0];

      const res = await request(app).delete(`/pedidos/${pedidoParaDeletar.id}`);

      expect(res.status).toBe(204);
    });

    test('pedido removido nao aparece mais na listagem', async () => {
      const listRes = await request(app).get('/pedidos');
      const pedidoParaDeletar = listRes.body[0];

      await request(app).delete(`/pedidos/${pedidoParaDeletar.id}`);

      const res = await request(app).get('/pedidos');

      expect(res.status).toBe(200);
      expect(res.body.some(p => p.id === pedidoParaDeletar.id)).toBe(false);
    });

    test('retorna 404 quando o pedido nao existe', async () => {
      const res = await request(app).delete('/pedidos/99999');

      expect(res.status).toBe(404);
    });
  });
});
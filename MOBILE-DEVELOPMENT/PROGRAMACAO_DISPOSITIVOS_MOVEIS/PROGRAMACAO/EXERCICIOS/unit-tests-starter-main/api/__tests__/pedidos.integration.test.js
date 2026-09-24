const request = require('supertest');
const createApp = require('../app');

// Teste de integracao: testa a API de ponta a ponta via HTTP real.
// Cada teste recebe uma app nova (factory), garantindo estado isolado.
//
// Abaixo ha 1 teste pronto (GET /pedidos) como referencia de estilo.
// Os demais estao como test.todo — implemente cada um seguindo o ENUNCIADO-03-PEDIDOS.md.

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
    test.todo('retorna 200 e o pedido quando o id existe');
    test.todo('retorna 404 com mensagem de erro quando o pedido nao existe');
  });

  describe('POST /pedidos', () => {
    test.todo('retorna 201 e o pedido criado com o total calculado corretamente');
    test.todo('retorna 400 quando o cliente esta faltando');
    test.todo('retorna 400 quando a lista de itens esta vazia');
    test.todo('retorna 400 quando algum item tem preco ou quantidade invalidos');
  });

  describe('PATCH /pedidos/:id/status', () => {
    test.todo('retorna 200 e o pedido com o novo status quando o id existe');
    test.todo('retorna 404 quando o pedido nao existe');
    test.todo('retorna 400 quando o status enviado e invalido');
    test.todo('retorna 400 ao tentar alterar o status de um pedido ja cancelado');
  });

  describe('DELETE /pedidos/:id', () => {
    test.todo('retorna 204 quando o pedido e removido com sucesso');
    test.todo('pedido removido nao aparece mais na listagem');
    test.todo('retorna 404 quando o pedido nao existe');
  });
});

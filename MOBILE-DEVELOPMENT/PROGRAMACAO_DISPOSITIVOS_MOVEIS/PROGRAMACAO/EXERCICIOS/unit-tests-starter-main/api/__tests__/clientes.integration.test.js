const request = require('supertest');
const createApp = require('../app');

// Teste de integracao: testa a API de ponta a ponta via HTTP real.
// Cada teste recebe uma app nova (factory), garantindo estado isolado.
//
// Abaixo ha 1 teste pronto (GET /clientes) como referencia de estilo.
// Os demais estao como test.todo — implemente cada um seguindo o ENUNCIADO-02-CLIENTES.md.

describe('API /clientes (integracao com supertest)', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  describe('GET /clientes', () => {
    test('retorna 200 e um array com os clientes iniciais', async () => {
      const res = await request(app).get('/clientes');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });
  });

  describe('GET /clientes/:id', () => {
    test.todo('retorna 200 e o cliente quando o id existe');
    test.todo('retorna 404 com mensagem de erro quando o cliente nao existe');
  });

  describe('POST /clientes', () => {
    test.todo('retorna 201 e o cliente criado com id gerado');
    test.todo('retorna 400 quando o nome esta faltando');
    test.todo('retorna 400 quando o email esta faltando');
    test.todo('retorna 400 quando o email ja esta cadastrado');
    test.todo('cliente criado aparece em GET /clientes');
  });

  describe('PUT /clientes/:id', () => {
    test.todo('retorna 200 e o cliente atualizado quando o id existe');
    test.todo('retorna 404 quando o cliente nao existe');
    test.todo('retorna 400 quando o novo email ja pertence a outro cliente');
  });

  describe('DELETE /clientes/:id', () => {
    test.todo('retorna 204 quando o cliente e removido com sucesso');
    test.todo('cliente removido nao aparece mais na listagem');
    test.todo('retorna 404 quando o cliente nao existe');
  });
});

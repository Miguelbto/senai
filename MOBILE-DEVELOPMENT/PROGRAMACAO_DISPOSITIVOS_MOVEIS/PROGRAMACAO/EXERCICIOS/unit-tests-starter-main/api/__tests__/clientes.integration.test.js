const request = require('supertest');
const createApp = require('../app');

// Teste de integracao: testa a API de ponta a ponta via HTTP real.
// Cada teste recebe uma app nova (factory), garantindo estado isolado.

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
    test('retorna 200 e o cliente quando o id existe', async () => {
      const listRes = await request(app).get('/clientes');
      const clienteExistente = listRes.body[0];

      const res = await request(app).get(`/clientes/${clienteExistente.id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', clienteExistente.id);
    });

    test('retorna 404 com mensagem de erro quando o cliente nao existe', async () => {
      const res = await request(app).get('/clientes/999999');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('mensagem');
    });
  });

  describe('POST /clientes', () => {
    test('retorna 201 e o cliente criado com id gerado', async () => {
      const novoCliente = { nome: 'Carlos Silva', email: 'carlos@email.com' };

      const res = await request(app)
        .post('/clientes')
        .send(novoCliente);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.nome).toBe(novoCliente.nome);
      expect(res.body.email).toBe(novoCliente.email);
    });

    test('retorna 400 quando o nome esta faltando', async () => {
      const res = await request(app)
        .post('/clientes')
        .send({ email: 'semnome@email.com' });

      expect(res.status).toBe(400);
    });

    test('retorna 400 quando o email esta faltando', async () => {
      const res = await request(app)
        .post('/clientes')
        .send({ nome: 'Sem Email' });

      expect(res.status).toBe(400);
    });

    test('retorna 400 quando o email ja esta cadastrado', async () => {
      const listRes = await request(app).get('/clientes');
      const emailExistente = listRes.body[0].email;

      const res = await request(app)
        .post('/clientes')
        .send({ nome: 'Duplicado', email: emailExistente });

      expect(res.status).toBe(400);
    });

    test('cliente criado aparece em GET /clientes', async () => {
      const novoCliente = { nome: 'Mariana Lima', email: 'mariana@email.com' };

      await request(app)
        .post('/clientes')
        .send(novoCliente);

      const res = await request(app).get('/clientes');

      expect(res.status).toBe(200);
      expect(res.body.some(c => c.email === novoCliente.email)).toBe(true);
    });
  });

  describe('PUT /clientes/:id', () => {
    test('retorna 200 e o cliente atualizado quando o id existe', async () => {
      const listRes = await request(app).get('/clientes');
      const clienteParaAtualizar = listRes.body[0];

      const dadosAtualizados = {
        nome: 'Nome Atualizado',
        email: 'atualizado@email.com'
      };

      const res = await request(app)
        .put(`/clientes/${clienteParaAtualizar.id}`)
        .send(dadosAtualizados);

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(clienteParaAtualizar.id);
      expect(res.body.nome).toBe(dadosAtualizados.nome);
      expect(res.body.email).toBe(dadosAtualizados.email);
    });

    test('retorna 404 quando o cliente nao existe', async () => {
      const res = await request(app)
        .put('/clientes/999999')
        .send({ nome: 'Inexistente', email: 'inexistente@email.com' });

      expect(res.status).toBe(404);
    });

    test('retorna 400 quando o novo email ja pertence a outro cliente', async () => {
      const listRes = await request(app).get('/clientes');
      const cliente1 = listRes.body[0];
      const cliente2 = listRes.body[1];

      const res = await request(app)
        .put(`/clientes/${cliente1.id}`)
        .send({ nome: cliente1.nome, email: cliente2.email });

      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /clientes/:id', () => {
    test('retorna 204 quando o cliente e removido com sucesso', async () => {
      const listRes = await request(app).get('/clientes');
      const clienteParaDeletar = listRes.body[0];

      const res = await request(app).delete(`/clientes/${clienteParaDeletar.id}`);

      expect(res.status).toBe(204);
    });

    test('cliente removido nao aparece mais na listagem', async () => {
      const listRes = await request(app).get('/clientes');
      const clienteParaDeletar = listRes.body[0];

      await request(app).delete(`/clientes/${clienteParaDeletar.id}`);

      const res = await request(app).get('/clientes');

      expect(res.status).toBe(200);
      expect(res.body.some(c => c.id === clienteParaDeletar.id)).toBe(false);
    });

    test('retorna 404 quando o cliente nao existe', async () => {
      const res = await request(app).delete('/clientes/999999');

      expect(res.status).toBe(404);
    });
  });
});
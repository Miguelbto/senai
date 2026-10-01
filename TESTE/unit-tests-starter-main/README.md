# aula05-testes-starter

Projeto base das aulas de Testes de Software: testes unitarios e de integracao com Jest e Supertest.

## Como comecar

```bash
npm install
npm test
```

## Estrutura

```
api/
  app.js                   - cria a app Express (createApp)
  server.js                - sobe a API na porta 3000
  controllers/ services/ routes/ repositories/
  utils/calculos.js        - funcoes de calculo da lanchonete
  __tests__/               - testes unitarios e de integracao (Jest)
web/                       - front-end React (Vite)
```

## Front-end e testes E2E

O front-end em `web/` e uma tela simples de lanchonete (Produtos, Clientes e Pedidos) feita com Vite + React. Ele conversa com a API.

### Instalacao

As dependencias ficam em dois lugares: na raiz (API e testes) e em `web/` (front-end).

```bash
npm install
npm install --prefix web
```

### Rodando o sistema

```bash
npm run dev
```

Esse comando sobe os dois ao mesmo tempo:

- API em http://localhost:3000
- Front-end em http://localhost:5173

O front chama sempre `/api/...` e o Vite repassa a requisicao para a API, tirando o `/api` do caminho. Exemplo: `/api/produtos` vira `http://localhost:3000/produtos`.

### Modo E2E e o `/__reset`

Os dados da API ficam em memoria. Se um teste cadastra o cliente "Carla", ela continua la para o proximo teste, e os testes passam a depender uns dos outros.

Para resolver isso, a API tem um modo especial para testes E2E:

```bash
npm run api:e2e
```

Nesse modo existe o endpoint `POST /__reset`, que recria a app com os dados iniciais e responde `204`. Os testes chamam esse endpoint antes de cada teste (no `beforeEach`) para sempre comecar do mesmo estado.

Com `npm run api` (modo normal), o `/__reset` nao existe e responde `404`. Assim ninguem apaga os dados sem querer fora dos testes.

### Endpoints

| Metodo | Caminho                 | Descricao                                   |
| ------ | ----------------------- | ------------------------------------------- |
| GET    | `/produtos`             | Lista os produtos                           |
| GET    | `/produtos/:id`         | Busca um produto                            |
| POST   | `/produtos`             | Cria um produto (`nome`, `preco`)           |
| DELETE | `/produtos/:id`         | Remove um produto                           |
| GET    | `/clientes`             | Lista os clientes                           |
| GET    | `/clientes/:id`         | Busca um cliente                            |
| POST   | `/clientes`             | Cria um cliente (`nome`, `email`)           |
| PUT    | `/clientes/:id`         | Atualiza um cliente                         |
| DELETE | `/clientes/:id`         | Remove um cliente                           |
| GET    | `/pedidos`              | Lista os pedidos                            |
| GET    | `/pedidos/:id`          | Busca um pedido                             |
| POST   | `/pedidos`              | Cria um pedido (`cliente`, `itens`)         |
| PATCH  | `/pedidos/:id/status`   | Muda o status (`pendente`, `pago`, `cancelado`) |
| DELETE | `/pedidos/:id`          | Remove um pedido                            |
| POST   | `/__reset`              | Volta aos dados iniciais (so no modo E2E)   |

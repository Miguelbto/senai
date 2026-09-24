# Atividade 02 — Clientes (nivel medio)

Uma nova entidade `Cliente` foi adicionada a API, seguindo a mesma arquitetura em
camadas de `Produto`: `ClienteRepository` -> `ClienteService` -> `ClienteController` -> rotas.

O codigo de producao ja esta implementado — voce nao precisa alterar nada em
`repositories/ClienteRepository.js`, `api/services/ClienteService.js`,
`api/controllers/ClienteController.js` ou `api/routes/clientes.routes.js`.
Sua tarefa e escrever os testes.

Diferente da atividade anterior, aqui nenhum teste foi feito em aula — os arquivos
contem apenas 1 exemplo pronto (`listar` / `GET /clientes`) como referencia de estilo.
Todo o resto esta marcado com `test.todo(...)`: substitua cada `test.todo` por um
`test` completo.

---

## Regra de negocio: email unico

Diferente de `Produto`, `Cliente` tem uma regra extra: **o email precisa ser unico**.

```js
create(dados) {
  if (!dados.nome || !dados.email) {
    throw new Error("Nome e email sao obrigatorios");
  }
  if (this.findByEmail(dados.email)) {
    throw new Error("Email ja cadastrado");
  }
  ...
}
```

Isso significa que, ao testar `criar`, existem **tres** caminhos de erro possiveis
(nao so um, como em `Produto`): faltar nome, faltar email, ou email duplicado.

---

## Parte 1 — ClienteService (unitario com mock)

Arquivo: `api/__tests__/ClienteService.test.js`

### buscarPorId(id)

- Deve repassar o id ao `mockRepository.findById` e retornar o cliente encontrado
- Deve lancar erro `'Cliente nao encontrado'` quando o repository retornar `null`

### criar(dados)

- Deve repassar `dados` para `mockRepository.create` e retornar o cliente criado
- Deve propagar o erro quando nome ou email estiverem faltando
- Deve propagar o erro quando o email ja estiver cadastrado

### atualizar(id, dados)

- Deve chamar `mockRepository.findById` (para checar existencia) e depois
  `mockRepository.update` quando o cliente existe
- Deve lancar erro `'Cliente nao encontrado'` **sem chamar** `mockRepository.update`
  quando `findById` retornar `null` — use `expect(mockRepository.update).not.toHaveBeenCalled()`
- Deve propagar o erro quando o novo email ja pertencer a outro cliente

### remover(id)

- Deve chamar `mockRepository.delete` com o id correto quando o cliente existe
- Deve lancar erro `'Cliente nao encontrado'` quando o repository retornar `false`

Matchers sugeridos: `toHaveBeenCalledWith`, `not.toHaveBeenCalled`, `toEqual`, `toThrow`

---

## Parte 2 — API /clientes (integracao com supertest)

Arquivo: `api/__tests__/clientes.integration.test.js`

### GET /clientes/:id

- Deve retornar `200` e o cliente quando o id existe
- Deve retornar `404` com `{ erro: ... }` quando o cliente nao existe

### POST /clientes

- Deve retornar `201` e o cliente criado com `id` gerado
- Deve retornar `400` com `{ erro: ... }` quando o nome estiver faltando
- Deve retornar `400` com `{ erro: ... }` quando o email estiver faltando
- Deve retornar `400` com `{ erro: ... }` quando o email ja estiver cadastrado
  (dica: use um dos emails iniciais do `ClienteRepository`)
- O cliente criado deve aparecer em uma chamada seguinte a `GET /clientes`

### PUT /clientes/:id

- Deve retornar `200` e o cliente atualizado quando o id existe
- Deve retornar `404` quando o id nao existe
- Deve retornar `400` quando o novo email ja pertencer a outro cliente

### DELETE /clientes/:id

- Deve retornar `204` quando o cliente e removido com sucesso
- O cliente removido nao deve mais aparecer em `GET /clientes/:id` (deve retornar `404`)
- Deve retornar `404` com `{ erro: ... }` quando o cliente nao existir

Matchers sugeridos: `toBe`, `toHaveProperty`, `toContain`

---

## Como rodar os testes

```bash
npm test
```

Rode `npm test -- --verbose` para ver a lista de `test.todo` pendentes junto com os
testes que passaram.

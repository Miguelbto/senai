# Atividade 03 — Pedidos (nivel medio)

Uma nova entidade `Pedido` foi adicionada a API, seguindo a mesma arquitetura em
camadas de `Produto` e `Cliente`: `PedidoRepository` -> `PedidoService` ->
`PedidoController` -> rotas.

O codigo de producao ja esta implementado — voce nao precisa alterar nada em
`repositories/PedidoRepository.js`, `api/services/PedidoService.js`,
`api/controllers/PedidoController.js` ou `api/routes/pedidos.routes.js`.
Sua tarefa e escrever os testes.

Os arquivos contem apenas 1 exemplo pronto (`listar` / `GET /pedidos`) como
referencia de estilo. Todo o resto esta marcado com `test.todo(...)`: substitua
cada `test.todo` por um `test` completo.

---

## Modelo de dados

```js
{
  id: 1,
  cliente: "Ana Souza",
  itens: [
    { nome: "Coxinha", precoUnitario: 5, quantidade: 2 },
  ],
  status: "pendente", // "pendente" | "pago" | "cancelado"
  total: 10,           // calculado pelo repository, soma(precoUnitario * quantidade)
}
```

## Regras de negocio

Diferente de `Produto` e `Cliente`, `Pedido` tem duas regras mais elaboradas:

1. **Calculo automatico do total** — ao criar um pedido, o `total` e calculado a
   partir dos itens. Voce nao envia `total` no `POST`, ele e derivado.

   ```js
   const total = dados.itens.reduce(
     (soma, item) => soma + item.precoUnitario * item.quantidade,
     0,
   );
   ```

2. **Transicao de status** — um pedido `cancelado` nao pode mais ter seu status
   alterado (nem para `pago`, nem de novo para `cancelado`). Um status fora da lista
   `pendente | pago | cancelado` e invalido.

   ```js
   updateStatus(id, novoStatus) {
     ...
     if (!STATUS_VALIDOS.includes(novoStatus)) {
       throw new Error("Status invalido");
     }
     if (pedido.status === "cancelado") {
       throw new Error("Pedido cancelado nao pode ser alterado");
     }
     ...
   }
   ```

---

## Parte 1 — PedidoService (unitario com mock)

Arquivo: `api/__tests__/PedidoService.test.js`

### buscarPorId(id)

- Deve repassar o id ao `mockRepository.findById` e retornar o pedido encontrado
- Deve lancar erro `'Pedido nao encontrado'` quando o repository retornar `null`

### criar(dados)

- Deve repassar `dados` para `mockRepository.create` e retornar o pedido criado
  (o calculo do total acontece dentro do repository — no teste unitario do
  service, basta programar o retorno do mock com `mockReturnValue`)
- Deve propagar o erro quando o cliente estiver faltando
- Deve propagar o erro quando a lista de itens estiver vazia
- Deve propagar o erro quando algum item tiver preco ou quantidade invalidos

### atualizarStatus(id, novoStatus)

- Deve chamar `mockRepository.findById` e depois `mockRepository.updateStatus`
  quando o pedido existe
- Deve lancar erro `'Pedido nao encontrado'` **sem chamar**
  `mockRepository.updateStatus` quando `findById` retornar `null`
- Deve propagar o erro quando o novo status for invalido
- Deve propagar o erro quando o pedido ja estiver cancelado

### remover(id)

- Deve chamar `mockRepository.delete` com o id correto quando o pedido existe
- Deve lancar erro `'Pedido nao encontrado'` quando o repository retornar `false`

Matchers sugeridos: `toHaveBeenCalledWith`, `not.toHaveBeenCalled`, `toEqual`, `toThrow`

---

## Parte 2 — API /pedidos (integracao com supertest)

Arquivo: `api/__tests__/pedidos.integration.test.js`

### GET /pedidos/:id

- Deve retornar `200` e o pedido quando o id existe
- Deve retornar `404` com `{ erro: ... }` quando o pedido nao existe

### POST /pedidos

- Deve retornar `201` e o pedido criado com o `total` calculado corretamente
  (ex.: 2 itens de precos e quantidades diferentes, confira a soma no `expect`)
- Deve retornar `400` quando o cliente estiver faltando
- Deve retornar `400` quando a lista de itens estiver vazia
- Deve retornar `400` quando algum item tiver preco ou quantidade invalidos

### PATCH /pedidos/:id/status

- Deve retornar `200` e o pedido com o novo status quando o id existe
  (envie `{ status: "pago" }` no body)
- Deve retornar `404` quando o pedido nao existe
- Deve retornar `400` quando o status enviado for invalido (ex.: `"entregue"`)
- Deve retornar `400` ao tentar alterar o status de um pedido ja cancelado
  (dica: primeiro cancele o pedido com um `PATCH`, depois tente alterar de novo)

### DELETE /pedidos/:id

- Deve retornar `204` quando o pedido e removido com sucesso
- O pedido removido nao deve mais aparecer em `GET /pedidos/:id` (deve retornar `404`)
- Deve retornar `404` com `{ erro: ... }` quando o pedido nao existir

Matchers sugeridos: `toBe`, `toHaveProperty`, `toContain`

---

## Como rodar os testes

```bash
npm test
```

Rode `npm test -- --verbose` para ver a lista de `test.todo` pendentes junto com os
testes que passaram.

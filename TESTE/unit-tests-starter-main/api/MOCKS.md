# Mocks com Jest

## O que e um mock

Um mock e um objeto falso que imita a "forma" de uma dependencia real.
Voce o usa quando quer testar uma classe em isolamento, sem depender do comportamento
de outra classe.

No nosso caso: queremos testar o `ProdutoService` sem depender do `ProdutoRepository`.

---

## Como o mock e criado

```js
const mockRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};
```

`mockRepository` e um objeto JavaScript comum. Cada propriedade e uma `jest.fn()` —
uma funcao falsa criada pelo Jest. Nao importa nada, `jest.fn()` e global em qualquer
arquivo de teste.

O service recebe o repository pelo construtor e nao sabe se e real ou falso:

```js
const service = new ProdutoService(mockRepository);
```

---

## De onde vem os dados

O mock nao tem dados. Por padrao, `jest.fn()` retorna `undefined`.

Voce e quem fornece o dado na hora do teste:

```js
mockRepository.findAll.mockReturnValue([{ id: 1, nome: "Coxinha", preco: 5 }]);
```

Isso significa: "quando `findAll` for chamada, retorne esse array".

---

## Metodos disponíveis em cada `jest.fn()`

### `mockReturnValue(valor)`

Define o que a funcao retorna quando chamada.

```js
mockRepository.findById.mockReturnValue({ id: 1, nome: "Coxinha", preco: 5 });

const produto = service.buscarPorId(1);
// produto = { id: 1, nome: 'Coxinha', preco: 5 }
```

---

### `mockReturnValueOnce(valor)`

Igual ao anterior, mas so vale para a proxima chamada.
Util quando voce precisa de retornos diferentes em chamadas sucessivas.

```js
mockRepository.findById.mockReturnValueOnce({ id: 1, nome: "Coxinha" });
mockRepository.findById.mockReturnValueOnce(null);

service.buscarPorId(1); // retorna o produto
service.buscarPorId(1); // retorna null
```

---

### `mockImplementation(fn)`

Substitui o corpo da funcao inteiro. Util para simular erros ou logica condicional.

```js
mockRepository.create.mockImplementation(() => {
  throw new Error("Nome e preco sao obrigatorios");
});

expect(() => service.criar({ nome: "Kibe" })).toThrow(
  "Nome e preco sao obrigatorios",
);
```

---

### `mockResolvedValue(valor)`

Igual ao `mockReturnValue`, mas para funcoes assincronas (que retornam Promise).

```js
mockRepository.findAll.mockResolvedValue([{ id: 1, nome: "Coxinha" }]);

const produtos = await service.listar();
```

---

### `mockRejectedValue(erro)`

Faz a funcao retornar uma Promise rejeitada. Simula falha assincrona.

```js
mockRepository.create.mockRejectedValue(new Error("Banco indisponivel"));

await expect(service.criar({ nome: "Kibe", preco: 4 })).rejects.toThrow(
  "Banco indisponivel",
);
```

---

## Matchers para verificar chamadas

Depois que o service executa, voce verifica se ele chamou o repository corretamente.

### `toHaveBeenCalled()`

Verifica se a funcao foi chamada ao menos uma vez.

```js
service.listar();

expect(mockRepository.findAll).toHaveBeenCalled();
```

---

### `toHaveBeenCalledTimes(n)`

Verifica quantas vezes a funcao foi chamada.

```js
service.listar();
service.listar();

expect(mockRepository.findAll).toHaveBeenCalledTimes(2);
```

---

### `toHaveBeenCalledWith(...args)`

Verifica se a funcao foi chamada com os argumentos corretos.

```js
service.buscarPorId(42);

expect(mockRepository.findById).toHaveBeenCalledWith(42);
```

---

### `not.toHaveBeenCalled()`

Verifica que a funcao nao foi chamada. Util para garantir que um caminho de codigo
nao aciona algo que nao deveria.

```js
expect(mockRepository.delete).not.toHaveBeenCalled();
```

---

## O objeto `.mock` (registro bruto)

Cada `jest.fn()` guarda um historico completo em `.mock`:

```js
mockRepository.findById.mock.calls;
// Array de cada chamada. Cada item e um array de argumentos.
// Ex: [[1], [42], [9999]]

mockRepository.findById.mock.results;
// Array com o resultado de cada chamada.
// Ex: [{ type: 'return', value: {...} }, { type: 'return', value: null }]
```

Os matchers como `toHaveBeenCalledWith` consultam `.mock` internamente.
Voce raramente acessa direto, mas e util para depurar testes que nao passam.

---

## Por que usar mock em vez da classe real

| Situacao                            | Sem mock                       | Com mock                                        |
| ----------------------------------- | ------------------------------ | ----------------------------------------------- |
| Repository muda para banco de dados | Teste do service quebra        | Teste do service continua igual                 |
| Banco esta fora do ar               | Teste falha por causa da infra | Teste roda normalmente                          |
| Quer simular um erro raro           | Dificil de provocar            | `mockImplementation(() => { throw ... })`       |
| Quer testar so a logica do service  | Impossivel isolar              | Total controle sobre o que o repository retorna |

O mock garante que o teste do service verifica **so a logica do service**.
Se o teste falhar, o problema esta no service — nao no repository, nao no banco.

---

## Comparacao: unitario vs integracao

```
Teste unitario (ProdutoService.test.js)
  service.listar()
    → mockRepository.findAll()     <- voce controla o retorno
    → retorna o que voce definiu

Teste de integracao (produtos.integration.test.js)
  GET /produtos
    → controller.listar()
    → service.listar()
    → repository.findAll()         <- repository REAL, dados reais do construtor
    → resposta HTTP com JSON
```

No unitario voce testa uma camada por vez.
No de integracao voce testa o fluxo completo de ponta a ponta.

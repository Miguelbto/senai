# Stocker API - Documentacao de Rotas

## Autenticacao

Todas as rotas protegidas exigem o token JWT no header:

```
Authorization: Bearer <token>
```

O token e obtido no endpoint de login e contem `id`, `email` e `role` do usuario.

---

## Roles e Permissoes

| Role       | Descricao                                         |
|------------|---------------------------------------------------|
| `ADMIN`    | Acesso total, incluindo gerenciamento de roles    |
| `MANAGER`  | Gerencia estoque, incluindo ajustes               |
| `OPERATOR` | Adiciona e remove estoque                         |
| `VIEWER`   | Somente leitura                                   |

O role padrao ao criar um usuario e `VIEWER`.

---

## Codigos de Erro Comuns

| Status | Significado                                      |
|--------|--------------------------------------------------|
| 400    | Dados invalidos ou campos faltando               |
| 401    | Nao autenticado (token ausente ou invalido)      |
| 403    | Acesso negado (role sem permissao)               |
| 404    | Recurso nao encontrado                           |
| 500    | Erro interno do servidor                         |

Erros de validacao retornam:
```json
{
  "message": "Dados invalidos",
  "errors": { ... }
}
```

---

## Auth

### POST /login

Publica. Autentica um usuario e retorna o token JWT.

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Resposta 200:**
```json
{
  "user": {
    "id": 1,
    "name": "Nome do Usuario",
    "email": "usuario@email.com",
    "role": "VIEWER"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erros:**
- `404` - Usuário não encontrado
- `401` - Senha invalida

---

### POST /logout

Autenticado. Invalida o token atual.

**Headers:** `Authorization: Bearer <token>`

**Resposta 200:**
```json
{
  "message": "Logout realizado com sucesso"
}
```

---

### POST /forgot-password

Publica. Envia link de recuperacao de senha para o email.

**Body:**
```json
{
  "email": "usuario@email.com"
}
```

**Resposta 200:**
```json
{
  "message": "Um link foi enviado para o e-mail"
}
```

---

### POST /reset-password

Publica. Redefine a senha usando o token recebido por email.

**Body:**
```json
{
  "token": "token-recebido-por-email",
  "newPassword": "novaSenha123"
}
```

**Resposta 200:**
```json
{
  "message": "Senha atualizada com sucesso."
}
```

**Erros:**
- `400` - Token invalido ou expirado

---

## Usuario

### POST /user

Publica. Cria um novo usuario.

**Body:**
```json
{
  "name": "Nome Completo",
  "email": "usuario@email.com",
  "password": "senha123",
  "imageUrl": "https://...",
  "role": "VIEWER"
}
```

- `name`: obrigatorio
- `email`: obrigatorio, unico
- `password`: obrigatorio, minimo 6 caracteres
- `imageUrl`: opcional
- `role`: opcional, valores aceitos: `ADMIN`, `MANAGER`, `OPERATOR`, `VIEWER`. Padrao: `VIEWER`

**Resposta 201:**
```json
{
  "id": 1,
  "name": "Nome Completo",
  "email": "usuario@email.com",
  "role": "VIEWER",
  "imageUrl": null,
  "createdAt": "2026-02-27T00:00:00.000Z",
  "updatedAt": "2026-02-27T00:00:00.000Z"
}
```

**Erros:**
- `400` - Email ja cadastrado

---

### GET /user

Autenticado. Lista todos os usuarios.

**Headers:** `Authorization: Bearer <token>`

**Resposta 200:**
```json
[
  {
    "id": 1,
    "name": "Nome",
    "email": "email@email.com",
    "imageUrl": null,
    "role": "ADMIN"
  }
]
```

---

### GET /user/:id

Autenticado. Retorna um usuario pelo ID.

**Headers:** `Authorization: Bearer <token>`

**Resposta 200:**
```json
{
  "id": 1,
  "name": "Nome",
  "email": "email@email.com",
  "imageUrl": null
}
```

**Erros:**
- `400` - ID invalido

---

### PUT /user/:id

Autenticado. Atualiza dados do usuario (nome, email, imagem).

**Headers:** `Authorization: Bearer <token>`

**Body** (ao menos um campo obrigatorio):
```json
{
  "name": "Novo Nome",
  "email": "novo@email.com",
  "imageUrl": "https://..."
}
```

**Resposta 200:** objeto do usuario atualizado.

---

### PUT /user/password/:id

Autenticado. Atualiza a senha do usuario.

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "currentPassword": "senhaAtual123",
  "newPassword": "novaSenha456"
}
```

- `currentPassword`: minimo 6 caracteres
- `newPassword`: minimo 6 caracteres

**Resposta 200:**
```json
{
  "id": 1,
  "name": "Nome",
  "email": "email@email.com",
  "updatedAt": "2026-02-27T00:00:00.000Z"
}
```

**Erros:**
- `400` - Senha atual incorreta

---

### PATCH /user/role/:id

Autenticado. Atualiza o role de um usuario.

**Permissao:** somente `ADMIN`

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "role": "MANAGER"
}
```

Valores aceitos: `ADMIN`, `MANAGER`, `OPERATOR`, `VIEWER`

**Resposta 200:**
```json
{
  "id": 1,
  "name": "Nome",
  "email": "email@email.com",
  "role": "MANAGER"
}
```

**Erros:**
- `403` - Acesso negado (usuario nao e ADMIN)

---

### DELETE /user/:id

Autenticado. Remove um usuario.

**Headers:** `Authorization: Bearer <token>`

**Resposta 204:** sem corpo.

---

## Produto

Todas as rotas de produto exigem autenticacao. Nao ha restricao de role especifica, mas o usuario deve estar autenticado.

### POST /product

Autenticado. Cria um novo produto. O produto e vinculado ao usuario autenticado.

**Body:**
```json
{
  "name": "Produto A",
  "description": "Descricao do produto",
  "price": 29.90,
  "stock": 100,
  "minStock": 10,
  "category": "Eletronicos",
  "imageUrl": "https://..."
}
```

- `name`: obrigatorio, unico
- `description`: obrigatorio
- `price`: obrigatorio, positivo
- `stock`: obrigatorio, inteiro nao-negativo
- `minStock`: opcional, inteiro >= 1. Padrao do banco: `5`
- `category`: opcional. Padrao: `"Sem Categoria"`
- `imageUrl`: opcional. Padrao: `""`

**Resposta 201:** objeto do produto criado.

---

### GET /product

Autenticado. Lista todos os produtos.

**Resposta 200:** array de produtos.

---

### GET /product/count

Autenticado. Retorna a quantidade total de produtos cadastrados.

**Resposta 200:**
```json
{
  "count": 42
}
```

---

### GET /product/:id

Autenticado. Retorna um produto pelo ID.

**Resposta 200:** objeto do produto.

---

### GET /product/category/:category

Autenticado. Lista produtos de uma categoria (case-insensitive).

**Exemplo:** `GET /product/category/eletronicos`

**Resposta 200:** array de produtos.

---

### GET /product/period/:startDate/:endDate

Autenticado. Lista produtos criados em um periodo.

**Parametros de rota:** datas no formato `AAAA-MM-DD`

**Exemplo:** `GET /product/period/2026-01-01/2026-02-27`

**Resposta 200:** array de produtos.

**Erros:**
- `400` - Formato de data invalido
- `400` - Data de inicio posterior a data de fim

---

### PUT /product/:id

Autenticado. Atualiza dados do produto (exceto `stock`, que deve ser alterado via rotas de estoque).

**Body** (ao menos um campo obrigatorio):
```json
{
  "name": "Novo Nome",
  "description": "Nova descricao",
  "price": 39.90,
  "minStock": 15,
  "category": "Nova Categoria",
  "imageUrl": "https://..."
}
```

**Resposta 200:** objeto do produto atualizado.

---

### DELETE /product/:id

Autenticado. Remove um produto.

**Resposta 200:** objeto do produto removido.

---

## Estoque

### POST /stock/add/:productId

Autenticado. Adiciona quantidade ao estoque. Cria movimentacao do tipo `IN`.

**Permissao:** `ADMIN`, `MANAGER`, `OPERATOR`

**Body:**
```json
{
  "quantity": 50,
  "reason": "Reposicao de fornecedor"
}
```

- `quantity`: obrigatorio, inteiro >= 1
- `reason`: opcional

**Resposta 200:**
```json
{
  "message": "Estoque adicionado com sucesso",
  "product": { ... }
}
```

**Erros:**
- `403` - Acesso negado (role `VIEWER`)
- `404` - Produto nao encontrado

---

### POST /stock/remove/:productId

Autenticado. Remove quantidade do estoque. Cria movimentacao do tipo `OUT`.

**Permissao:** `ADMIN`, `MANAGER`, `OPERATOR`

**Body:**
```json
{
  "quantity": 10,
  "reason": "Venda realizada"
}
```

- `quantity`: obrigatorio, inteiro >= 1
- `reason`: opcional

**Resposta 200:**
```json
{
  "message": "Estoque removido com sucesso",
  "product": { ... }
}
```

**Erros:**
- `403` - Acesso negado (role `VIEWER`)
- `500` - Estoque insuficiente

---

### POST /stock/adjust/:productId

Autenticado. Define o estoque para um valor absoluto. Cria movimentacao do tipo `ADJUSTMENT`.

**Permissao:** `ADMIN`, `MANAGER`

**Body:**
```json
{
  "quantity": 200,
  "reason": "Inventario fisico"
}
```

- `quantity`: obrigatorio, inteiro >= 0 (permite zerar o estoque)
- `reason`: opcional. Padrao: `"Ajuste manual de estoque"`

**Resposta 200:**
```json
{
  "message": "Estoque ajustado com sucesso",
  "product": { ... }
}
```

**Erros:**
- `403` - Acesso negado (roles `OPERATOR` e `VIEWER`)
- `404` - Produto nao encontrado

---

### GET /stock/low

Autenticado. Lista produtos cujo estoque atual e menor ou igual ao `minStock`.

**Permissao:** `ADMIN`, `MANAGER`, `OPERATOR`, `VIEWER`

**Resposta 200 (com produtos):**
```json
{
  "message": "Produtos com estoque baixo",
  "products": [
    {
      "id": 1,
      "name": "Produto A",
      "description": "...",
      "price": 29.90,
      "minStock": 10,
      "stock": 3,
      "category": "Eletronicos",
      "imageUrl": null
    }
  ]
}
```

**Resposta 200 (sem produtos):**
```json
{
  "message": "Nenhum produto com estoque baixo encontrado"
}
```

---

### GET /stock/movements/:productId

Autenticado. Lista movimentacoes de estoque de um produto especifico.

**Permissao:** `ADMIN`, `MANAGER`, `OPERATOR`, `VIEWER`

**Query params opcionais:**
- `limit` (number) - quantidade maxima de registros. Padrao: `50`
- `type` - filtro por tipo: `IN`, `OUT`, `INITIAL`, `ADJUSTMENT`

**Exemplo:** `GET /stock/movements/1?limit=10&type=IN`

**Resposta 200:**
```json
{
  "message": "Movimentacoes do produto",
  "movements": [
    {
      "id": 1,
      "productId": 1,
      "userId": 2,
      "quantity": 50,
      "type": "IN",
      "reason": "Reposicao",
      "createdAt": "2026-02-27T00:00:00.000Z",
      "user": { "id": 2, "name": "Operador", "email": "op@email.com" },
      "product": { "id": 1, "name": "Produto A" }
    }
  ]
}
```

**Erros:**
- `404` - Produto nao encontrado

---

### GET /stock/movements

Autenticado. Lista todas as movimentacoes de estoque de todos os produtos.

**Permissao:** `ADMIN`, `MANAGER`, `OPERATOR`, `VIEWER`

**Query params opcionais:**
- `limit` (number) - quantidade maxima de registros. Padrao: `100`
- `type` - filtro por tipo: `IN`, `OUT`, `INITIAL`, `ADJUSTMENT`

**Resposta 200:**
```json
{
  "message": "Todas as movimentacoes",
  "movements": [
    {
      "id": 1,
      "productId": 1,
      "userId": 2,
      "quantity": 50,
      "type": "IN",
      "reason": "Reposicao",
      "createdAt": "2026-02-27T00:00:00.000Z",
      "user": { "id": 2, "name": "Operador", "email": "op@email.com" },
      "product": { "id": 1, "name": "Produto A", "category": "Eletronicos", "price": 29.90 }
    }
  ]
}
```

---

### GET /stock/summary

Autenticado. Retorna um resumo geral do estoque.

**Permissao:** `ADMIN`, `MANAGER`, `OPERATOR`, `VIEWER`

**Resposta 200:**
```json
{
  "message": "Resumo de estoque",
  "summary": {
    "totalProducts": 42,
    "lowStockCount": 5,
    "outOfStockCount": 2,
    "totalValue": 15480.50
  }
}
```

- `totalProducts` - total de produtos cadastrados
- `lowStockCount` - quantidade de produtos com estoque <= minStock
- `outOfStockCount` - quantidade de produtos com estoque = 0
- `totalValue` - valor total em estoque (stock * price)

---

## Resumo de Permissoes por Rota

| Rota                              | Publica | VIEWER | OPERATOR | MANAGER | ADMIN |
|-----------------------------------|:-------:|:------:|:--------:|:-------:|:-----:|
| POST /login                       | X       |        |          |         |       |
| POST /forgot-password             | X       |        |          |         |       |
| POST /reset-password              | X       |        |          |         |       |
| POST /logout                      |         | X      | X        | X       | X     |
| POST /user                        | X       |        |          |         |       |
| GET /user                         |         | X      | X        | X       | X     |
| GET /user/:id                     |         | X      | X        | X       | X     |
| PUT /user/:id                     |         | X      | X        | X       | X     |
| PUT /user/password/:id            |         | X      | X        | X       | X     |
| PATCH /user/role/:id              |         |        |          |         | X     |
| DELETE /user/:id                  |         | X      | X        | X       | X     |
| POST /product                     |         | X      | X        | X       | X     |
| GET /product                      |         | X      | X        | X       | X     |
| GET /product/count                |         | X      | X        | X       | X     |
| GET /product/:id                  |         | X      | X        | X       | X     |
| GET /product/category/:category   |         | X      | X        | X       | X     |
| GET /product/period/:start/:end   |         | X      | X        | X       | X     |
| PUT /product/:id                  |         | X      | X        | X       | X     |
| DELETE /product/:id               |         | X      | X        | X       | X     |
| POST /stock/add/:productId        |         |        | X        | X       | X     |
| POST /stock/remove/:productId     |         |        | X        | X       | X     |
| POST /stock/adjust/:productId     |         |        |          | X       | X     |
| GET /stock/low                    |         | X      | X        | X       | X     |
| GET /stock/movements/:productId   |         | X      | X        | X       | X     |
| GET /stock/movements              |         | X      | X        | X       | X     |
| GET /stock/summary                |         | X      | X        | X       | X     |

---

## Tipos de Movimentacao de Estoque

| Tipo         | Quando ocorre                              |
|--------------|--------------------------------------------|
| `INITIAL`    | Criacao do produto com estoque inicial     |
| `IN`         | Adicao via `POST /stock/add/:productId`    |
| `OUT`        | Remocao via `POST /stock/remove/:productId`|
| `ADJUSTMENT` | Ajuste via `POST /stock/adjust/:productId` |

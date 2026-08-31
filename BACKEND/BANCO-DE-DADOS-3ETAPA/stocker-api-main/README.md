# Stocker API

API de gerenciamento de estoque desenvolvida com Node.js, Fastify e PostgreSQL.

## Sobre o Projeto

Stocker API e uma aplicacao back-end para controle de estoque que permite gerenciar produtos, usuarios e movimentacoes de entrada e saida de mercadorias. O sistema inclui autenticacao JWT e validacao de dados com Zod.

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset JavaScript com tipagem estatica
- **Fastify** - Framework web de alta performance
- **Prisma** - ORM para Node.js e TypeScript
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerizacao do banco de dados
- **Zod** - Validacao de schemas
- **JWT** - Autenticacao via JSON Web Tokens
- **Bcrypt** - Hash de senhas

## Pre-requisitos

- Node.js (versao 18 ou superior)
- Docker e Docker Compose
- npm

## Instalacao

1. Clone o repositorio:

```bash
git clone <url-do-repositorio>
cd stocker-api
```

2. Instale as dependencias:

```bash
npm install
```

3. Configure as variaveis de ambiente criando um arquivo `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/stocker-api?schema=public"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/stocker-api?schema=public"
JWT_SECRET="S3cr3T0k3en6615"
PORT=3000
```

## Configuracao do Banco de Dados

```bash
npm run docker:up       # sobe o container PostgreSQL
npx prisma generate     # gera o Prisma Client
npx prisma db push      # cria as tabelas no banco
```

## Como Executar

```bash
npm run dev
```

A API estara disponivel em `http://localhost:3000`

## Scripts Disponiveis

```bash
npm run dev              # inicia o servidor em modo desenvolvimento
npm run docker:up        # sobe o container do PostgreSQL
npm run docker:down      # para o container do PostgreSQL
npm run docker:dev       # sobe o Docker e inicia em modo dev
npx prisma generate      # gera o Prisma Client
npx prisma db push       # sincroniza o schema com o banco
npx prisma studio        # abre interface grafica do banco
```

## Estrutura do Projeto

```
stocker-api/
├── prisma/
│   └── schema.prisma              # schema do banco de dados
├── src/
│   ├── domains/
│   │   ├── auth/                  # autenticacao (login, logout, recuperacao de senha)
│   │   ├── product/               # gerenciamento de produtos
│   │   ├── stock/                 # controle de movimentacoes de estoque
│   │   └── user/                  # gerenciamento de usuarios
│   ├── shared/
│   │   ├── lib/                   # singletons (Prisma, JWT, Mailer)
│   │   ├── middlewares/           # middleware de autenticacao
│   │   ├── types/                 # definicoes de tipos TypeScript
│   │   └── utils/                 # utilitarios
│   └── server.ts                  # arquivo principal da aplicacao
├── docker-compose.yml
├── package.json
└── .env
```

---

## Documentacao da API

### URL Base

```
http://localhost:3000
```

### Autenticacao

A maioria dos endpoints exige autenticacao via JWT. Apos realizar o login, inclua o token em todas as requisicoes protegidas no header:

```
Authorization: Bearer <token>
```

### Formato de Erro de Validacao

Quando os dados enviados sao invalidos, a API retorna:

```json
{
  "message": "Dados invalidos",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email"
    }
  ]
}
```

---

## Autenticacao

### POST /login

Autentica um usuario e retorna o token JWT.

**Autenticacao:** Nao requerida

**Body:**

```json
{
  "email": "usuario@exemplo.com",
  "password": "minhasenha"
}
```

| Campo    | Tipo   | Obrigatorio | Descricao                    |
| -------- | ------ | ----------- | ---------------------------- |
| email    | string | sim         | email valido do usuario      |
| password | string | sim         | senha (minimo 6 caracteres)  |

**Resposta 200:**

```json
{
  "user": {
    "id": 1,
    "name": "Fulano",
    "email": "usuario@exemplo.com",
    "imageUrl": ""
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erros:**

| Status | Descricao             |
| ------ | --------------------- |
| 400    | Dados invalidos       |
| 401    | Senha invalida        |
| 404    | Usuario nao encontrado|

---

### POST /logout

Invalida o token JWT do usuario logado.

**Autenticacao:** Requerida

**Body:** Nenhum

**Resposta 200:**

```json
{
  "message": "Logout realizado com sucesso"
}
```

---

### POST /forgot-password

Envia um e-mail com link para redefinicao de senha.

**Autenticacao:** Nao requerida

**Body:**

```json
{
  "email": "usuario@exemplo.com"
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

Redefine a senha usando o token recebido por e-mail.

**Autenticacao:** Nao requerida

**Body:**

```json
{
  "token": "token-recebido-no-email",
  "newPassword": "novasenha123"
}
```

| Campo       | Tipo   | Obrigatorio | Descricao                       |
| ----------- | ------ | ----------- | ------------------------------- |
| token       | string | sim         | token enviado ao e-mail         |
| newPassword | string | sim         | nova senha (minimo 6 caracteres)|

**Resposta 200:**

```json
{
  "message": "Senha atualizada com sucesso."
}
```

**Erros:**

| Status | Descricao                   |
| ------ | --------------------------- |
| 400    | Token invalido ou expirado  |

---

## Usuarios

### POST /user

Cria um novo usuario. Esta e a unica rota de usuario publica (sem autenticacao).

**Autenticacao:** Nao requerida

**Body:**

```json
{
  "name": "Fulano da Silva",
  "email": "fulano@exemplo.com",
  "password": "minhasenha",
  "imageUrl": "https://exemplo.com/foto.jpg"
}
```

| Campo    | Tipo   | Obrigatorio | Descricao                       |
| -------- | ------ | ----------- | ------------------------------- |
| name     | string | sim         | nome do usuario                 |
| email    | string | sim         | email valido e unico            |
| password | string | sim         | senha (minimo 6 caracteres)     |
| imageUrl | string | nao         | URL da foto de perfil           |

**Resposta 201:** Objeto do usuario criado (sem o campo password).

---

### GET /user

Lista todos os usuarios.

**Autenticacao:** Requerida

**Resposta 200:** Array de objetos de usuario.

```json
[
  {
    "id": 1,
    "name": "Fulano",
    "email": "fulano@exemplo.com",
    "imageUrl": "",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### GET /user/:id

Busca um usuario pelo ID.

**Autenticacao:** Requerida

**Params:**

| Param | Tipo    | Descricao      |
| ----- | ------- | -------------- |
| id    | integer | ID do usuario  |

**Resposta 200:** Objeto do usuario.

---

### PUT /user/:id

Atualiza dados de um usuario (nome, email ou foto).

**Autenticacao:** Requerida

**Params:**

| Param | Tipo    | Descricao      |
| ----- | ------- | -------------- |
| id    | integer | ID do usuario  |

**Body** (pelo menos um campo obrigatorio):

```json
{
  "name": "Novo Nome",
  "email": "novoemail@exemplo.com",
  "imageUrl": "https://exemplo.com/nova-foto.jpg"
}
```

**Resposta 200:** Objeto do usuario atualizado.

---

### PUT /user/password/:id

Atualiza a senha de um usuario.

**Autenticacao:** Requerida

**Params:**

| Param | Tipo    | Descricao      |
| ----- | ------- | -------------- |
| id    | integer | ID do usuario  |

**Body:**

```json
{
  "currentPassword": "senhaatual",
  "newPassword": "novasenha123"
}
```

| Campo           | Tipo   | Obrigatorio | Descricao                            |
| --------------- | ------ | ----------- | ------------------------------------ |
| currentPassword | string | sim         | senha atual (minimo 6 caracteres)    |
| newPassword     | string | sim         | nova senha (minimo 6 caracteres)     |

**Resposta 200:** Objeto do usuario atualizado.

---

### DELETE /user/:id

Remove um usuario.

**Autenticacao:** Requerida

**Params:**

| Param | Tipo    | Descricao      |
| ----- | ------- | -------------- |
| id    | integer | ID do usuario  |

**Resposta 204:** Sem conteudo.

---

## Produtos

### POST /product

Cria um novo produto.

**Autenticacao:** Requerida

**Body:**

```json
{
  "name": "Produto Exemplo",
  "description": "Descricao do produto",
  "price": 29.90,
  "stock": 100,
  "minStock": 10,
  "category": "Eletronicos",
  "imageUrl": "https://exemplo.com/produto.jpg"
}
```

| Campo       | Tipo    | Obrigatorio | Descricao                                         |
| ----------- | ------- | ----------- | ------------------------------------------------- |
| name        | string  | sim         | nome do produto (unico)                           |
| description | string  | sim         | descricao do produto                              |
| price       | number  | sim         | preco positivo                                    |
| stock       | integer | sim         | quantidade inicial em estoque (nao negativo)      |
| minStock    | integer | nao         | estoque minimo para alerta (padrao: sem limite)   |
| category    | string  | nao         | categoria do produto (padrao: "Sem Categoria")    |
| imageUrl    | string  | nao         | URL da imagem do produto (padrao: "")             |

**Resposta 201:** Objeto do produto criado.

---

### GET /product

Lista todos os produtos.

**Autenticacao:** Requerida

**Resposta 200:** Array de objetos de produto.

```json
[
  {
    "id": 1,
    "name": "Produto Exemplo",
    "description": "Descricao",
    "price": 29.90,
    "stock": 100,
    "minStock": 10,
    "category": "eletronicos",
    "imageUrl": "",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### GET /product/count

Retorna a quantidade total de produtos cadastrados.

**Autenticacao:** Requerida

**Resposta 200:**

```json
{
  "count": 42
}
```

---

### GET /product/:id

Busca um produto pelo ID.

**Autenticacao:** Requerida

**Params:**

| Param | Tipo    | Descricao      |
| ----- | ------- | -------------- |
| id    | integer | ID do produto  |

**Resposta 200:** Objeto do produto.

---

### GET /product/category/:category

Lista produtos de uma categoria especifica.

**Autenticacao:** Requerida

**Params:**

| Param    | Tipo   | Descricao                    |
| -------- | ------ | ---------------------------- |
| category | string | nome da categoria (case-insensitive) |

**Exemplo:** `GET /product/category/eletronicos`

**Resposta 200:** Array de produtos da categoria.

---

### GET /product/period/:startDate/:endDate

Lista produtos criados em um periodo especifico.

**Autenticacao:** Requerida

**Params:**

| Param     | Tipo   | Descricao                    |
| --------- | ------ | ---------------------------- |
| startDate | string | data de inicio (AAAA-MM-DD)  |
| endDate   | string | data de fim (AAAA-MM-DD)     |

**Exemplo:** `GET /product/period/2024-01-01/2024-12-31`

**Resposta 200:** Array de produtos criados no periodo.

---

### PUT /product/:id

Atualiza dados de um produto.

**Autenticacao:** Requerida

**Params:**

| Param | Tipo    | Descricao      |
| ----- | ------- | -------------- |
| id    | integer | ID do produto  |

**Body** (pelo menos um campo obrigatorio):

```json
{
  "name": "Novo Nome",
  "description": "Nova descricao",
  "price": 39.90,
  "minStock": 15,
  "category": "Nova Categoria",
  "imageUrl": "https://exemplo.com/nova-imagem.jpg"
}
```

**Resposta 200:** Objeto do produto atualizado.

---

### DELETE /product/:id

Remove um produto.

**Autenticacao:** Requerida

**Params:**

| Param | Tipo    | Descricao      |
| ----- | ------- | -------------- |
| id    | integer | ID do produto  |

**Resposta 200:** Objeto do produto removido.

---

## Estoque

### POST /stock/add/:productId

Adiciona quantidade ao estoque de um produto (registra movimentacao do tipo IN).

**Autenticacao:** Requerida

**Params:**

| Param     | Tipo    | Descricao      |
| --------- | ------- | -------------- |
| productId | integer | ID do produto  |

**Body:**

```json
{
  "quantity": 50,
  "reason": "Reposicao de estoque"
}
```

| Campo    | Tipo    | Obrigatorio | Descricao                          |
| -------- | ------- | ----------- | ---------------------------------- |
| quantity | integer | sim         | quantidade a adicionar (minimo 1)  |
| reason   | string  | nao         | motivo da movimentacao             |

**Resposta 200:**

```json
{
  "message": "Estoque adicionado com sucesso",
  "product": { ... }
}
```

---

### POST /stock/remove/:productId

Remove quantidade do estoque de um produto (registra movimentacao do tipo OUT).

**Autenticacao:** Requerida

**Params:**

| Param     | Tipo    | Descricao      |
| --------- | ------- | -------------- |
| productId | integer | ID do produto  |

**Body:**

```json
{
  "quantity": 10,
  "reason": "Venda balcao"
}
```

| Campo    | Tipo    | Obrigatorio | Descricao                          |
| -------- | ------- | ----------- | ---------------------------------- |
| quantity | integer | sim         | quantidade a remover (minimo 1)    |
| reason   | string  | nao         | motivo da movimentacao             |

**Resposta 200:**

```json
{
  "message": "Estoque removido com sucesso",
  "product": { ... }
}
```

**Erros:**

| Status | Descricao           |
| ------ | ------------------- |
| 500    | Estoque insuficiente|

---

### POST /stock/adjust/:productId

Ajusta o estoque para um valor absoluto (registra movimentacao do tipo ADJUSTMENT).

**Autenticacao:** Requerida

**Params:**

| Param     | Tipo    | Descricao      |
| --------- | ------- | -------------- |
| productId | integer | ID do produto  |

**Body:**

```json
{
  "quantity": 75,
  "reason": "Contagem fisica de estoque"
}
```

| Campo    | Tipo    | Obrigatorio | Descricao                                             |
| -------- | ------- | ----------- | ----------------------------------------------------- |
| quantity | integer | sim         | novo valor absoluto do estoque (minimo 0)             |
| reason   | string  | nao         | motivo do ajuste (padrao: "Ajuste manual de estoque") |

**Resposta 200:**

```json
{
  "message": "Estoque ajustado com sucesso",
  "product": { ... }
}
```

---

### GET /stock/low

Lista todos os produtos com estoque igual ou abaixo do estoque minimo configurado.

**Autenticacao:** Requerida

**Resposta 200 (com produtos em estoque baixo):**

```json
{
  "message": "Produtos com estoque baixo",
  "products": [
    {
      "id": 1,
      "name": "Produto X",
      "description": "...",
      "price": 10.00,
      "minStock": 10,
      "stock": 5,
      "category": "categoria",
      "imageUrl": ""
    }
  ]
}
```

**Resposta 200 (sem produtos em estoque baixo):**

```json
{
  "message": "Nenhum produto com estoque baixo encontrado"
}
```

---

### GET /stock/movements/:productId

Lista as movimentacoes de estoque de um produto especifico.

**Autenticacao:** Requerida

**Params:**

| Param     | Tipo    | Descricao      |
| --------- | ------- | -------------- |
| productId | integer | ID do produto  |

**Query Params (opcionais):**

| Param | Tipo    | Descricao                                                      |
| ----- | ------- | -------------------------------------------------------------- |
| limit | integer | numero maximo de registros retornados (padrao: 50)             |
| type  | string  | filtro por tipo: `IN`, `OUT`, `INITIAL` ou `ADJUSTMENT`        |

**Exemplo:** `GET /stock/movements/1?limit=10&type=IN`

**Resposta 200:**

```json
{
  "message": "Movimentacoes do produto",
  "movements": [
    {
      "id": 1,
      "productId": 1,
      "quantity": 50,
      "type": "IN",
      "reason": "Reposicao",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "user": {
        "id": 1,
        "name": "Fulano",
        "email": "fulano@exemplo.com"
      },
      "product": {
        "id": 1,
        "name": "Produto X"
      }
    }
  ]
}
```

---

### GET /stock/movements

Lista todas as movimentacoes de estoque de todos os produtos.

**Autenticacao:** Requerida

**Query Params (opcionais):**

| Param | Tipo    | Descricao                                                      |
| ----- | ------- | -------------------------------------------------------------- |
| limit | integer | numero maximo de registros retornados (padrao: 100)            |
| type  | string  | filtro por tipo: `IN`, `OUT`, `INITIAL` ou `ADJUSTMENT`        |

**Resposta 200:**

```json
{
  "message": "Todas as movimentacoes",
  "movements": [
    {
      "id": 1,
      "productId": 1,
      "quantity": 50,
      "type": "IN",
      "reason": "Reposicao",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "user": {
        "id": 1,
        "name": "Fulano",
        "email": "fulano@exemplo.com"
      },
      "product": {
        "id": 1,
        "name": "Produto X",
        "category": "eletronicos"
      }
    }
  ]
}
```

---

### GET /stock/summary

Retorna um resumo geral do estoque.

**Autenticacao:** Requerida

**Resposta 200:**

```json
{
  "message": "Resumo de estoque",
  "summary": {
    "totalProducts": 50,
    "lowStockCount": 5,
    "outOfStockCount": 2,
    "totalValue": 15420.00
  }
}
```

| Campo           | Tipo    | Descricao                                    |
| --------------- | ------- | -------------------------------------------- |
| totalProducts   | integer | total de produtos cadastrados                |
| lowStockCount   | integer | produtos com estoque abaixo do minimo        |
| outOfStockCount | integer | produtos com estoque zerado                  |
| totalValue      | number  | valor total do estoque (preco x quantidade)  |

---

## Modelos do Banco de Dados

### User

| Campo     | Tipo     | Descricao                  |
| --------- | -------- | -------------------------- |
| id        | integer  | identificador unico        |
| email     | string   | email unico                |
| name      | string   | nome do usuario            |
| password  | string   | senha em hash (bcrypt)     |
| imageUrl  | string   | URL da foto (opcional)     |
| createdAt | datetime | data de criacao            |
| updatedAt | datetime | data de atualizacao        |

### Product

| Campo       | Tipo     | Descricao                          |
| ----------- | -------- | ---------------------------------- |
| id          | integer  | identificador unico                |
| name        | string   | nome unico do produto              |
| description | string   | descricao do produto               |
| category    | string   | categoria                          |
| price       | number   | preco                              |
| stock       | integer  | quantidade em estoque              |
| minStock    | integer  | estoque minimo para alerta         |
| imageUrl    | string   | URL da imagem (opcional)           |
| createdAt   | datetime | data de criacao                    |
| updatedAt   | datetime | data de atualizacao                |

### StockMovement

| Campo     | Tipo     | Descricao                                              |
| --------- | -------- | ------------------------------------------------------ |
| id        | integer  | identificador unico                                    |
| productId | integer  | referencia ao produto                                  |
| userId    | integer  | referencia ao usuario que realizou a movimentacao      |
| quantity  | integer  | quantidade movimentada                                 |
| type      | enum     | tipo: `IN`, `OUT`, `INITIAL` ou `ADJUSTMENT`           |
| reason    | string   | motivo da movimentacao (opcional)                      |
| createdAt | datetime | data da movimentacao                                   |

---

## Variaveis de Ambiente

| Variavel     | Descricao                    | Exemplo                                                   |
| ------------ | ---------------------------- | --------------------------------------------------------- |
| DATABASE_URL | URL de conexao do PostgreSQL | postgresql://postgres:postgres@localhost:5432/stocker-api |
| DIRECT_URL   | URL direta de conexao        | postgresql://postgres:postgres@localhost:5432/stocker-api |
| JWT_SECRET   | Chave secreta para JWT       | S3cr3T0k3en6615                                           |
| PORT         | Porta do servidor            | 3000                                                      |

---

## Autor

Desenvolvido por Daniel Manoel

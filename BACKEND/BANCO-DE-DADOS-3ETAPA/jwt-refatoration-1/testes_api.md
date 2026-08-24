# 🧪 Guia Passo a Passo: Testando a API

Este documento contém o passo a passo para testar a sua API localmente. Você pode utilizar ferramentas como **Insomnia**, **Postman**, ou até mesmo o **Thunder Client** (extensão do VSCode).

> **Aviso Importante:** Certifique-se de que o servidor esteja rodando (`npm start`) e que o banco de dados MySQL esteja ativo e configurado.

---

## 🔐 1. Autenticação (Auth)

Todas as requisições protegidas precisam do **Access Token** retornado no login.

### 1.1 Registrar um novo usuário
- **Método:** `POST`
- **URL:** `http://localhost:3000/auth/register`
- **Body (JSON):**
  ```json
  {
    "name": "Fulano",
    "email": "fulado@email.com",
    "password": "senha_segura_123",
    "role": "admin"
  }
  ```
- **O que testar:** Verifique se retorna status `201 Created` e os dados do usuário (sem a senha).

### 1.2 Fazer Login
- **Método:** `POST`
- **URL:** `http://localhost:3000/auth/login`
- **Body (JSON):**
  ```json
  {
    "email": "fulano@email.com",
    "password": "senha_segura_123"
  }
  ```
- **O que testar:** Verifique se retorna status `200 OK` junto com o `token` (Access Token) e o `refreshToken`. **Copie o `token` gerado para usar nas rotas protegidas.**

### 1.3 Renovar Token (Refresh)
- **Método:** `POST`
- **URL:** `http://localhost:3000/auth/refresh`
- **Body (JSON):**
  ```json
  {
    "refreshToken": "COLE_O_REFRESH_TOKEN_AQUI"
  }
  ```
- **O que testar:** Deve retornar um novo Access Token.

---

## 👥 2. Usuários (Users)

### 2.1 Criar Usuário 
*(Mesma funcionalidade do register, mas pela rota de usuários)*
- **Método:** `POST`
- **URL:** `http://localhost:3000/users`
- **Body (JSON):**
  ```json
  {
    "name": "Maria Silva",
    "email": "maria@email.com",
    "password": "123",
    "role": "client"
  }
  ```

---

## 🍔 3. Produtos (Products)

Para rotas protegidas (Create, Update, Delete), você precisa ir na aba **Auth** ou **Headers** do seu cliente HTTP e adicionar:
`Authorization: Bearer SEU_ACCESS_TOKEN_AQUI`

### 3.1 Listar Produtos
- **Método:** `GET`
- **URL:** `http://localhost:3000/products`
- **O que testar:** Verifica se retorna um array vazio ou com produtos. (Não precisa de token).

### 3.2 Criar um Produto (Protegido - Requer Token Admin)
- **Método:** `POST`
- **URL:** `http://localhost:3000/products`
- **Headers:** `Authorization: Bearer <TOKEN>`
- **Body (Multipart Form / Form Data):**
  - `nome`: Hambúrguer Especial
  - `descricao`: Pão, carne artesanal 200g, queijo prato
  - `preco`: 35.90
  - `categoria`: Lanches
  - `disponivel`: true
  - `imagem`: *(Selecione um arquivo de imagem)*
- **O que testar:** Retorna status `201 Created`. Anote o `id` do produto criado.

---

## 📖 4. Cardápio (Menus)

### 4.1 Criar Cardápio (Protegido)
- **Método:** `POST`
- **URL:** `http://localhost:3000/menus`
- **Headers:** `Authorization: Bearer <TOKEN>`
- **Body (JSON):**
  ```json
  {
    "nome": "Cardápio de Verão",
    "descricao": "Promoções refrescantes",
    "disponivel": true,
    "produtos": [1, 2] 
  }
  ```
  *(Substitua `[1, 2]` pelos IDs dos produtos que você criou no passo 3.2)*
- **O que testar:** Status `201 Created` e retorno do ID do cardápio.

### 4.2 Listar Cardápios
- **Método:** `GET`
- **URL:** `http://localhost:3000/menus`

---

## 📝 5. Pedidos (Orders)

### 5.1 Criar Pedido (Protegido)
- **Método:** `POST`
- **URL:** `http://localhost:3000/orders`
- **Headers:** `Authorization: Bearer <TOKEN>`
- **Body (JSON):**
  ```json
  {
    "customer": "Carlos Cliente",
    "items": [
      {
        "productId": 1,
        "quantity": 2
      }
    ]
  }
  ```
- **O que testar:** Deve calcular o total automaticamente baseado no preço do produto (ID 1) e retornar `201 Created`.

### 5.2 Listar Pedidos
- **Método:** `GET`
- **URL:** `http://localhost:3000/orders`
- **Headers:** `Authorization: Bearer <TOKEN>`

### 5.3 Atualizar Status do Pedido (Protegido)
- **Método:** `PATCH`
- **URL:** `http://localhost:3000/orders/1/status` *(Substitua `1` pelo ID do pedido)*
- **Headers:** `Authorization: Bearer <TOKEN>`
- **Body (JSON):**
  ```json
  {
    "status": "preparo" 
  }
  ```
  *(Status válidos: pendente, preparo, pronto, entregue)*

---

### 💡 Dicas Gerais de Teste:
1. Sempre inicie criando um usuário e fazendo login para obter o **Token**.
2. Guarde esse Token no seu testador (Postman/Insomnia) como uma variável de ambiente para facilitar as próximas requisições.
3. Observe as abas de terminal (`npm start`) se a aplicação der algum erro interno (Status 500). O console sempre imprime os erros cruciais!

# Arquitetura do Projeto

O projeto utiliza uma **Arquitetura em Camadas (Layered Architecture)** organizada por **Domínios (Domain-Driven Design - DDD)**. O principal objetivo dessa arquitetura é garantir o **desacoplamento total** entre as regras de negócio e a infraestrutura (como o banco de dados e o framework web).

## 🏗️ Camadas da Aplicação

Cada domínio (ex: `users`, `product`, `order`, `auth`) é dividido nas seguintes camadas, respeitando um fluxo unidirecional:

### 1. Routes (Rotas)
- **Responsabilidade:** Definir os endpoints da API (URLs) e quais middlewares de segurança devem ser aplicados (como verificação de token e permissões).
- **Regra:** Apenas mapeia a URL para o método correto do Controller. Não contém regras de negócio.

### 2. Controllers (Controladores)
- **Responsabilidade:** Receber a requisição HTTP (`req`), extrair os dados necessários (body, params, query) e chamar o respectivo Service. Após o Service retornar, o Controller formata a resposta HTTP (`res`) ou repassa erros para o middleware global (`next`).
- **Regra:** Não conhece regras de negócio complexas e **nunca** acessa o banco de dados.

### 3. Services (Serviços)
- **Responsabilidade:** Contém toda a **Regra de Negócio** da aplicação. É aqui que validações complexas, cálculos e orquestração de chamadas acontecem.
- **Regra:** **Totalmente agnóstico ao Prisma e ao Express**. Não sabe o que é `req` ou `res`, e não importa o Prisma Client. O Service se comunica estritamente com os **Repositories** enviando e recebendo **Models de Domínio**.

### 4. Repositories (Repositórios)
- **Responsabilidade:** Gerenciar a persistência de dados. **É a ÚNICA camada que importa e conhece o Prisma Client.**
- **Regra:** Realiza as queries no banco de dados e **obrigatóriamente** converte os resultados puros do Prisma (Raw Data) para instâncias das **Models de Domínio** antes de retorná-los para o Service. 

### 5. Models (Modelos de Domínio)
- **Responsabilidade:** Representar as entidades de negócio de forma pura. Servem como **Barreira Anti-Corrupção (DTO)**.
- **Regra:** Possuem métodos como `fromPrisma()` e `toPrisma()` para traduzir os campos em português do banco de dados (ex: `nome`, `criadoEm`) para a interface em inglês padrão do sistema (ex: `name`, `createdAt`). Isso blinda as camadas superiores contra vazamentos da estrutura do banco. Se o Prisma for trocado por outro ORM amanhã, o Service e o Controller não sofrerão **nenhuma** alteração.

---

## 🔄 Fluxo de Dados (Exemplo: Criar Usuário)

1. **Cliente HTTP** faz um `POST /users` com `{ name, email, password }`.
2. **`userRoutes.js`** recebe a chamada e encaminha para `UserController.createUser`.
3. **`UserController`** extrai os dados do body e chama `UserService.createUser({ name, email, password })`.
4. **`UserService`** valida se o email já existe chamando `UserRepository.findByEmail(email)`. Depois, faz o hash da senha e cria uma instância do **`UserModel`**. Passa esse modelo para `UserRepository.create(userModel)`.
5. **`UserRepository`** pega o `userModel`, chama `userModel.toPrisma()` para converter para o formato esperado pelo banco, e usa o `prisma.usuario.create()`. Depois, converte o resultado de volta para `UserModel` usando `UserModel.fromPrisma(resultado)` e retorna para o Service.
6. **`UserService`** retorna os dados limpos para o Controller através de `userModel.toSafeJSON()` (removendo a senha).
7. **`UserController`** envia o status `201 Created` e o JSON de volta para o cliente.

## 🛡️ Vantagens dessa Abordagem

- **Desacoplamento do Prisma:** O Prisma é um detalhe de infraestrutura confinado apenas na camada de Repository.
- **Manutenibilidade:** O código fica previsível. Se há um erro de banco, olhe no Repository. Se há um erro de regra, olhe no Service.
- **Segurança:** O Model garante que dados sensíveis não subam acidentalmente para o Controller (ex: retornando a senha do banco diretamente na API).

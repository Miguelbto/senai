# Arquitetura SaaS Multi-Tenant - Sabor Digital

Este documento explica os conceitos fundamentais, a nova estrutura de pastas modular e a estratégia de implementação para transformar a cantina física atual em uma plataforma **SaaS (Software as a Service)**, permitindo que qualquer restaurante se cadastre e use o sistema de forma isolada.

---

## 1. O Conceito de Multi-Tenancy (Multilocação)

No modelo SaaS, o termo **Tenant** (Inquilino) representa cada cliente corporativo (no seu caso, cada Restaurante/Cantina). O principal desafio é isolar os dados de cada restaurante para que a Cantina A nunca veja as vendas ou os produtos da Cantina B.

Existem três modelos comuns de Multi-tenancy:
1. **Banco de Dados Isolado (Database-per-Tenant):** Cada restaurante possui uma conexão física e banco próprio. (Altamente seguro, mas caro e complexo de atualizar).
2. **Schema por Tenant (Schema-per-Tenant):** Um único banco de dados, mas tabelas separadas por "namespace/schema" dentro do mesmo banco.
3. **Banco Compartilhado com Coluna de Isolamento (Shared Database - Column Discriminator):** Todos os dados residem na mesma tabela (ex: `produto`, `pedido`), e cada registro possui a chave estrangeira `tenant_id`.
   * **Recomendado para o Sabor Digital:** Este terceiro modelo é o mais barato e fácil de gerenciar no início, escalando facilmente com o MySQL.

---

## 2. Como Funciona a Identificação do Tenant na API

Quando o front-end envia uma requisição para a API (ex: `GET /produtos`), o backend precisa descobrir a qual restaurante esse usuário pertence. Isso pode ser feito de três formas:
* **Subdomínio:** O cliente acessa `cantinabella.sabordigital.com`. O backend lê o host HTTP e extrai `cantinabella`.
* **Header Customizado:** O front-end envia a chave `X-Tenant-ID: 1` no cabeçalho das requisições.
* **JWT Token Payload:** O token de acesso recebido no login já contém o `tenantId` encriptado no payload.

Neste modelo, incluímos o middleware de Tenant ([tenant.js](file:///c:/Users/migue/Documents/GitHub/senai/BACKEND/BANCO-DE-DADOS-3ETAPA/aula-0jwt/back-end/saas-structure/src/middlewares/tenant.js)) para ler esses dados e injetar o `tenant_id` em `req.tenantId` automaticamente.

---

## 3. Guia de Conteúdo das Pastas

### `database/`
*   `migrations/`: Em vez de importar um arquivo SQL estático, você escreve arquivos JavaScript que descrevem as tabelas (ex: `20260816_create_produtos.js`). Ferramentas como o **Knex** ou **Prisma** rodam esses scripts ordenadamente.
*   `seeders/`: Arquivos para popular tabelas iniciais. Exemplo: criar os planos "Básico", "Premium" e "Master" no seu banco.

### `src/config/`
*   Configurações centrais de ferramentas de terceiros (Stripe, Cloudinary, AWS S3) e configuração do pool do MySQL.

### `src/middlewares/`
*   `tenant.js`: O middleware responsável por extrair qual restaurante está acessando a API.
*   `auth.js`: Verifica se o token JWT do usuário de determinado restaurante é válido.
*   `errorHandler.js`: Intercepta todos os erros disparados nos Services e devolve em um formato JSON limpo e amigável.

### `src/modules/` (Modularização por Domínio)
Cada pasta representa um módulo de negócios independente. Em vez de espalhar código pela aplicação inteira, cada funcionalidade fica isolada:
*   `tenant/`: Lógica para cadastrar novos restaurantes, definir subdomínio e gerenciar dados do estabelecimento.
*   `auth/`: Cadastro e login dos funcionários de cada restaurante (Administradores, garçons, cozinheiros).
*   `products/`: Listagem e edição do cardápio do restaurante correspondente.
*   `orders/`: Controle e fluxo dos pedidos e carrinhos de compras.
*   `billing/`: Integração financeira com Stripe para cobrança mensal do restaurante. Se a assinatura expirar, o módulo bloqueia o acesso à API.

### `src/shared/`
*   Código utilitário compartilhado por múltiplos módulos.
*   `database/tenant-db.js`: Contém o helper para garantir que qualquer comando SQL (Select, Insert, Update, Delete) execute automaticamente filtrando ou injetando o `tenant_id` apropriado.

---

## 4. Estrutura do Banco de Dados Modificada

Para migrar para SaaS com banco compartilhado, adicione a tabela `tenants` e adicione a coluna `tenant_id` em todas as tabelas transacionais.

```sql
-- Tabela do Restaurante (Tenant)
CREATE TABLE tenants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_fantasia VARCHAR(100) NOT NULL,
    razao_social VARCHAR(150),
    slug VARCHAR(50) UNIQUE NOT NULL, -- Ex: 'bella-vita' para subdominio
    status ENUM('ativo', 'suspenso', 'inativo') DEFAULT 'ativo',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Produtos Modificada
CREATE TABLE produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT NOT NULL, -- Ligação com o restaurante dono do produto
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    disponivel BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

-- Tabela de Usuários Modificada
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tenant_id INT NOT NULL, -- A qual restaurante este funcionário pertence
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    papel ENUM('admin', 'cozinha', 'garcom') DEFAULT 'garcom',
    UNIQUE(tenant_id, email), -- Permite o mesmo email em diferentes restaurantes, mas único dentro daquele
    FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);
```

---

## 5. Próximos Passos de Integração no seu Código

1.  **Instale um Query Builder:** Considere instalar o `knex` (`npm install knex mysql2`) para facilitar a automação de queries com escopo de tenant.
2.  **Transição:** Crie o banco novo com as chaves `tenant_id`.
3.  **Use o middleware globalmente:** Registre o middleware de Tenant no `app.js` de forma que toda chamada passe por ele.
4.  **Criação do Tenant:** Crie uma rota livre de autenticação de tenant `POST /tenants` onde um novo restaurante pode preencher seus dados, cadastrar o primeiro usuário administrador e ser redirecionado para a tela de faturamento.

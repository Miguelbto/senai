# APIfirst: Guia de Construção da Mini Loja (DDD + Clean Architecture + TypeScript)

> Este documento é o **mapa de execução** do nosso trabalho em dupla. Ele complementa o *Guia de Mentoria*: o guia explica **por que**; este explica **o quê, em que ordem e com quais decisões** para cada *bounded context*.
>
> Regra de ouro (herdada do guia): **mover código, não reescrever**. Cada passo termina com um checkpoint verde e um commit pequeno.

---

## Índice

1. [Como vamos trabalhar](#1-como-vamos-trabalhar)
2. [Mapa de contextos (Context Map)](#2-mapa-de-contextos-context-map)
3. [Legado → contextos → casos de uso](#3-legado--contextos--casos-de-uso)
4. [Alerta: a suíte de testes atual não descreve o legado](#4-alerta-a-suíte-de-testes-atual-não-descreve-o-legado)
5. [Setup TypeScript e estrutura de pastas](#5-setup-typescript-e-estrutura-de-pastas)
6. [Fase 0: rede de segurança](#6-fase-0-rede-de-segurança)
7. [Fase 1: Shared Kernel](#7-fase-1-shared-kernel)
8. [Fase 2: contexto Identity](#8-fase-2-contexto-identity-usuários)
9. [Fase 3: contexto Catalog](#9-fase-3-contexto-catalog-produtos-e-estoque)
10. [Fase 4: contexto Ordering (core)](#10-fase-4-contexto-ordering-core-do-negócio)
11. [Fase 5: contexto Payment](#11-fase-5-contexto-payment)
12. [Fase 6: contexto Reporting](#12-fase-6-contexto-reporting-consulta)
13. [Fase 7: interface HTTP e Composition Root](#13-fase-7-interface-http-e-composition-root)
14. [Fase 8: enterrar o monolito](#14-fase-8-enterrar-o-monolito)
15. [Imposição automática das fronteiras](#15-imposição-automática-das-fronteiras)
16. [Modelo do DECISOES.md](#16-modelo-do-decisoesmd)
17. [Ritmo de trabalho (sessões)](#17-ritmo-de-trabalho-sessões)

---

## 1. Como vamos trabalhar

Cada fase segue o mesmo ritual:

| Etapa | O que acontece |
|---|---|
| **Entender** | Eu explico o conceito e as regras do contexto, com as perguntas-guia. |
| **Decidir** | Você toma as decisões de design e registra no `DECISOES.md`. |
| **Construir** | Você escreve o código seguindo os passos; eu entrego esqueletos/contratos, não a solução completa. |
| **Provar** | Testes do contexto verdes + suíte de caracterização verde. |
| **Revisar** | Code review em conjunto antes de avançar. |

**Convenções**

- Código em TypeScript com `strict: true` desde o primeiro arquivo novo (o legado continua `strict: false` até morrer).
- Nomes de código em **inglês** (linguagem do legado); termos de negócio no `DECISOES.md` em português.
- Um commit por passo pequeno, mensagem no formato `tipo(contexto): descrição` (ex.: `feat(catalog): add Product entity`).
- **Nunca** misturar "mover" com "melhorar" no mesmo commit.

---

## 2. Mapa de contextos (Context Map)

Um *bounded context* é uma fronteira dentro da qual cada termo tem **um único significado** e o modelo é coeso. "Usuário" em Identity (credenciais, VIP) não é o mesmo que "Cliente" em Ordering (quem comprou, para onde notificar).

```
                    ┌──────────────────────┐
                    │    SHARED KERNEL     │  Money, DomainError, Clock,
                    │ (mínimo e estável)   │  IdGenerator, UnitOfWork
                    └──────────┬───────────┘
                               │ usado por todos
   ┌───────────────┐   ┌───────▼───────┐   ┌────────────────┐
   │   IDENTITY    │◄──┤   ORDERING    ├──►│    CATALOG     │
   │ usuários, VIP │   │  (CORE)       │   │ produtos,      │
   │ senha, e-mail │   │ pedido, cupom │   │ estoque        │
   └───────────────┘   │ frete, ciclo  │   └────────────────┘
        Customer       │ de vida       │      ProductCatalog
        Directory      └──┬─────────┬──┘      (porta no Ordering)
        (porta no         │         │
         Ordering)        ▼         ▼
                  ┌────────────┐  ┌─────────────┐
                  │  PAYMENT   │  │  REPORTING  │
                  │ PIX/cartão │  │ (consulta,  │
                  │ parcelas   │  │  só leitura)│
                  │ gateway    │  └─────────────┘
                  └────────────┘
```

**Relações entre contextos** (vocabulário DDD):

| De → Para | Tipo | Como se materializa |
|---|---|---|
| Ordering → Identity | *Customer/Supplier* + **ACL** | Ordering define a porta `CustomerDirectory`; um adaptador traduz `User` → `Customer`. |
| Ordering → Catalog | *Customer/Supplier* + **ACL** | Ordering define a porta `ProductCatalog`; adaptador chama o `public-api` do Catalog. |
| Ordering → Payment | *Customer/Supplier* + **ACL** | Ordering define a porta `PaymentProcessor`; adaptador chama o `public-api` do Payment. |
| Reporting → (dados de Ordering) | *Conformist* / leitura | Consulta SQL direta (read model); não passa pelas entidades. |
| Todos → Shared Kernel | *Shared Kernel* | Só o que for **realmente** comum e estável. |

**Decisões de fronteira que assumimos (e você pode contestar no `DECISOES.md`)**

1. **Estoque mora em Catalog.** Alternativa: um contexto `Inventory` separado. Para o estudo, separar seria exagero; registre o raciocínio.
2. **Envio fica dentro de Ordering** por enquanto: ele é só uma transição de estado do pedido + geração de código de rastreio. Se um dia houver transportadora, vira contexto `Shipping` (desafio extra).
3. **Pagamento é um contexto próprio**, porque a política de preço por método e o gateway mudam por motivos diferentes do ciclo de vida do pedido.
4. **Reporting é só consulta** (lado "Q" de CQRS): sem entidades, sem regras de escrita.
5. **Um único banco SQLite compartilhado** (monolito modular). Cada contexto só toca nas **suas** tabelas; isso é a fronteira de dados.

> Pergunta para refletir antes de seguir: se amanhã o Catalog virasse um microsserviço, quais arquivos do Ordering mudariam? A resposta certa é: **só o adaptador** da porta `ProductCatalog`.

---

## 3. Legado → contextos → casos de uso

| Endpoint legado | Contexto dono | Caso de uso (Application) |
|---|---|---|
| `POST /users` | Identity | `RegisterUser` |
| `GET /users/:id` | Identity | `GetUser` |
| `POST /products` | Catalog | `RegisterProduct` |
| `GET /products` | Catalog | `ListActiveProducts` |
| `DELETE /products/:id` | Catalog (+ consulta a Ordering) | `DeactivateProduct` |
| `POST /orders` | Ordering | `CreateOrder` |
| `GET /orders/:id` | Ordering | `GetOrder` |
| `POST /orders/:id/pay` | Ordering (orquestra) + Payment | `PayOrder` |
| `POST /orders/:id/ship` | Ordering | `ShipOrder` |
| `POST /orders/:id/cancel` | Ordering | `CancelOrder` |
| `GET /reports/sales` | Reporting | `GetSalesReport` |

**Casos de uso internos (não têm endpoint, existem por causa das fronteiras):**

| Contexto | Caso de uso | Quem chama |
|---|---|---|
| Catalog | `ReserveStock`, `ReleaseStock` | adaptador de `ProductCatalog` (Ordering) |
| Catalog | `GetProductsForOrder` | adaptador de `ProductCatalog` |
| Identity | `GetCustomerSnapshot` | adaptador de `CustomerDirectory` |
| Payment | `ProcessPayment`, `RefundPayment` | adaptador de `PaymentProcessor` |

> ⚠️ **Armadilha de fronteira:** `DELETE /products/:id` precisa saber se o produto está em pedido **PENDING**. Isso é dado de Ordering. Catalog **não pode** consultar a tabela `orders`. Defina uma porta no Catalog (ex.: `PendingOrdersChecker`) implementada por um adaptador que fala com Ordering. Esse é o caso de dependência **circular entre contextos** mais comum, e a porta é a saída.

---

## 4. Alerta: a suíte de testes atual não descreve o legado

O final do `server.ts` já contém uma suíte, mas ela **não é de caracterização**: ela descreve uma API *imaginada*, diferente da que o código faz. Rodando como está, a maioria falharia. Isso é ótimo material de estudo: testes de caracterização documentam **o que acontece hoje**, não o que "deveria" acontecer.

### 4.1. Problemas estruturais

| Problema | Por que importa | Correção |
|---|---|---|
| `buildApp()` não existe | A suíte chama `buildApp({ dbInMemoria: true })`, mas o legado cria `app` e `db` no topo do módulo e já chama `listen`. | Passo 0.1 desta fase. |
| Testes dentro do `server.ts` | Importar o arquivo executa servidor + testes; `node:test` entra no código de produção. | Mover para `tests/e2e/`. |
| Sem *seed* | Usa `'user-1'`, `'prod-1'`, `'order-paga'`... que nunca foram criados. | Criar dados **pela própria API** com helpers (seção 6.3). |
| Testes dependentes uns dos outros | Ex.: "pedido já pago" assume estado prévio. | Cada teste monta seu cenário; `beforeEach` com banco `:memory:` novo. |

### 4.2. Divergências contra o comportamento real do legado

| Teste atual espera | Legado realmente faz |
|---|---|
| Payload `nome`, `senha` | `name`, `email`, `password`, `isVip` |
| Payload produto `nome`, `preco`, `estoque`, `ativo` | `name`, `price` (reais, `number`), `stock` |
| Payload pedido `clienteId`, `itens[{produtoId, quantidade}]`, `cupom` | `userId`, `items[{productId, quantity}]`, `coupon` |
| `DELETE /products/:id` → **200** | **204** (soft delete: `active = 0`) |
| Excluir produto com pedido pendente → **400** | **409** `produto em pedido pendente` |
| Estoque insuficiente → **400** | **409** `estoque insuficiente para <nome>` |
| Cupom `CUPOM_VIP` → 403 | Cupons existentes: `PROMO10`, `VIP20`, `FRETEGRATIS`. `CUPOM_VIP` cai em **400 `cupom invalido`**. O 403 é de `VIP20` com não-VIP. |
| Resposta com `desconto`, `valorFrete` | `discount`, `shipping`, `subtotal`, `total` (em reais) |
| `POST /payments` com `pedidoId`, `metodo`, `parcelas` | `POST /orders/:id/pay` com `method` (`PIX`/`CARD`), `installments`, `cardNumber` |
| Método `CREDITO`, status `PAGO` | `CARD`; status `PAID` |
| Pagamento de pedido já pago → 400 | **409** |
| `PATCH /orders/:id/ship` e `/cancel` | **`POST`** |
| Status `ENVIADO`/`CANCELADO` | `SHIPPED`/`CANCELED` |
| Enviar pedido PENDENTE → 400 | **409** |
| Cancelar enviado → 400 | **409** |
| Cancelar pedido pago devolve `estornado: true` | Não existe esse campo; resposta é `{ id, status: 'CANCELED' }`. O estorno é só um `console.log`. |
| Relatório com query `dataInicio/dataFim`; chaves `totalVendas`, `faturamentoTotal` | Query ignorada; resposta `{ porStatus, faturamento }` |
| Cartão recusado com `numeroCartao` | `cardNumber`; recusa = começa com `0000` (402) |
| Cartão à vista/7x sem número de cartão | Sem `cardNumber` com ≥ 13 caracteres → **400 `cartao invalido`** |

### 4.3. Quirks do legado que seus testes precisam capturar

Estes comportamentos surpreendem. Decida, para cada um, **preservar** (documentando) ou **corrigir depois** (em commit separado):

1. **Pedido mínimo só é alcançável com frete grátis.** O mínimo (R$ 10,00) é checado sobre `subtotal - desconto + frete`. Com frete padrão de R$ 19,90, o total já passa de R$ 10. Para testar "abaixo do mínimo" você precisa de `FRETEGRATIS` + subtotal < R$ 10.
2. **Itens repetidos do mesmo produto** no mesmo pedido: o estoque é validado **por linha**, não pela soma. Dois itens de 6 unidades de um produto com estoque 10 passam na validação. (Bug latente; o estoque pode ficar negativo.)
3. **Ordem das validações** define qual erro aparece: forma do item → quantidade → produto existe → ativo → estoque → cupom → mínimo.
4. **Pagamento sobrescreve `total`** do pedido pelo valor final (PIX −5%, parcelas > 6 → +3%). O total original se perde.
5. **PIX ignora `installments`** e grava `1`.
6. **`installments || 1`**: `0` vira `1` silenciosamente.
7. **Relatório mistura unidades**: `porStatus[].soma` está em **centavos**, `faturamento` em **reais**.
8. **Faturamento = status `PAID` + `SHIPPED`**.
9. **Hash** é `sha256(senha + 'segredo123')`: sem salt por usuário, segredo no código.
10. **Dinheiro**: `price * 100` com `Math.round`; risco clássico de ponto flutuante.

---

## 5. Setup TypeScript e estrutura de pastas

### 5.1. Dependências

```bash
npm i fastify better-sqlite3
npm i -D typescript tsx @types/node @types/better-sqlite3 dependency-cruiser
```

Runner de testes: `node:test` (Node ≥ 22) com `tsx`, já que o legado o usa. Vitest é uma alternativa válida; escolha uma e registre.

### 5.2. `tsconfig.json` (para o código novo)

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "baseUrl": "src",
    "paths": {
      "@shared/*": ["shared-kernel/*"],
      "@identity/*": ["contexts/identity/*"],
      "@catalog/*": ["contexts/catalog/*"],
      "@ordering/*": ["contexts/ordering/*"],
      "@payment/*": ["contexts/payment/*"],
      "@reporting/*": ["contexts/reporting/*"]
    }
  },
  "include": ["src", "tests"]
}
```

> Os *path aliases* funcionam com o `tsx`, mas leia a documentação: se preferir zero configuração, use imports relativos e pule os aliases.

### 5.3. `package.json` (scripts)

```json
{
  "scripts": {
    "dev": "tsx watch src/main.ts",
    "test": "node --import tsx --test \"tests/**/*.test.ts\"",
    "test:unit": "node --import tsx --test \"tests/unit/**/*.test.ts\"",
    "test:e2e": "node --import tsx --test \"tests/e2e/**/*.test.ts\"",
    "typecheck": "tsc --noEmit",
    "deps:check": "depcruise src --config .dependency-cruiser.cjs"
  }
}
```

### 5.4. Estrutura-alvo: organizar **por contexto**, depois por camada

```
src/
  shared-kernel/
    domain/            money.ts · domain-error.ts
    application/       clock.ts · id-generator.ts · unit-of-work.ts
    infrastructure/    system-clock.ts · uuid-generator.ts · sqlite-unit-of-work.ts
  contexts/
    identity/
      domain/          user.ts · email.ts · plain-password.ts · password-hash.ts · errors.ts
      application/     ports/ · use-cases/ · dto/
      infrastructure/  sqlite-user-repository.ts · user-mapper.ts · scrypt-password-hasher.ts
      interface/http/  user-routes.ts · user-schemas.ts
      public-api.ts    (o que outros contextos podem usar)
    catalog/           (mesma anatomia)
    ordering/          (mesma anatomia + domain/services e domain/coupons)
    payment/           (mesma anatomia)
    reporting/         (application/ + infrastructure/ + interface/, sem domain)
  app/
    build-app.ts       (monta Fastify + plugins + error handler; NÃO escuta porta)
    composition-root.ts(instancia adaptadores e injeta nos casos de uso)
    error-handler.ts
    config.ts          (único lugar que lê process.env)
  main.ts              (lê config, chama buildApp, listen)
tests/
  unit/<contexto>/     (domain e application, sem banco)
  integration/<contexto>/ (repositórios com :memory:)
  e2e/                 (caracterização HTTP)
```

### 5.5. Regras de dependência (valem para **todos** os contextos)

| Camada | Pode importar | Não pode importar |
|---|---|---|
| `domain` | `shared-kernel/domain` e o próprio domain | qualquer pacote npm, `application`, `infrastructure`, outros contextos |
| `application` | `domain` do próprio contexto, `shared-kernel/{domain,application}` | `infrastructure`, `interface`, Fastify, SQLite, outros contextos |
| `infrastructure` | `application` e `domain` do próprio contexto, libs técnicas; **`public-api` de outros contextos** (somente nos adaptadores ACL) | `interface` |
| `interface` | `application` do próprio contexto | `domain` direto, `infrastructure` |
| `app/` (composition root) | tudo | nada o importa (exceto `main.ts`) |

---

## 6. Fase 0: rede de segurança

**Objetivo:** congelar o comportamento atual com testes que passem **contra o monolito**.

### Passo 0.1. Separar "construir" de "escutar" (ainda em arquivo único)

1. Envolver tudo que hoje está no topo do módulo (`Fastify`, `Database`, `db.exec`, rotas) numa função `buildApp(options)`.
2. `options.dbPath` (ou `dbInMemoria`) decide entre arquivo `loja.db` e `':memory:'`. Dentro da função, `db` passa a ser variável local, capturada pelas rotas.
3. Deixar o `listen` **fora** (só executado quando o arquivo é o ponto de entrada).
4. Remover o bloco `describe(...)` de dentro do `server.ts` e os imports de `node:test`.

> **Pergunta-guia:** por que `:memory:` + `beforeEach` cria isolamento perfeito entre testes? E por que `app.inject()` dispensa abrir porta de rede?

### Passo 0.2. Mover os testes para `tests/e2e/characterization.test.ts`

Importe `buildApp` do `server.ts` legado. Os testes só passam a existir depois do 0.1.

### Passo 0.3. Helpers de cenário (substituem o "seed" inexistente)

```ts
// tests/e2e/helpers.ts  (esqueleto; você completa)
import type { FastifyInstance } from 'fastify'

export async function createUser(app: FastifyInstance, overrides = {}) {
  const res = await app.inject({
    method: 'POST', url: '/users',
    payload: { name: 'Miguel', email: `u${Math.random()}@x.com`, password: 'secret1', ...overrides },
  })
  return res.json() as { id: string }
}

export async function createProduct(app: FastifyInstance, overrides = {}) { /* TODO */ }
export async function createOrder(app: FastifyInstance, input: unknown)   { /* TODO */ }
export async function payOrder(app: FastifyInstance, orderId: string, body: unknown) { /* TODO */ }
```

### Passo 0.4. Reescrever os testes segundo a tabela da seção 4

- Para cada teste: **primeiro rode a chamada manualmente**, anote status e corpo reais, **depois** escreva a asserção. É isso que torna o teste "de caracterização".
- Asserte **status + corpo** (inclusive a mensagem de erro), não só o status.
- Cubra os quirks 1 a 8 da seção 4.3.
- Casos de cupom: `PROMO10` (10%), `VIP20` com VIP e sem VIP, `FRETEGRATIS`, cupom inválido, cupom em minúsculas.
- Pagamento: PIX (−5%), cartão 1x, cartão 7x (+3%), cartão recusado (`0000...`), cartão curto, parcelas 0/13, método inválido, pedido já pago.
- Cancelamento em **cada** status: PENDING, PAID (com estorno logado), SHIPPED, CANCELED.
- Para verificar efeitos (estoque devolvido): consulte `GET /products` antes/depois.

**Checkpoint 0:** `npm run test:e2e` verde contra o monolito. Commit: `test: characterization suite for legacy monolith`.

---

## 7. Fase 1: Shared Kernel

**Princípio:** o Shared Kernel é **pequeno de propósito**. Tudo que entra nele vira acoplamento entre todos os contextos. Regra: só entra o que é (a) estável e (b) com o mesmo significado em todos.

### Passo 1.1. `Money` (Value Object)

Resolve a confusão centavos × reais **uma vez**. Decisões que você precisa tomar e registrar:

- Representação interna (recomendo **centavos inteiros**).
- Pode ser negativo? (Hoje o legado nunca produz negativo; um desconto > subtotal é possível?)
- Arredondamento de percentual: o legado usa `Math.round`. Preserve isso (quirk de caracterização) e teste valores como `x.5`.
- Conversão de/para reais só nas **bordas** (DTOs de entrada/saída), nunca dentro do domínio.

```ts
// shared-kernel/domain/money.ts  (assinaturas; o corpo é seu)
export class Money {
  private constructor(private readonly cents: number) {}

  static fromCents(cents: number): Money { /* TODO: inteiro? >= 0? lançar erro de validação */ }
  static fromReais(reais: number): Money { /* TODO: igual ao legado: Math.round(reais * 100) */ }
  static zero(): Money { /* TODO */ }

  add(other: Money): Money { /* TODO */ }
  subtract(other: Money): Money { /* TODO */ }
  multiplyByRate(rate: number): Money { /* TODO: Math.round, como no legado */ }
  isLessThan(other: Money): boolean { /* TODO */ }
  isGreaterOrEqual(other: Money): boolean { /* TODO */ }

  toCents(): number { /* TODO */ }
  toReais(): number { /* TODO */ }
}
```

**Testes (milissegundos, sem nada externo):** soma, subtração, percentual com arredondamento, igualdade, rejeitar centavos fracionários/NaN.

### Passo 1.2. Erros de domínio com categoria

```ts
// shared-kernel/domain/domain-error.ts
export type ErrorKind =
  | 'validation'        // → 400
  | 'not_found'         // → 404
  | 'conflict'          // → 409
  | 'forbidden'         // → 403
  | 'payment_declined'  // → 402

export abstract class DomainError extends Error {
  abstract readonly kind: ErrorKind
  constructor(message: string) {
    super(message)
    this.name = new.target.name
  }
}
```

Cada contexto cria seus erros concretos estendendo essa base (ex.: `InsufficientStockError` com `kind = 'conflict'`). **Nenhum erro conhece HTTP**; o mapeamento `kind → status` fica na Fase 7.

> **Decisão:** as mensagens do legado (`'email ja cadastrado'`, etc.) viram a `message` dos erros. Assim os testes de caracterização continuam verdes sem mapeamento extra.

### Passo 1.3. Portas compartilhadas

```ts
// shared-kernel/application/clock.ts
export interface Clock { now(): Date }

// shared-kernel/application/id-generator.ts
export interface IdGenerator { next(): string }

// shared-kernel/application/unit-of-work.ts
export interface UnitOfWork {
  run<T>(work: () => Promise<T>): Promise<T>
}
```

> **Armadilha (Unit of Work + better-sqlite3):** o `db.transaction(fn)` do better-sqlite3 só aceita função **síncrona**, e seus casos de uso serão `async`. A saída usual é `BEGIN` / `COMMIT` / `ROLLBACK` manuais dentro do adaptador. Funciona enquanto todos os adaptadores forem síncronos por baixo, mas é frágil se houver `await` em I/O real entre o `BEGIN` e o `COMMIT`. Registre no `DECISOES.md` como você resolveu e quais as limitações.

### Passo 1.4. Adaptadores do kernel

`SystemClock`, `UuidGenerator` (`crypto.randomUUID`) e `SqliteUnitOfWork` ficam em `shared-kernel/infrastructure`.

**Checkpoint 1:** testes de `Money` verdes; `shared-kernel/domain` sem imports externos. Commit: `feat(shared): money, domain errors and shared ports`.

---

## 8. Fase 2: contexto Identity (usuários)

**Por que começar aqui:** é o contexto mais simples e sem dependências. É onde você aprende o ciclo completo antes de enfrentar o Ordering.

### 8.1. Linguagem ubíqua

`User`, `Email`, `PlainPassword` (texto puro, só existe na borda), `PasswordHash` (já protegida), `VIP`.

### 8.2. Regras extraídas do legado

| Regra | Camada de destino |
|---|---|
| Nome com pelo menos 2 caracteres | Domínio (`User`/validação de criação) |
| E-mail válido (hoje: contém `@` e `.`) e normalizado em minúsculas | Domínio (`Email`) |
| Senha com pelo menos 6 caracteres | Domínio (`PlainPassword`) |
| E-mail único | Aplicação (precisa do repositório) + restrição `UNIQUE` como segunda defesa |
| `isVip` booleano | Domínio (atributo de `User`) |
| Hash da senha | **Infraestrutura** (porta `PasswordHasher`) |
| E-mail de boas-vindas | **Infraestrutura** (porta `WelcomeNotifier`) |

### 8.3. Passo a passo

**Passo 2.1: Domínio**

1. `Email` (VO): valida e normaliza; `Email.create(raw)` lança erro de validação.
2. `PlainPassword` (VO): valida o mínimo; **nunca** é persistido nem logado.
3. `PasswordHash` (VO): apenas embrulha a string já protegida. A separação entre os dois tipos impede, em tempo de compilação, salvar senha em texto puro.
4. `User` (entidade): dois caminhos de criação.
   - `User.register(...)`: **nova**, valida regras de criação.
   - `User.rehydrate(...)`: **reconstrução** do banco, sem revalidar regras de criação.
5. Erros: `InvalidUserNameError`, `InvalidEmailError`, `WeakPasswordError` (validation); `EmailAlreadyRegisteredError` (conflict); `UserNotFoundError` (not_found).

**Passo 2.2: Aplicação**

Portas (em `identity/application/ports/`):

```ts
export interface UserRepository {
  findById(id: string): Promise<User | null>
  existsByEmail(email: Email): Promise<boolean>
  save(user: User): Promise<void>
}

export interface PasswordHasher {
  hash(plain: PlainPassword): Promise<PasswordHash>
}

export interface WelcomeNotifier {
  userRegistered(user: { name: string; email: string }): Promise<void>
}
```

Casos de uso `RegisterUser` e `GetUser`. Roteiro mental de `RegisterUser`:

```
validar/construir VOs → existsByEmail? (conflito) → gerar id/now → hash da senha
→ User.register → repository.save → notifier → devolver output (DTO)
```

DTOs de input/output **não** expõem a entidade. O output de `GetUser` **nunca** inclui hash.

Para o futuro Ordering: crie o caso de uso interno `GetCustomerSnapshot` que devolve `{ id, email, isVip }` e exponha-o em `identity/public-api.ts`.

**Passo 2.3: Infraestrutura**

1. `SqliteUserRepository` + `UserMapper` (linha `snake_case` ⇄ entidade). Teste de integração com `:memory:`.
2. Hash: ver desafio abaixo.
3. `ConsoleWelcomeNotifier`: mantém o `console.log` do legado, agora em adaptador.

> **Desafio de segurança (decisão separada da refatoração):** o hash legado é `sha256(senha + 'segredo123')`. Trocar o algoritmo **quebra o login de quem já existe** (nem existe login ainda, mas o dado persistido muda). Faça em dois commits: (1) mover o hash atual para o adaptador **sem mudar o algoritmo**; (2) `refactor/security`: trocar por `scrypt` com salt por usuário (módulo `crypto` do Node, sem dependência extra) e segredo fora do código.

**Passo 2.4: Interface HTTP**

Plugin Fastify `identityRoutes(app, { registerUser, getUser })`. Schema valida **forma** (tipos, campos presentes); o domínio valida **significado**.

> Cuidado com as mensagens: o legado responde `nome invalido`, `email invalido`... e não valida `typeof`. Se o schema do Fastify rejeitar antes do domínio, a mensagem/status pode mudar. Seus testes de caracterização vão avisar. Decida: aceitar a mudança (documente) ou adaptar.

**Passo 2.5: Testes**

- Unit (sem nada externo): `Email`, `PlainPassword`, `User.register`, `RegisterUser` com **fakes** em memória (e-mail duplicado, notificação enviada, hash aplicado).
- Integration: repositório SQLite.

**Checkpoint 2:** contexto Identity com testes verdes, `domain/` sem imports externos, suíte de caracterização verde com as rotas `/users` vindo do novo código (estratégia: o `server.ts` passa a **delegar** a rota ao novo caso de uso).

---

## 9. Fase 3: contexto Catalog (produtos e estoque)

### 9.1. Linguagem ubíqua

`Product`, `Stock`, `Active/Inactive` (desativar = *soft delete*), `Price` (usa `Money`).

### 9.2. Regras extraídas do legado

| Regra | Camada |
|---|---|
| Nome não vazio (após `trim`) | Domínio |
| Preço positivo, informado em reais (`number`) | Domínio (`Money` + validação > 0) |
| Estoque inteiro ≥ 0 | Domínio |
| Produto sabe se tem estoque para N unidades; baixa e devolve estoque | Domínio (`Product`) |
| Desativar = `active = false`, nunca apagar | Domínio |
| Proibido desativar com pedido **PENDING** | Aplicação (consulta cross-context via porta) |
| Listagem só de ativos | Aplicação/consulta |

### 9.3. Passo a passo

**Passo 3.1: Domínio**

- `Product` com `register(...)` e `rehydrate(...)`; comportamentos `hasStockFor(qty)`, `reserve(qty)` (lança `InsufficientStockError`), `release(qty)`, `deactivate()`, `isActive`.
- Erros: `InvalidProductError` (validation), `ProductNotFoundError` (not_found), `ProductUnavailableError` (validation, **400**, como no legado), `InsufficientStockError` (conflict, **409**), `ProductInPendingOrderError` (conflict).

> **Pergunta-guia:** `reserve` deve validar também "ativo?" ou isso é outra regra? No legado são duas verificações distintas, com status distintos (400 × 409). Preserve essa distinção.

**Passo 3.2: Aplicação**

Portas:

```ts
export interface ProductRepository {
  findById(id: string): Promise<Product | null>
  findManyByIds(ids: string[]): Promise<Product[]>
  listActive(): Promise<Product[]>
  save(product: Product): Promise<void>
}

// Fronteira com Ordering. Catalog define o que PRECISA saber; Ordering o implementa.
export interface PendingOrdersChecker {
  hasPendingOrdersFor(productId: string): Promise<boolean>
}
```

Casos de uso públicos: `RegisterProduct`, `ListActiveProducts`, `DeactivateProduct`.
Casos de uso **internos** (consumidos por Ordering via `public-api`): `GetProductsForOrder`, `ReserveStock`, `ReleaseStock`.

Quem converte centavos → reais na saída? **O DTO de saída**, não o domínio.

**Passo 3.3: Infraestrutura**

`SqliteProductRepository` + `ProductMapper` (`price_cents`, `active` como inteiro 0/1). O `PendingOrdersChecker` **não** mora aqui: o adaptador ficará no contexto Ordering (porque é Ordering quem sabe o que é pedido pendente) e será ligado no Composition Root. Registre essa decisão.

**Passo 3.4: Interface HTTP**

`catalogRoutes`. `DELETE` responde **204** sem corpo.

**Checkpoint 3:** testes unitários do Catalog (com fakes) e de integração do repositório verdes; rotas `/products` servidas pelo código novo; suíte de caracterização verde.

---

## 10. Fase 4: contexto Ordering (core do negócio)

É o coração do sistema e onde DDD e Clean Architecture mais valem. Vá devagar e **desenhe antes de codar**.

### 10.1. Linguagem ubíqua

`Order` (agregado raiz), `OrderItem`, `OrderStatus`, `Coupon`, `Subtotal`, `Discount`, `Shipping`, `Customer` (visão de Ordering sobre quem compra), `TrackingCode`.

### 10.2. Diagrama de estados (confirme com o código!)

```
            pay                 ship
 PENDING ──────────► PAID ─────────────► SHIPPED   (terminal)
    │                  │
    │ cancel           │ cancel (com estorno)
    ▼                  ▼
 CANCELED (terminal)  CANCELED
```

Transições inválidas e as mensagens do legado:

| Ação | Estado atual | Resultado legado |
|---|---|---|
| pay | ≠ PENDING | 409 `pedido nao esta pendente, status atual: <status>` |
| ship | ≠ PAID | 409 `so e possivel enviar pedidos pagos` |
| cancel | SHIPPED | 409 `pedido ja enviado nao pode ser cancelado` |
| cancel | CANCELED | 409 `pedido ja cancelado` |

### 10.3. Regras extraídas do legado

| Grupo | Regra | Camada |
|---|---|---|
| Criação | `userId` obrigatório; lista de itens não vazia | Aplicação/Domínio (decida e justifique) |
| Criação | Quantidade inteira > 0 e ≤ 10 por item | Domínio (`OrderItem`/`Order`) |
| Criação | Produto existe, está ativo, tem estoque | Catalog (via porta) |
| Preço | Subtotal = Σ `unitPrice × quantity` (preço **no momento da compra**) | Domínio (serviço de preço) |
| Cupom | `PROMO10` = 10% (arredonda) | Domínio (estratégia) |
| Cupom | `VIP20` = 20%, **somente cliente VIP** (senão 403) | Domínio (estratégia) |
| Cupom | `FRETEGRATIS` zera o frete | Domínio (estratégia) |
| Cupom | Outro código → 400 `cupom invalido`; código case-insensitive | Domínio |
| Frete | Padrão R$ 19,90; grátis se `subtotal − desconto ≥ R$ 200,00` ou cupom `FRETEGRATIS` | Domínio (serviço de preço) |
| Mínimo | `total ≥ R$ 10,00` (total **inclui** frete) | Domínio (serviço de preço) |
| Ciclo de vida | Transições da seção 10.2 | Domínio (`Order`) |
| Cancelamento | Devolve estoque dos itens; estorna se estava PAID | Aplicação (orquestra Catalog + Payment) |
| Envio | Gera código de rastreio `BR<número>XX` | Porta `TrackingCodeGenerator` (infra) |

### 10.4. Passo a passo

**Passo 4.1: Domínio: Value Objects e constantes nomeadas**

- `OrderStatus` (enum fechado), `PaymentMethod` (aqui, apenas como tipo de registro do pedido; a lógica fica em Payment), `TrackingCode`, `Quantity` (1 a 10).
- Constantes nomeadas (fim dos números mágicos): `MAX_QUANTITY_PER_ITEM`, `STANDARD_SHIPPING`, `FREE_SHIPPING_THRESHOLD`, `MINIMUM_ORDER_TOTAL`, `PROMO10_RATE`, `VIP20_RATE`.

**Passo 4.2: Domínio: política de cupons (Strategy / aberto-fechado)**

```ts
// ordering/domain/coupons/coupon-policy.ts
export interface CouponContext {
  subtotal: Money
  customer: { isVip: boolean }
}
export interface CouponEffect {
  discount: Money
  freeShipping: boolean
}
export interface CouponPolicy {
  readonly code: string                      // 'PROMO10'
  apply(ctx: CouponContext): CouponEffect    // lança CouponNotAllowedError se não puder
}

// ordering/domain/coupons/coupon-registry.ts
export class CouponRegistry {
  constructor(private readonly policies: CouponPolicy[]) {}
  resolve(code: string): CouponPolicy { /* TODO: case-insensitive; senão InvalidCouponError */ }
}
```

> **Teste de maturidade:** para adicionar o cupom `BLACK50`, você deve **criar** um arquivo e **registrá-lo** na lista. Nenhuma linha dos cupons existentes pode mudar.

**Passo 4.3: Domínio: serviço de preço**

`OrderPricing.calculate({ lines, coupon?, customer })` → `{ subtotal, discount, shipping, total }`. Respeita a ordem do legado (cupom → frete → mínimo). Sem I/O, sem relógio. Testes: cada cupom, frete na fronteira (exatamente R$ 200,00; R$ 199,99), mínimo (veja quirk 1), arredondamento.

**Passo 4.4: Domínio: agregado `Order`**

```ts
// ordering/domain/order.ts  (contrato; implementação é sua)
export class Order {
  static create(props: NewOrderProps): Order              // nova: valida regras de criação
  static rehydrate(props: PersistedOrderProps): Order     // do banco: sem revalidar criação

  markPaid(args: { finalTotal: Money; method: PaymentMethod; installments: number; at: Date }): void
  ship(args: { trackingCode: TrackingCode; at: Date }): void
  cancel(at: Date): { wasPaid: boolean }                  // devolve info para a camada de aplicação decidir estorno

  get status(): OrderStatus
  get items(): readonly OrderItem[]
  // ...getters; nenhum setter público
}
```

Perguntas-guia:

- O `Order` guarda `Product` ou só `productId` + `unitPrice`? (Dica: por que o legado guarda `unit_price` no item? O que acontece se o preço do produto mudar depois?)
- Onde mora a regra "só PENDING pode ser paga"? Resposta esperada: **dentro de `Order.markPaid`**. Mas atenção ao quirk de ordem: o legado checa status **antes** de validar método/cartão. Em `PayOrder`, chame um `order.assertCanBePaid()` antes de falar com Payment.
- `cancel` precisa saber se estava PAID para a aplicação estornar. Como devolver essa informação sem a entidade conhecer gateways?

**Passo 4.5: Aplicação: portas do Ordering**

```ts
export interface OrderRepository {
  findById(id: string): Promise<Order | null>
  save(order: Order): Promise<void>
  hasPendingOrdersFor(productId: string): Promise<boolean>   // alimenta o checker do Catalog
}

// Anti-corruption layer: tipos do PONTO DE VISTA do Ordering
export interface CustomerDirectory {
  findById(id: string): Promise<{ id: string; email: string; isVip: boolean } | null>
}

export interface ProductCatalog {
  getForOrder(ids: string[]): Promise<ProductSnapshot[]>      // preço, ativo, estoque, nome
  reserveStock(items: { productId: string; quantity: number }[]): Promise<void>
  releaseStock(items: { productId: string; quantity: number }[]): Promise<void>
}

export interface PaymentProcessor {
  charge(args: { orderTotal: Money; method: string; installments?: number; cardNumber?: string }):
    Promise<{ finalTotal: Money; method: 'PIX' | 'CARD'; installments: number }>
  refund(args: { orderId: string; amount: Money }): Promise<void>
}

export interface OrderNotifier {
  orderCreated(...): Promise<void>
  paymentConfirmed(...): Promise<void>
  orderShipped(...): Promise<void>
  orderCanceled(...): Promise<void>
}

export interface TrackingCodeGenerator { next(): TrackingCode }
```

**Passo 4.6: Aplicação: casos de uso (em ordem de dificuldade)**

1. `GetOrder`
2. `ShipOrder`
3. `CancelOrder`
4. `PayOrder`
5. `CreateOrder` (o mais rico)

Roteiro do `CreateOrder` (preserva a ordem de erros do legado):

```
1. validar forma da entrada (userId, items)                        → 400
2. customer = CustomerDirectory.findById                           → 404
3. por item: quantidade (1..10)                                    → 400
4. products = ProductCatalog.getForOrder; existe? ativo? estoque?  → 404 / 400 / 409
5. OrderPricing.calculate (cupom → frete → mínimo)                 → 403 / 400
6. UnitOfWork.run: reserveStock(...) + orderRepository.save(order)
7. OrderNotifier.orderCreated
8. devolver output (reais)
```

> **Atenção à consistência:** o legado valida estoque e baixa estoque **dentro da mesma transação de escrita**; sua versão lê no passo 4 e reserva no passo 6. Dentro do `UnitOfWork`, a reserva precisa revalidar (o `Product.reserve` já lança `InsufficientStockError`). Registre isso no `DECISOES.md`.

Roteiro do `CancelOrder`:

```
carregar order (404) → order.cancel(now) (409 se SHIPPED/CANCELED)
→ UnitOfWork: releaseStock(itens) + save → se wasPaid: PaymentProcessor.refund
→ notificar → output { id, status }
```

**Passo 4.7: Infraestrutura**

- `SqliteOrderRepository` + `OrderMapper` (tabelas `orders` + `order_items`; salvar o agregado inteiro numa transação).
- **Adaptadores ACL** (`ordering/infrastructure/adapters/`): `IdentityCustomerDirectory`, `CatalogProductCatalog`, `PaymentServiceProcessor`. Eles importam **apenas** o `public-api` dos outros contextos e traduzem os tipos.
- `PendingOrdersCheckerAdapter`: implementa a porta do Catalog usando `OrderRepository.hasPendingOrdersFor`.
- `ConsoleOrderNotifier`, `RandomTrackingCodeGenerator` (`'BR' + número + 'XX'`).

**Passo 4.8: Interface HTTP**

`orderRoutes`: `POST /orders`, `GET /orders/:id`, `POST /orders/:id/pay|ship|cancel`. Cada rota: extrair → **um** caso de uso → responder. Códigos: 201 na criação; 200 nas demais.

**Passo 4.9: Testes**

- **Domínio (unit):** `Order` (cada transição válida e inválida), cupons, `OrderPricing`, `Quantity`.
- **Aplicação (unit com fakes):** `CreateOrder` (feliz, cada erro, estoque reservado, notificação, nada gravado em caso de erro), `PayOrder` (recusa deixa o pedido intacto), `CancelOrder` (estoque devolvido; estorno só quando PAID).
- **Integração:** `SqliteOrderRepository`.

**Checkpoint 4:** `domain/` de Ordering sem imports externos; `application/` só importa domain + portas; caracterização verde com as rotas `/orders` vindas do código novo.

---

## 11. Fase 5: contexto Payment

### 11.1. Responsabilidade

Dado um valor, um método e (se cartão) parcelas e número do cartão: **calcular o valor final**, **validar os dados do método** e **cobrar no gateway**. Ele **não** conhece pedido, nem estado de pedido, nem usuário.

### 11.2. Regras extraídas do legado

| Regra | Camada |
|---|---|
| PIX: valor final = `round(total × 0,95)` | Domínio (política de PIX) |
| CARD: parcelas inteiras entre 1 e 12 (`undefined`/`0` → 1) | Domínio |
| CARD: número do cartão com ≥ 13 caracteres | Domínio |
| CARD: parcelas > 6 → `round(total × 1,03)` | Domínio (política de cartão) |
| Método diferente de PIX/CARD → 400 `metodo de pagamento invalido (PIX ou CARD)` | Domínio |
| Cartão iniciando em `0000` é recusado → 402 `pagamento recusado` | **Infraestrutura** (gateway fake) |
| Estorno | Porta + gateway fake (`console.log`) |

### 11.3. Passo a passo

**Passo 5.1: Domínio:** `PaymentMethod` (`PIX` | `CARD`), `Installments` (VO 1 a 12), `CardNumber` (VO, validação mínima; atenção a não logar o número), e uma **`PaymentPolicy` por método** (Strategy, igual aos cupons):

```ts
export interface PaymentPolicy {
  readonly method: PaymentMethod
  quote(args: { orderTotal: Money; installments?: number }): { finalTotal: Money; installments: number }
}
```

Erros: `InvalidPaymentMethodError`, `InvalidInstallmentsError`, `InvalidCardError` (validation, **400**); `PaymentDeclinedError` (payment_declined, **402**).

**Passo 5.2: Aplicação:** porta `PaymentGateway { authorize(...); refund(...) }`; casos de uso `ProcessPayment` e `RefundPayment`; exponha-os em `payment/public-api.ts`.

Ordem do legado a preservar: validar método → validar parcelas → validar cartão → calcular valor → **só então** gateway (recusa).

**Passo 5.3: Infraestrutura:** `FakePaymentGateway` (recusa se `cardNumber` começa com `0000`; logs `[GATEWAY FAKE]`). O PIX **não** passa pelo gateway no legado: decida se o gateway ignora PIX ou se o caso de uso nem o chama, e registre.

**Passo 5.4: Testes:** políticas isoladas (PIX −5%, 7x +3%, 6x sem juros), validações, `ProcessPayment` com gateway fake que recusa.

> **Reflexão:** quando `PayOrder` (Ordering) recebe `PaymentDeclinedError`, o pedido deve ficar **intacto**. Seu teste de aplicação com fakes precisa provar isso.

**Checkpoint 5:** `PayOrder` usa o Payment pela porta; rota `/orders/:id/pay` verde na caracterização.

---

## 12. Fase 6: contexto Reporting (consulta)

### 12.1. Ideia

Relatório é **leitura**. Não faz sentido carregar agregados `Order` só para somar. Este contexto **não tem `domain/`**: tem uma porta de consulta e um adaptador SQL.

```ts
// reporting/application/ports/sales-report-query.ts
export interface SalesReportQuery {
  totalsByStatus(): Promise<{ status: string; count: number; sumCents: number }[]>
}
```

### 12.2. Passo a passo

1. **Regra de negócio:** "faturamento = pedidos `PAID` + `SHIPPED`" mora no caso de uso `GetSalesReport` (ou numa constante nomeada), não no SQL.
2. **Adaptador:** `SqliteSalesReportQuery` com o `GROUP BY` do legado.
3. **Decisão de compatibilidade:** o legado devolve `porStatus[].soma` em centavos e `faturamento` em reais. Preserve na migração (para a caracterização continuar verde) e corrija em commit separado depois, se quiser.
4. **Teste:** caso de uso com fake da query (quais status entram no faturamento); integração do SQL com dados semeados via repositórios.

**Checkpoint 6:** `/reports/sales` servida pelo novo código; caracterização verde.

---

## 13. Fase 7: interface HTTP e Composition Root

### Passo 7.1. Tradutor central de erros

Um único `setErrorHandler`:

| `DomainError.kind` | Status |
|---|---|
| `validation` | 400 |
| `not_found` | 404 |
| `conflict` | 409 |
| `forbidden` | 403 |
| `payment_declined` | 402 |
| qualquer outra coisa | 500 |

Formato de corpo: `{ error: message }` (igual ao legado). Para erros **inesperados**: responder 500 com mensagem genérica e **logar** o detalhe no servidor. Por que não vazar o erro original?

### Passo 7.2. Plugins por contexto

Cada contexto expõe um plugin: `app.register(identityRoutes, { deps })`. Os contextos não registram rotas uns dos outros.

### Passo 7.3. Composition Root

O **único** arquivo que conhece todas as camadas e todos os contextos:

```ts
// app/composition-root.ts  (esqueleto; você completa)
export function compose(config: AppConfig) {
  const db = openDatabase(config.dbPath)

  // shared
  const clock = new SystemClock()
  const ids = new UuidGenerator()
  const uow = new SqliteUnitOfWork(db)

  // identity
  const userRepo = new SqliteUserRepository(db)
  const registerUser = new RegisterUser(userRepo, new ScryptPasswordHasher(config.passwordPepper), /* ... */)

  // catalog ... payment ...

  // ordering (adaptadores ACL ligam os contextos)
  const customerDirectory = new IdentityCustomerDirectory(identityPublicApi)
  const productCatalog = new CatalogProductCatalog(catalogPublicApi)
  const paymentProcessor = new PaymentServiceProcessor(paymentPublicApi)
  const createOrder = new CreateOrder(/* ports... */)

  return { registerUser, getUser, /* ...todos os casos de uso */ }
}
```

Decida: **injeção manual** (recomendado para aprender). Só considere um contêiner depois de sentir a dor.

### Passo 7.4. `buildApp` e `main`

```ts
// app/build-app.ts
export function buildApp(config: AppConfig): FastifyInstance { /* compose + register plugins + error handler */ }

// main.ts
const config = loadConfig()             // ÚNICO lugar que lê process.env
await buildApp(config).listen({ port: config.port, host: '0.0.0.0' })
```

Os testes e2e passam a usar `buildApp({ dbPath: ':memory:' , ... })` do **código novo**.

**Checkpoint 7:** caracterização verde apontando para `app/build-app.ts` em vez do monolito.

---

## 14. Fase 8: enterrar o monolito

1. Todos os endpoints atendidos pela estrutura nova.
2. Apontar os testes e2e para `buildApp` novo (sem alterar expectativas).
3. `git rm src/server.ts`.
4. Ligar `strict: true` globalmente; zerar os `any`.
5. Rodar o checklist final do *Guia de Mentoria* (seção 9) e `npm run deps:check`.

Commit: `chore: remove legacy monolith`. 🎉

---

## 15. Imposição automática das fronteiras

Regras que não são verificadas **apodrecem**. Use `dependency-cruiser` para falhar o build quando uma fronteira for violada.

```js
// .dependency-cruiser.cjs  (esqueleto de regras)
module.exports = {
  forbidden: [
    { name: 'domain-no-outside', severity: 'error',
      from: { path: '^src/(contexts/[^/]+|shared-kernel)/domain' },
      to:   { pathNot: '^src/(contexts/[^/]+|shared-kernel)/domain|^node:' , dependencyTypesNot: ['type-only'] } },

    { name: 'application-no-infra', severity: 'error',
      from: { path: '^src/contexts/[^/]+/application' },
      to:   { path: 'infrastructure|interface|node_modules/(fastify|better-sqlite3)' } },

    { name: 'no-cross-context-except-public-api', severity: 'error',
      from: { path: '^src/contexts/([^/]+)/' },
      to:   { path: '^src/contexts/(?!\\1)[^/]+/(?!public-api)', } },

    { name: 'no-sql-outside-infra', severity: 'error',
      from: { pathNot: 'infrastructure' },
      to:   { path: 'node_modules/better-sqlite3' } },
  ],
}
```

> Ajuste as expressões regulares ao seu layout real; o aprendizado está em fazer a ferramenta **falhar** de propósito (importe `fastify` no domínio e veja o erro).

---

## 16. Modelo do DECISOES.md

```md
# DECISOES.md

## D-01 · Estoque pertence a Catalog (não a um contexto Inventory)
- **Contexto:** ...
- **Opções:** (a) Catalog, (b) Inventory separado
- **Decisão:** ...
- **Consequências / o que muda se eu mudar de ideia:** ...

## D-02 · Como o Unit of Work lida com better-sqlite3 síncrono
...

## D-03 · Quirks do legado preservados (e por quê)
- Q1 pedido mínimo inclui frete: preservado
- Q2 itens duplicados: ...
...
```

Decisões que **já sabemos** que você vai precisar registrar: D-01 (estoque em Catalog), envio dentro de Ordering, UoW com SQLite, preservar vs. corrigir cada quirk da seção 4.3, `Order` com IDs vs. objetos `Product`, portas síncronas vs. assíncronas, validação de forma (schema Fastify) vs. significado (domínio), onde fica cada adaptador ACL.

---

## 17. Ritmo de trabalho (sessões)

| Sessão | Você faz | Eu faço |
|---|---|---|
| **A** | Fase 0: `buildApp`, helpers, testes reescritos | Reviso a suíte contra a tabela da seção 4; ajudo nos quirks |
| **B** | Fase 1: `Money`, erros, portas compartilhadas | Reviso API do `Money` e testes de arredondamento |
| **C** | Fase 2: Identity completo | Code review; discutimos `Email`/`PlainPassword`/hash |
| **D** | Fase 3: Catalog | Reviso a fronteira `PendingOrdersChecker` |
| **E** | Fase 4: Ordering (pode levar 2 a 3 sessões) | Reviso agregado, estratégias de cupom, `CreateOrder` |
| **F** | Fase 5: Payment | Reviso políticas e ACL |
| **G** | Fase 6 e 7: Reporting + Composition Root | Reviso o error handler e as regras do `dependency-cruiser` |
| **H** | Fase 8 + desafios extras | Retrospectiva e README de portfólio |

**Próximo passo concreto:** Sessão A. Comece pelo Passo 0.1 (`buildApp`) e me traga o `server.ts` resultante e as primeiras asserções reescritas.
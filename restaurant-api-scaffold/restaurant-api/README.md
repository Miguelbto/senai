# Restaurant API

Sistema de Comandas e PDV — **NestJS + Fastify**, DDD + Clean Architecture.

A especificação completa (regras de negócio, decisões técnicas, modelo de
domínio, contrato de API, schema de banco e contrato de front-end) vive em
`restaurant-api-documentacao-completa.md` na raiz do projeto principal — este
repositório implementa exatamente o que está descrito lá.

## Stack

- **Runtime HTTP:** NestJS sobre o adapter do Fastify
- **Banco:** PostgreSQL via Prisma
- **Fila:** BullMQ sobre Redis
- **Auth:** OAuth2 Password Grant (JWT access + refresh)
- **CI/CD:** GitHub Actions
- **Containers:** Docker + Docker Compose

## Rodando localmente

```bash
cp .env.example .env
# edite .env e troque os JWT secrets por valores reais, ex.:
# openssl rand -base64 48

docker compose up --build
```

A API sobe em `http://localhost:3000/api/v1`. Postgres fica exposto em
`5432` e Redis em `6379` para você inspecionar com qualquer client (ex.:
TablePlus, RedisInsight).

## Rodando fora do Docker

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

## Testes

```bash
npm test              # unit + integration
npm run test:e2e      # e2e (precisa de Postgres/Redis rodando)
npm run test:cov      # com cobertura
```

## Estrutura

```
src/
├── modules/<bounded-context>/   # cada contexto do roadmap vira um módulo Nest
├── infrastructure/              # Prisma, fila (BullMQ/Redis)
├── config/                      # env vars validadas com Joi
└── common/                      # filtros/interceptors globais
```

Cada módulo em `src/modules/` está vazio de propósito — é o esqueleto da
Fase 0. O código de domínio entra contexto por contexto, seguindo o roadmap
da documentação, uma issue por use case (veja o template de issue).

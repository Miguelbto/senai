---
name: Use case / Regra de negócio
about: Implementar um use case ou regra de negócio específica
title: "[<Bounded Context>] "
labels: ""
assignees: ""
---

## Bounded Context
<!-- Identity & Access | Floor Management | Menu Catalog | Order Management | Billing & Payments | Audit & Compliance -->

## Regras de negócio envolvidas
<!-- IDs de restaurant-api-documentacao-completa.md, ex.: RN-COM-06, RNF11 -->

## Descrição
<!-- O que este use case faz, em uma ou duas frases -->

## Critérios de aceite
- [ ]
- [ ]
- [ ]

## Fora de escopo nesta issue
<!-- O que deliberadamente NÃO entra aqui, pra não inflar o PR -->

## Checklist técnica
- [ ] Entidade/VO/Agregado de domínio (sem I/O)
- [ ] Teste unitário de domínio (`*.unit.test.ts`)
- [ ] Use case na camada de aplicação
- [ ] Repositório/Controller na infraestrutura
- [ ] Teste de integração (`*.integration.test.ts`) se tocar o banco/fila
- [ ] Teste E2E (`*.e2e.test.ts`) se expuser rota HTTP nova
- [ ] Atualizar a documentação se a regra mudar

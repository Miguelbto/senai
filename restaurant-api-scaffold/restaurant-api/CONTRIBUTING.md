# Contribuindo

Fluxo de trabalho: **uma issue -> uma branch -> um PR**, sempre contra `main`.

## Branches

```
<tipo>/<numero-da-issue>-<slug-curto>
```

Exemplos: `feat/12-abrir-comanda`, `fix/27-concorrencia-pagamento`.

Tipos: `feat`, `fix`, `refactor`, `test`, `chore`, `docs`.

## Commits (Conventional Commits)

```
<tipo>(<contexto>): <descrição curta no imperativo>
```

Exemplos:
- `feat(order-management): implementa RN-COM-06 fechamento de comanda`
- `test(identity): cobre RN-AUTH-04 bloqueio por tentativas falhas`
- `fix(billing): corrige RN-PAG-02 em pagamento com troco`

O `<contexto>` é o bounded context (`identity`, `floor-management`,
`menu-catalog`, `order-management`, `billing`, `audit`) ou `infra` /
`ci` para mudanças transversais.

## Pull Requests

- Referencie a issue (`Closes #12`).
- O CI (lint + testes + build) precisa passar antes do merge.
- PRs grandes demais (tocando mais de um bounded context) são um sinal
  para quebrar a issue em partes menores.

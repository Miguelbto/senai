#!/usr/bin/env bash
# Verifica as REGRAS DE DEPENDÊNCIA entre camadas (Regra da Dependência).
# Uso: bash scripts/check-layers.sh      (sai com código 1 se houver violação)
# É um substituto simples do dependency-cruiser, que entra na Fase 7.

fail=0

check() {
  local description="$1" pattern="$2"; shift 2
  local hits
  hits=$(grep -rnE "$pattern" "$@" 2>/dev/null)
  if [ -n "$hits" ]; then
    echo "❌ $description"
    echo "$hits" | sed 's/^/     /'
    fail=1
  else
    echo "✅ $description"
  fi
}

DOMAIN="src/contexts/*/domain src/shared-kernel/domain"
APPLICATION="src/contexts/*/application src/shared-kernel/application"
INNER="src/contexts/*/domain src/contexts/*/application src/contexts/*/interface src/shared-kernel/domain src/shared-kernel/application src/shared-kernel/interface"

# shellcheck disable=SC2086
check "Domínio não importa pacotes externos (npm ou node:)"          "from ['\"][^.]"                                   $DOMAIN
# shellcheck disable=SC2086
check "Domínio não importa application/infrastructure/interface"      "from '.*/(application|infrastructure|interface)(/|')" $DOMAIN
# shellcheck disable=SC2086
check "Aplicação não importa infrastructure/interface"                "from '.*/(infrastructure|interface)(/|')"         $APPLICATION
# shellcheck disable=SC2086
check "Aplicação não importa Fastify/SQLite"                          "from '(fastify|better-sqlite3)'"                  $APPLICATION
# shellcheck disable=SC2086
check "Nenhum SQLite fora da infraestrutura (e do app/)"              "better-sqlite3"                                   $INNER
# shellcheck disable=SC2086
check "Nenhum SQL (SELECT/INSERT/UPDATE) fora da infraestrutura"      "(SELECT|INSERT INTO|UPDATE) .* (FROM|SET|VALUES)" $INNER

exit $fail

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { Money, InvalidMoneyError } from '../../../src/shared-kernel/domain/money'

/**
 * COMO LER ESTE ARQUIVO
 * Cada tabela abaixo veio de rodar o código do LEGADO. O Money precisa dar
 * exatamente o mesmo resultado, inclusive nos casos "estranhos" (.5, 1.005).
 * Usamos o padrão "table-driven": uma lista de casos + um loop que gera um
 * teste para cada linha.
 */

describe('Money.fromReais (mesma conta do legado: Math.round(reais * 100))', () => {
  const cases: [number, number, string][] = [
    //  reais   centavos  observação
    [19.99, 1999, 'caso comum'],
    [150.5, 15050, 'um decimal só'],
    [19.999, 2000, 'arredonda para cima'],
    [0.07, 7, '0.07 * 100 = 7.000000000000001'],
    [1.005, 100, 'QUIRK: 1.005 * 100 = 100.49999..., o legado perde 1 centavo'],
    [8.675, 868, '8.675 * 100 = 867.5000000000001, arredonda para cima'],
  ]

  for (const [reais, cents, note] of cases) {
    it(`${reais} reais → ${cents} centavos (${note})`, () => {
      assert.equal(Money.fromReais(reais).toCents(), cents)
    })
  }
})

describe('Money.multiplyByRate (mesma conta do legado: Math.round(cents * rate))', () => {
  const cases: [number, number, number, string][] = [
    //  centavos  taxa   esperado  observação
    [11990, 0.95, 11391, 'PIX: 11390.5 arredonda PARA CIMA (caso do relatório)'],
    [20000, 0.95, 19000, 'PIX em R$ 200,00'],
    [10990, 0.95, 10441, 'PIX: outro caso .5'],
    [20000, 1.03, 20600, 'cartão acima de 6x'],
    [11990, 1.03, 12350, 'cartão: 12349.7 arredonda para cima'],
    [19999, 0.1, 2000, 'PROMO10'],
    [5, 0.1, 1, 'meio exato (0.5) sobe'],
    [15, 0.1, 2, 'meio exato (1.5) sobe'],
    [25, 0.1, 3, 'meio exato (2.5) sobe'],
    [19999, 0.2, 4000, 'VIP20'],
  ]

  for (const [cents, rate, expected, note] of cases) {
    it(`${cents} × ${rate} = ${expected} (${note})`, () => {
      assert.equal(Money.fromCents(cents).multiplyByRate(rate).toCents(), expected)
    })
  }

  it('rejeita taxa negativa, NaN e Infinity', () => {
    const m = Money.fromCents(100)
    assert.throws(() => m.multiplyByRate(-0.1), InvalidMoneyError)
    assert.throws(() => m.multiplyByRate(NaN), InvalidMoneyError)
    assert.throws(() => m.multiplyByRate(Infinity), InvalidMoneyError)
  })
})

describe('Money: soma e subtração', () => {
  it('soma frete e subtotal sem erro de ponto flutuante: 1990 + 18000 = 19990', () => {
    const total = Money.fromCents(18000).add(Money.fromCents(1990))
    assert.equal(total.toCents(), 19990)
  })

  it('subtrai desconto do subtotal: 20000 - 2000 = 18000', () => {
    assert.equal(Money.fromCents(20000).subtract(Money.fromCents(2000)).toCents(), 18000)
  })

  it('subtração que daria negativo lança InvalidMoneyError', () => {
    assert.throws(
      () => Money.fromCents(100).subtract(Money.fromCents(101)),
      InvalidMoneyError,
    )
  })

  it('subtrair o mesmo valor resulta em zero', () => {
    assert.equal(Money.fromCents(500).subtract(Money.fromCents(500)).toCents(), 0)
  })
})

describe('Money: comparações (regras do frete grátis e do pedido mínimo)', () => {
  const threshold = Money.fromCents(20000) // R$ 200,00

  it('19999 centavos NÃO atinge o limite do frete grátis', () => {
    assert.equal(Money.fromCents(19999).isGreaterOrEqual(threshold), false)
  })

  it('20000 centavos atinge o limite (>= e não >)', () => {
    assert.equal(Money.fromCents(20000).isGreaterOrEqual(threshold), true)
  })

  it('isLessThan: 999 < 1000 (pedido mínimo de R$ 10,00)', () => {
    assert.equal(Money.fromCents(999).isLessThan(Money.fromCents(1000)), true)
    assert.equal(Money.fromCents(1000).isLessThan(Money.fromCents(1000)), false)
  })

  it('equals compara por VALOR, não por referência', () => {
    const a = Money.fromCents(1000)
    const b = Money.fromCents(1000)
    assert.notEqual(a, b)        // objetos diferentes na memória...
    assert.ok(a.equals(b))       // ...mas o MESMO dinheiro
    assert.equal(a.equals(Money.fromCents(1001)), false)
  })
})

describe('Money: conversões', () => {
  it('toReais divide por 100 (como o legado responde na API)', () => {
    assert.equal(Money.fromCents(19990).toReais(), 199.9)
    assert.equal(Money.fromCents(11391).toReais(), 113.91)
  })

  it('zero() vale 0 centavos', () => {
    assert.equal(Money.zero().toCents(), 0)
  })

  it('nunca vaza -0', () => {
    assert.equal(Money.fromCents(-0).toCents(), 0) // assert strict usa Object.is: -0 falharia
  })
})

describe('Money: imutabilidade', () => {
  it('operações devolvem um objeto novo e não alteram o original', () => {
    const original = Money.fromCents(1000)
    const sum = original.add(Money.fromCents(500))
    const discounted = original.multiplyByRate(0.5)

    assert.equal(original.toCents(), 1000)
    assert.equal(sum.toCents(), 1500)
    assert.equal(discounted.toCents(), 500)
  })
})

describe('Money: entradas inválidas (Value Object sempre válido)', () => {
  const invalidCents = [1.5, NaN, Infinity, -Infinity, -1, Number.MAX_SAFE_INTEGER + 1]

  for (const value of invalidCents) {
    it(`fromCents(${value}) lança InvalidMoneyError`, () => {
      assert.throws(() => Money.fromCents(value), InvalidMoneyError)
    })
  }

  it('fromReais(NaN) e fromReais(Infinity) lançam InvalidMoneyError', () => {
    assert.throws(() => Money.fromReais(NaN), InvalidMoneyError)
    assert.throws(() => Money.fromReais(Infinity), InvalidMoneyError)
  })

  it('o erro tem a categoria "validation" (vira HTTP 400 na Fase 7)', () => {
    try {
      Money.fromCents(-1)
      assert.fail('deveria ter lançado')
    } catch (error) {
      assert.ok(error instanceof InvalidMoneyError)
      assert.equal(error.kind, 'validation')
    }
  })
})

import { DomainError } from './domain-error'

export class InvalidMoneyError extends DomainError {
    readonly kind = 'validation' as const
}


export class Money {
    private constructor(private readonly cents: number) {}

    static fromCents(cents: number): Money {
        if (!Number.isSafeInteger(cents)) {
            throw new InvalidMoneyError('valor em centavos deve ser um numero inteiro')
        }

        if (cents < 0 ) {
            throw new InvalidMoneyError('valor monetario não pode ser negativo')
        }

        return new Money(cents === 0 ? 0 : cents)
    }


    static fromReais(reais: number): Money {
        if (!Number.isFinite(reais)) {
            throw new InvalidMoneyError('valor em reais deve ser um numero valido')
        }

        return Money.fromCents(Math.round(reais * 100))
    }


    static zero(): Money {
        return Money.fromCents(0)
    }
    

    add(other: Money): Money {
        return Money.fromCents(this.cents + other.cents)
    }

    //lança erro se o resultado for negativo(invariante: dinheiro não pode ser negativo)
    subtract(other: Money): Money {
        if (other.cents > this.cents) {
            throw new InvalidMoneyError('subtracao resultaria em valor negativo')
        }

        return Money.fromCents(this.cents - other.cents)
    }

    
  /**
   * Multiplica por uma taxa e arredonda, como o legado:
   *   desconto PROMO10:  Math.round(subtotal * 0.1)
   *   desconto PIX:      Math.round(total * 0.95)
   *   juros do cartão:   Math.round(total * 1.03)
   *
   * Exemplo do `.5`: 11990 * 0.95 = 11390.5 → Math.round → 11391
   * (Math.round arredonda o "meio" sempre PARA CIMA.)
   */
  multiplyByRate(rate: number): Money {
    if (!Number.isFinite(rate) || rate < 0) {
        throw new InvalidMoneyError('taxa deve ser um numero finito e não negativo')
    }

    return Money.fromCents(Math.round(this.cents * rate))
  }

  // -------------------------------------------------------------
  //  COMPARAÇÕES
  // -------------------------------------------------------------

  equals(other: Money): boolean {
    return this.cents === other.cents
  }

  isLessThan(other: Money): boolean {
    return this.cents < other.cents
  }

  /** Usado na regra do frete grátis: subtotal - desconto >= R$ 200,00. */
  isGreaterOrEqual(other: Money): boolean {
    return this.cents >= other.cents
  }

  
  // -------------------------------------------------------------
  //  SAÍDAS (a conversão para o mundo externo acontece aqui)
  // -------------------------------------------------------------

  // Para persistir no banco 
  toCents(): number {
    return this.cents
  }

  // Para responder na API
  toReais(): number {
    return this.cents / 100
  }

}
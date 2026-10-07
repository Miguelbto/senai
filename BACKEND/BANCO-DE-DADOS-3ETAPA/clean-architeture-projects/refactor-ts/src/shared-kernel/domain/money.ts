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
        
    }


    static zero(): Money {}
    

    add(other: Money): Money
}
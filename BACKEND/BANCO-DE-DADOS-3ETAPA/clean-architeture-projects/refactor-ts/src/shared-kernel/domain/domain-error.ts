
export type ErrorKind = 
    | 'validation'
    | 'not_found'
    | 'conflict'
    | 'forbidden'
    | 'payment_declined'

/**
 * `abstract` = ninguém pode fazer `new DomainError()`. Só dá para criar
 * erros concretos (ex.: InvalidMoneyError) que ESCOLHEM seu `kind`.
 */

export abstract class DomainError extends Error {
    /* cada subclasse é obrigada a declarar sua categoria */
    abstract readonly kind: ErrorKind

    constructor(message: string) {
        super(message)
        // `new.target` é "a classe que foi realmente instanciada".
        // Assim, new InvalidMoneyError(...).name === 'InvalidMoneyError'
        // (sem isso, o nome apareceria sempre como 'Error' nos logs).
        this.name = new.target.name
    }
}
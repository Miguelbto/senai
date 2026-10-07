import { WeakPasswordError } from './errors'

export const MIN_PASSWORD_LENGTH = 6

/**
 * Value Object: senha EM TEXTO PURO, no instante em que o usuário a digita.
 *
 * A regra "mínimo 6 caracteres" é de NEGÓCIO (mora aqui, no domínio).
 * O HASH da senha é detalhe TÉCNICO (mora na infraestrutura, veja PasswordHasher).
 *
 * SEGURANÇA: uma PlainPassword nunca deve aparecer em log nem em JSON.
 * Por isso toString/toJSON devolvem um texto fixo. Se alguém escrever
 * `console.log(\`senha: ${password}\`)` por descuido, nada vaza.
 * O único jeito de ver o valor é chamar `reveal()` de propósito (quem faz isso
 * é o hasher, e só ele).
 */

export class PlainPassword {
    private constructor(private readonly raw: string) {}

    static create(raw: unknown): PlainPassword {
        if (typeof raw !== 'string'  || raw.length < MIN_PASSWORD_LENGTH) {
            throw new WeakPasswordError(MIN_PASSWORD_LENGTH)
        }

        return new PlainPassword(raw)
    }

    /** Nome longo e explícito de propósito: chamá-lo deve chamar atenção na revisão de código. */
    reveal(): string {
        return this.raw
    }

    toString(): string {
        return '[PROTECTED]'
    }

    toJSON(): string {
        return '[PROTECTED]'
    }
}
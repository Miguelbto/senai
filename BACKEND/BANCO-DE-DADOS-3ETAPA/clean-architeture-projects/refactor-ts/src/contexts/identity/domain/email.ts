import { InvalidEmailError } from './errors'

/**
 * Value Object: e-mail.
 *
 * Duas responsabilidades que no legado estavam espalhadas pela rota:
 *   1. VALIDAR: precisa conter '@' e '.' (regra simples do legado; "a@b" é inválido,
 *      "@." seria aceito: quirk preservado).
 *   2. NORMALIZAR: guardar sempre em minúsculas. Assim "MIGUEL@X.COM" e
 *      "miguel@x.com" viram o MESMO e-mail (é isso que gera o 409 de duplicado).
 *
 * Nota: o e-mail como o usuário DIGITOU (com maiúsculas) se perde aqui. O legado
 * usa o texto original no log de boas-vindas; veja RegisterUser para ver como
 * isso é preservado.
 */

export class Email {
    private constructor(readonly value: string) {}

    static create(raw: unknown): Email {
        if (typeof raw !== 'string' || !raw.includes('@') || !raw.includes('.')) {
            throw new InvalidEmailError()
        }

        return new Email(raw.toLowerCase())
    }

    equals(other: Email): boolean {
        return this.value === other.value
    }

    toString(): string {
        return this.value
    }
}
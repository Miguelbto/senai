import { InvaliduserNameError } from './errors'

/** Número mágico do legado (`name.length < 2`) agora tem NOME. */
export const MIN_NAME_LENGTH = 2

/**
 * Value Object: nome do usuário.
 *
 * Por que um VO para algo tão simples? Porque a REGRA ("pelo menos 2
 * caracteres") passa a morar num único lugar, e um UserName existente é
 * garantidamente válido. Quem recebe um UserName não precisa revalidar.
 *
 * QUIRK PRESERVADO: o legado NÃO faz trim. Então '  ' (2 espaços) é um nome
 * aceito. Está coberto por teste; corrigir é decisão de um commit separado.
 */

export class UserName {
    private constructor(readonly value: string) {}

    static create(raw: unknown): UserName {
        // `typeof` protege contra valores que não são texto (a API recebe JSON de qualquer jeito).

        if(typeof raw !== 'string' || raw.length < MIN_NAME_LENGTH){
            throw new InvaliduserNameError()
        }

        return new UserName(raw)
    }

    toString(): string {
        return this.value
    }
}
import { Email } from './email'
import { PasswordHash } from './password-hash'
import { UserName } from './user-name'

export interface UserProps {
    id: string;
    name: UserName;
    email: Email;
    passwordHash: PasswordHash;
    isVip: boolean;
    createdAt: Date;
}
    
    /**
 * ============================================================
 *  Entidade: User
 * ============================================================
 * Diferença para um Value Object: a ENTIDADE tem IDENTIDADE (o id). Dois usuários
 * com mesmo nome e e-mail, mas ids diferentes, são pessoas diferentes.
 *
 * Os dados já chegam VALIDADOS porque são Value Objects (UserName, Email, ...).
 * Então a entidade não repete regra: ela confia nos tipos.
 *
 * DOIS CAMINHOS DE CRIAÇÃO (ideia central do guia):
 *   - register():  usuário NOVO no sistema. Recebe `now` e define createdAt.
 *   - rehydrate(): usuário que JÁ EXISTIA e veio do banco. Recebe tudo pronto.
 *   Hoje fazem quase o mesmo, mas são portas distintas: amanhã `register` pode
 *   ganhar regras de "criação" (ex.: registrar evento de domínio) que NÃO podem
 *   rodar ao reconstruir um usuário antigo.
 *
 * HONESTIDADE SOBRE "MODELO ANÊMICO": hoje User tem pouco comportamento porque o
 * legado quase não tem regra sobre usuário (só validações, que já estão nos VOs).
 * Isso é aceitável. O risco (erro #1 da lista do guia) aparece quando regra de
 * negócio vaza para os casos de uso. Aqui não há regra para vazar.
 */

export class User {
    private constructor(private readonly props: UserProps) {}

    static register(input: {
        id: string
        name: UserName
        email: Email
        passwordHash: PasswordHash
        isVip: boolean
        now: Date
    }): User {

        return new User({
            id: input.id,
            name: input.name,
            email: input.email,
            passwordHash: input.passwordHash,
            isVip: input.isVip,
            createdAt: input.now
        })
    }

    static rehydrate(props: UserProps): User {
        return new User({...props})
    } 

    get id(): string {
        return this.props.id
    }

    get name(): UserName {
        return this.props.name
    }

    get email(): Email {
        return this.props.email
    }

    get passwordHash(): PasswordHash {
        return this.props.passwordHash
    }

    get isVip(): boolean {
        return this.props.isVip
    }

    /** Devolve uma CÓPIA: Date é mutável, e não queremos que alguém altere o interno. */
    get createdAt(): Date {
        return new Date(this.props.createdAt)
    }
}
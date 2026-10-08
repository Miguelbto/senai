import { Email } from '../domain/email'
import { PasswordHash } from '../domain/password-hash'
import { User } from '../domain/user'
import { UserName } from '../domain/user-name'

/**
 * A linha da tabela, EXATAMENTE como o banco a entrega:
 *   snake_case, booleano como 0/1, data como texto.
 */

export interface UserRow {
    id: string;
    name: string;
    email: string;
    password: string;
    is_vip: number;
    created_at: string;
}

/**
 * MAPPER: o tradutor entre dois mundos que NÃO devem se misturar.
 *
 *   Mundo do banco:   { is_vip: 1, created_at: '2026-...' }
 *   Mundo do domínio: User { isVip: true, createdAt: Date }
 *
 * Fica na infraestrutura porque só ela conhece o formato do banco. O domínio
 * nunca vê `is_vip`. Isolar a tradução aqui é o que permite mudar o esquema (ou
 * o banco) sem tocar em entidades.
 */

export const UserMapper = {

    /* Entidade -> Linha (para gravar) */
    toRow(user: User): UserRow {
        return {
            id: user.id,
            name: user.name.value,
            email: user.email.value,
            password: user.passwordHash.value,
            is_vip: user.isVip ? 1 : 0,
            created_at: user.createdAt.toISOString(),
        }
    },

    /* Linha -> entidade (para ler). Usa `rehydrate`: é um usuario que JÁ existia. */
    toDomain(row: UserRow): User {
        return User.rehydrate({
            id: row.id,
            name: UserName.create(row.name),
            email: Email.create(row.email),
            passwordHash: PasswordHash.fromHashed(row.password),
            isVip: row.is_vip === 1,
            createdAt: new Date(row.created_at)
        })
    }
}
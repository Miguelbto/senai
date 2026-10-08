import type Database from 'better-sqlite3'
import type { UserRepository } from '../application/ports/user-repository'
import type { Email } from '../domain/email'
import { EmailAlreadyRegisteredError } from '../domain/errors'
import type { User } from '../domain/user'
import { UserMapper, type UserRow } from './user-mapper'

/**
 * ADAPTADOR: implementa a porta UserRepository com SQLite.
 *
 * É AQUI (e só aqui, neste contexto) que aparece SQL. Ele faz duas coisas:
 *   1. executar o SQL;
 *   2. traduzir linha ⇄ entidade (via UserMapper).
 *
 * Os métodos são `async` para respeitar o contrato da porta (que serve para
 * qualquer banco, inclusive os assíncronos), mesmo o better-sqlite3 sendo síncrono.
 *
 * O `db` chega pelo construtor: a MESMA conexão será compartilhada com o
 * SqliteUnitOfWork, senão o BEGIN/COMMIT não cobriria as escritas deste repositório.
 */

export class SqliteUserRepository implements UserRepository {
    constructor(private readonly db: Database.Database) { }

    async findById(id: string): Promise<User | null> {
        const row = this.db.prepare('SELECT * FROM users WHERE id = ?').get(id) as UserRow | undefined

        return row ? UserMapper.toDomain(row) : null
    }

    async existsByEmail(email: Email): Promise<boolean> {
        // O e-mail já chega normalizado (minúsculo) porque é um Value Object.
        const row = this.db.prepare('SELECT id FROM users WHERE email = ?').get(email.value)

        return row !== undefined
    }

    async save(user: User): Promise<void> {
        const row = UserMapper.toRow(user)
        try {
            // Upsert pelo id: cria se não existe, atualiza se existe.
            this.db.prepare(`INSERT INTO users (id, name, email, password, is_vip, created_at)
           VALUES (@id, @name, @email, @password, @is_vip, @created_at)
           ON CONFLICT(id) DO UPDATE SET
             name = excluded.name,
             email = excluded.email,
             password = excluded.password,
             is_vip = excluded.is_vip`,
            )
                .run(row)
        } catch (error) {
            // SEGUNDA LINHA DE DEFESA. O caso de uso já checou `existsByEmail`, mas entre
            // a checagem e o INSERT outra requisição pode ter gravado o mesmo e-mail
            // (condição de corrida). A restrição UNIQUE do banco é quem barra de verdade.
            // Aqui TRADUZIMOS o erro técnico do SQLite para o erro de DOMÍNIO.
            if (isUniqueViolation(error)) {
                throw new EmailAlreadyRegisteredError()
            }
        }
    }

}

function isUniqueViolation(error: unknown): boolean {
    return (
        typeof error === 'object' &&
        error !== null &&
        (error as { code?: unknown }).code === 'SQLITE_CONSTRAINT_UNIQUE'
    )
}
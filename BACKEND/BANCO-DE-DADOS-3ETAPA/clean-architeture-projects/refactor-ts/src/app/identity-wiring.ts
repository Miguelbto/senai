import type Database from 'better-sqlite3'
import { GetUser } from '../contexts/identity/application/use-cases/get-user'
import { GetCustomerSnapshot } from '../contexts/identity/application/use-cases/get-customer-snapshot'
import { RegisterUser } from '../contexts/identity/application/use-cases/register-user'
import { ConsoleWelcomeNotifier } from '../contexts/identity/infrastructure/console-welcome-notifier'
import { Sha256PasswordHasher } from '../contexts/identity/infrastructure/sha256-password-hasher'
import { SqliteUserRepository } from '../contexts/identity/infrastructure/sqlite-user-repository'
import { SystemClock } from '../shared-kernel/infrastructure/system-clock'
import { UuidIdGenerator } from '../shared-kernel/infrastructure/uuid-id-generator'

/**
 * "FIAÇÃO" PROVISÓRIA do contexto Identity.
 *
 * Este é o único tipo de lugar que conhece TODAS as camadas ao mesmo tempo:
 * escolhe os adaptadores concretos e os injeta nos casos de uso.
 *
 * Por enquanto só existe a fiação de Identity (o resto ainda é o monolito).
 * Na Fase 7 estas funções se juntam num único composition-root.ts.
 *
 * Aceita o `db` pronto: assim ele usa a MESMA conexão do legado e os testes
 * podem passar um banco :memory:.
 */

export function wireIdentity(db: Database.Database, options: { passwordSecret: string }) {
    const users = new SqliteUserRepository(db)
    const hasher = new Sha256PasswordHasher(options.passwordSecret)
    const notifier = new ConsoleWelcomeNotifier()
    const ids = new UuidIdGenerator()
    const clock = new SystemClock()

    return {
        registerUser: new RegisterUser(users, hasher, notifier, ids, clock),
        getUser: new GetUser(users),
        // Para o contexto Ordering (fase 4):
        GetCustomerSnapshot: new GetCustomerSnapshot(users),
    }
}
import type { UserRepository } from '../../../src/contexts/identity/application/ports/user-repository'
import type { Email } from '../../../src/contexts/identity/domain/email'
import { EmailAlreadyRegisteredError } from '../../../src/contexts/identity/domain/errors'
import type { User } from '../../../src/contexts/identity/domain/user'

/**
 * DUBLÊ (fake): um repositório que guarda tudo num Map, sem banco nenhum.
 * É o que permite testar os casos de uso em milissegundos.
 *
 * Ele imita o comportamento do real: e-mail de OUTRO usuário → EmailAlreadyRegisteredError.
 */
export class InMemoryUserRepository implements UserRepository {
    private readonly store = new Map<string, User>()

    async findById(id: string): Promise<User | null> {
        return this.store.get(id) ?? null
    }

    async existsByEmail(email: Email): Promise<boolean> {
        return [...this.store.values()].some((u) => u.email.equals(email))
    }

    async save(user: User): Promise<void> {
        const clash = [...this.store.values()].some((u) => u.id !== user.id && u.email.equals(user.email))
        if (clash) throw new EmailAlreadyRegisteredError()
        this.store.set(user.id, user)
    }

    // ---- ajudantes só para os testes (não fazem parte da porta) ----
    get all(): User[] {
        return [...this.store.values()]
    }
}

import type { Email } from '../../domain/email'
import type { User } from '../../domain/user'

/**
 * PORTA: o que os casos de uso de Identity precisam saber sobre persistência.
 *
 * Repare que NÃO é um CRUD genérico (create/read/update/delete). São só as
 * operações que os casos de uso REALMENTE usam. Se ninguém precisa de
 * `deleteById`, ele não existe. Contrato pequeno = adaptador fácil de escrever
 * e de trocar.
 *
 * Note também os tipos: recebe e devolve objetos de DOMÍNIO (User, Email), nunca
 * linhas de banco. A tradução é problema do adaptador.
 */

export  interface UserRepository {
    findById(id: string): Promise<User | null>
    existsByEmail(email: Email): Promise<boolean>
    /** Grava (cria ou atualiza). Lança EmailAlreadyRegisteredError se o e-mail já pertencer a OUTRO usuário. */
    save(user: User): Promise<void>
}
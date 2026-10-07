import { UserNotFoundError } from '../../domain/errors'
import type { UserOutput } from '../dto/user-output.dto'
import type { UserRepository } from '../ports/user-repository'

/** Caso de uso: Consultar usuário. Note que o hash NUNCA entra na saída. */

export class GetUser {
    constructor (private readonly users: UserRepository) {}

    async execute(id: string): Promise<UserOutput> {
        const user = await this.users.findById(id)
        if(!user) {
            throw new UserNotFoundError()
        }

        return {
            id: user.id,
            name: user.name.value,
            email: user.email.value,
            isVip: user.isVip,
            createdAt: user.createdAt.toISOString(),
        }
    }
}
import type { UserRepository } from '../ports/user-repository'

/**
 * A visão de Identity sobre "um usuário que compra": o MÍNIMO que outros
 * contextos podem saber. Sem senha, sem hash, sem data de criação.
 */

export interface CustomerSnapshot {
    id: string;
    email: string;
    isVip: boolean;
}

/**
 * Caso de uso INTERNO (não tem rota HTTP).
 *
 * Existe por causa de uma FRONTEIRA entre contextos: o contexto Ordering precisa
 * saber se o comprador é VIP (cupom VIP20) e qual o e-mail dele. Ordering NÃO pode
 * ler a tabela `users`, então pede a Identity por este caso de uso (exposto no
 * public-api.ts).
 *
 * Devolve `null` (e não lança erro) porque "quem decide que isso é um 404" é o
 * contexto que pergunta, não o que responde.
 */

export class GetCustomerSnapshot {
    constructor(private readonly users: UserRepository) {}

    async execute(id: string): Promise<CustomerSnapshot | null> {
        const user = await this.users.findById(id)
        if(!user) return null

        return { id: user.id, email: user.email.value, isVip: user.isVip }
    }
}
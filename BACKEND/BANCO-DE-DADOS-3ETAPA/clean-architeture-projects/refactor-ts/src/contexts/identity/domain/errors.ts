import { Domain } from 'domain';
import { DomainError } from '../../../shared-kernel/domain/domain-error'

/**
 * ============================================================
 *  Erros do contexto Identity
 * ============================================================
 * Cada erro nasce de UMA regra de negócio quebrada. As mensagens são EXATAMENTE
 * as do legado ('nome invalido', 'email ja cadastrado'...), assim os testes de
 * caracterização continuam verdes sem nenhuma tradução extra.
 *
 * Repare: nenhum erro sabe o que é HTTP. Quem converte `kind` → status é a
 * camada de interface (shared-kernel/interface/http/domain-error-handler.ts).
 */

export class InvaliduserNameError extends DomainError {
    readonly kind = 'validation' as const // 400
    constructor() {
        super('nome invalido')
    }
}

export class InvalidEmailError extends DomainError {
    readonly kind = 'validation' as const // 400
    constructor() {
        super('email invalido')
    }
}

export class WeakpasswordError extends DomainError {
    readonly kind = 'validation' as const // 400
    constructor(minLenght: number) {
        super(`senha deve ter no minimo ${minLenght} caracteres`)
    }
}

export class EmailAlreadyRegisteredError extends DomainError {
    readonly kind = 'validation' as const // 409
    constructor(){
        super('email ja cadastrado')
    }
}

export class UserNotFoundError extends DomainError {
    readonly kind = 'validation' as const // 404
    constructor() {
        super('usuario nao encontrado')
    }
}
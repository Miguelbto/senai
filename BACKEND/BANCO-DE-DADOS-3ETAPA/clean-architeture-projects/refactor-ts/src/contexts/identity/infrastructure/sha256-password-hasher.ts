import { createHash } from 'node:crypto'
import type { PasswordHasher } from '../application/ports/password-hasher'
import { PasswordHash } from '../domain/password-hash'
import type { PlainPassword } from '../domain/plain-password'

/**
 * Hasher COMPATÍVEL COM O LEGADO: sha256(senha + segredo).
 *
 * É o MESMO algoritmo do server.ts, só que agora vive num adaptador e o
 * `segredo` chega pelo construtor (e não mais escrito dentro do código).
 *
 * ⚠️ Este algoritmo é FRACO de propósito (é o ponto de partida do exercício):
 *   - sha256 é rápido demais: quem vaza o banco testa bilhões de senhas por segundo;
 *   - o segredo é um só para todos, e não há "salt" por usuário.
 * Ele existe para o PASSO 1: mover sem mudar comportamento. A correção é o
 * ScryptPasswordHasher, num commit separado (PASSO 2).
 */

export class Sha256PasswordHasher implements PasswordHasher {
    constructor(private readonly secret: string) { }

    async hash(plain: PlainPassword): Promise<PasswordHash> {
        const digest = createHash('sha256')
            .update(plain.reveal() + this.secret)
            .digest('hex')

        return PasswordHash.fromHashed(digest)
    }
}

import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import type { PasswordHasher } from '../application/ports/password-hasher'
import { PasswordHash } from '../domain/password-hash'
import type { PlainPassword } from '../domain/plain-password'

// `scrypt` do Node usa callback; promisify transforma em Promise (para usar com await).

const scryptAsync = promisify(scrypt) as (
    password: string,
    salt: Buffer,
    keylength: number,
) => Promise<Buffer>

const SALT_BYTES = 16
const KEY_BYTES = 64

/**
 * Hasher SEGURO (a correção do ponto fraco do legado).
 *
 * O que muda em relação ao sha256:
 *   - SALT ALEATÓRIO POR USUÁRIO: duas pessoas com a mesma senha geram hashes
 *     DIFERENTES. Quem vazar o banco não consegue atacar todos de uma vez.
 *   - scrypt é PROPOSITALMENTE LENTO e gasta memória: cada tentativa de adivinhar
 *     uma senha custa caro para o atacante.
 *   - Sem segredo "global" escrito no código.
 *
 * Formato guardado:  scrypt$<salt em hex>$<chave em hex>
 * O prefixo "scrypt$" deixa o hash AUTODESCRITIVO. Quando existir login, você
 * saberá que um hash sem esse prefixo é do algoritmo antigo (sha256) e poderá
 * migrar os usuários aos poucos.
 */

export class ScryptPasswordHasher implements PasswordHasher {
    async hash(plain: PlainPassword): Promise<PasswordHash> {
        const salt = randomBytes(SALT_BYTES)
        const key = await scryptAsync(plain.reveal(), salt, KEY_BYTES)
        return PasswordHash.fromHashed(`scrypt$${salt.toString('hex')}$${key.toString('hex')}`)
    }

    /**
   * Ainda ninguém chama isto (não há login). Está aqui para você ver o outro lado
   * da moeda: para conferir uma senha, refaz-se o hash COM O MESMO SALT e compara-se.
   * `timingSafeEqual` compara em tempo constante (evita descobrir a senha pelo
   * tempo de resposta).
   */

    async verify(plain: PlainPassword, stored: PasswordHash): Promise<boolean> {
        const [scheme, saltHex, keyHex] = stored.value.split('$')

        if (scheme !== 'scrypt' || !saltHex || !keyHex) return false

        const expected = Buffer.from(keyHex, 'hex')
        const actual = await scryptAsync(plain.reveal(), Buffer.from(saltHex, 'hex'), expected.length)

        return expected.length === actual.length && timingSafeEqual(expected, actual)
    }
}
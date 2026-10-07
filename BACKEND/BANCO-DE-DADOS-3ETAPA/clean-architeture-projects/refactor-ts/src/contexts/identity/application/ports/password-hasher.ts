import type { PasswordHash } from '../../domain/password-hash'
import type { PlainPassword } from '../../domain/plain-password'

/**
 * PORTA: "proteger uma senha".
 *
 * A Aplicação diz O QUE precisa (transformar PlainPassword em PasswordHash).
 * COMO (sha256? scrypt? argon2?) é decisão da infraestrutura, e pode mudar sem
 * tocar em nenhum caso de uso.
 *
 * Os tipos da assinatura já impedem o erro clássico: não dá para passar um
 * PasswordHash aqui (hash de hash), nem receber um PlainPassword de volta.
 */

export interface PasswordHasher {
    hash(plain: PlainPassword): Promise<PasswordHash>
}
import type { PasswordHasher } from '../../../src/contexts/identity/application/ports/password-hasher'
import { PasswordHash } from '../../../src/contexts/identity/domain/password-hash'
import type { PlainPassword } from '../../../src/contexts/identity/domain/plain-password'

/** Hash "de mentira" e previsível: 'hashed:<senha>'. Permite asserções simples. */
export class FakePasswordHasher implements PasswordHasher {
    calls = 0

    async hash(plain: PlainPassword): Promise<PasswordHash> {
        this.calls++
        return PasswordHash.fromHashed('hashed:' + plain.reveal())
    }
}

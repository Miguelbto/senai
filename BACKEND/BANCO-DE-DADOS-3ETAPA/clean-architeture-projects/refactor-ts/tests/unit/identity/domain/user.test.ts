import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { Email } from '../../../../src/contexts/identity/domain/email'
import { PasswordHash } from '../../../../src/contexts/identity/domain/password-hash'
import { PlainPassword } from '../../../../src/contexts/identity/domain/plain-password'
import { User } from '../../../../src/contexts/identity/domain/user'
import { UserName } from '../../../../src/contexts/identity/domain/user-name'

const base = () => ({
    id: 'u-1',
    name: UserName.create('Miguel'),
    email: Email.create('miguel@x.com'),
    passwordHash: PasswordHash.fromHashed('hash'),
    isVip: true,
})

describe('User', () => {
    it('register define createdAt com o `now` recebido (o domínio não olha o relógio)', () => {
        const now = new Date('2026-01-02T03:04:05.000Z')
        const user = User.register({ ...base(), now })

        assert.equal(user.id, 'u-1')
        assert.equal(user.name.value, 'Miguel')
        assert.equal(user.email.value, 'miguel@x.com')
        assert.equal(user.isVip, true)
        assert.equal(user.createdAt.toISOString(), '2026-01-02T03:04:05.000Z')
    })

    it('rehydrate reconstrói um usuário existente com o createdAt original', () => {
        const user = User.rehydrate({ ...base(), createdAt: new Date('2020-05-05T00:00:00.000Z') })
        assert.equal(user.createdAt.toISOString(), '2020-05-05T00:00:00.000Z')
    })

    it('createdAt devolve cópia: mexer no Date retornado não altera o usuário', () => {
        const user = User.register({ ...base(), now: new Date('2026-01-01T00:00:00.000Z') })
        user.createdAt.setFullYear(1999)
        assert.equal(user.createdAt.getFullYear(), 2026)
    })

    it('o COMPILADOR impede gravar senha em texto puro no lugar do hash', () => {
        User.register({
            ...base(),
            // @ts-expect-error PlainPassword não é PasswordHash: isto NÃO compila (e o teste prova isso)
            passwordHash: PlainPassword.create('secret1'),
            now: new Date(),
        })
    })
})

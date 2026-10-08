import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { PlainPassword } from '../../../src/contexts/identity/domain/plain-password'
import { ScryptPasswordHasher } from '../../../src/contexts/identity/infrastructure/scrypt-password-hasher'
import { Sha256PasswordHasher } from '../../../src/contexts/identity/infrastructure/sha256-password-hasher'

describe('Sha256PasswordHasher (compatível com o legado)', () => {
    it('gera EXATAMENTE o mesmo hash que o server.ts legado: sha256(senha + segredo)', async () => {
        // Valor calculado com o código do legado: createHash('sha256').update('secret1' + 'segredo123')
        const hash = await new Sha256PasswordHasher('segredo123').hash(PlainPassword.create('secret1'))
        assert.equal(hash.value, '8a8e76eba053da91841e27289c4fc5f39f690c263e4d17a226813127a1eff493')
    })

    it('o segredo vem do construtor: segredos diferentes geram hashes diferentes', async () => {
        const password = PlainPassword.create('secret1')
        const a = await new Sha256PasswordHasher('a').hash(password)
        const b = await new Sha256PasswordHasher('b').hash(password)
        assert.notEqual(a.value, b.value)
    })
})

describe('ScryptPasswordHasher (a correção de segurança)', () => {
    const hasher = new ScryptPasswordHasher()
    const password = PlainPassword.create('secret1')

    it('tem formato autodescritivo scrypt$salt$chave', async () => {
        const hash = await hasher.hash(password)
        const parts = hash.value.split('$')
        assert.equal(parts.length, 3)
        assert.equal(parts[0], 'scrypt')
    })

    it('SALT por usuário: a mesma senha gera hashes DIFERENTES', async () => {
        const a = await hasher.hash(password)
        const b = await hasher.hash(password)
        assert.notEqual(a.value, b.value)
    })

    it('verify aceita a senha certa e rejeita a errada', async () => {
        const hash = await hasher.hash(password)
        assert.equal(await hasher.verify(password, hash), true)
        assert.equal(await hasher.verify(PlainPassword.create('outraSenha'), hash), false)
    })

    it('verify rejeita hash de outro formato (ex.: sha256 do legado)', async () => {
        const legacy = await new Sha256PasswordHasher('segredo123').hash(password)
        assert.equal(await hasher.verify(password, legacy), false)
    })

    it('o hash não contém a senha em texto', async () => {
        const hash = await hasher.hash(password)
        assert.equal(hash.value.includes('secret1'), false)
    })
})

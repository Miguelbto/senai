import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { Email } from '../../../../src/contexts/identity/domain/email'
import { InvalidEmailError, InvalidUserNameError, WeakPasswordError } from '../../../../src/contexts/identity/domain/errors'
import { PasswordHash } from '../../../../src/contexts/identity/domain/password-hash'
import { PlainPassword } from '../../../../src/contexts/identity/domain/plain-password'
import { UserName } from '../../../../src/contexts/identity/domain/user-name'

describe('Email', () => {
    it('normaliza para minúsculas', () => {
        assert.equal(Email.create('Miguel@X.com').value, 'miguel@x.com')
    })

    it('e-mails que diferem só na caixa são IGUAIS (é o que gera o 409 de duplicado)', () => {
        assert.ok(Email.create('MIGUEL@X.COM').equals(Email.create('miguel@x.com')))
    })

    const invalid: [unknown, string][] = [
        ['', 'vazio'],
        ['emailinvalido.com', 'sem @'],
        ['a@b', 'sem ponto'],
        [undefined, 'ausente'],
        [123, 'não é texto'],
    ]
    for (const [value, why] of invalid) {
        it(`rejeita ${why}: ${String(value)}`, () => {
            assert.throws(() => Email.create(value), InvalidEmailError)
        })
    }

    it('mensagem e categoria são as do legado', () => {
        try {
            Email.create('x')
            assert.fail()
        } catch (e) {
            assert.ok(e instanceof InvalidEmailError)
            assert.equal(e.message, 'email invalido')
            assert.equal(e.kind, 'validation')
        }
    })

    it('QUIRK: "@." é aceito (a regra do legado é só conter @ e .)', () => {
        assert.equal(Email.create('@.').value, '@.')
    })
})

describe('UserName', () => {
    it('aceita 2 ou mais caracteres e NÃO faz trim', () => {
        assert.equal(UserName.create('Jo').value, 'Jo')
        assert.equal(UserName.create(' Ana ').value, ' Ana ')
    })

    it('QUIRK: dois espaços são um nome válido', () => {
        assert.equal(UserName.create('  ').value, '  ')
    })

    for (const value of ['', 'A', undefined, null, 42]) {
        it(`rejeita ${JSON.stringify(value) ?? 'undefined'}`, () => {
            assert.throws(() => UserName.create(value), InvalidUserNameError)
        })
    }

    it('mensagem do legado', () => {
        assert.throws(() => UserName.create('A'), { message: 'nome invalido' })
    })
})

describe('PlainPassword', () => {
    it('aceita 6 caracteres e rejeita 5', () => {
        assert.equal(PlainPassword.create('123456').reveal(), '123456')
        assert.throws(() => PlainPassword.create('12345'), WeakPasswordError)
    })

    it('mensagem exata do legado', () => {
        assert.throws(() => PlainPassword.create('123'), { message: 'senha deve ter no minimo 6 caracteres' })
    })

    it('NÃO vaza em log nem em JSON', () => {
        const password = PlainPassword.create('minhaSenhaSecreta')
        assert.equal(`${password}`, '[PROTECTED]')
        assert.equal(JSON.stringify({ password }), '{"password":"[PROTECTED]"}')
        assert.equal(String(password).includes('minhaSenhaSecreta'), false)
    })
})

describe('PasswordHash', () => {
    it('guarda o valor e não vaza em toString', () => {
        const hash = PasswordHash.fromHashed('abc123')
        assert.equal(hash.value, 'abc123')
        assert.equal(`${hash}`, '[HASH]')
    })

    it('hash vazio é bug/dado corrompido: lança Error comum (não DomainError)', () => {
        assert.throws(() => PasswordHash.fromHashed(''), Error)
    })
})

import { describe, it, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import { RegisterUser } from '../../../../src/contexts/identity/application/use-cases/register-user'
import { EmailAlreadyRegisteredError, InvalidEmailError, InvalidUserNameError, WeakPasswordError } from '../../../../src/contexts/identity/domain/errors'
import { FixedClock } from '../../../support/fixed-clock'
import { SequentialIdGenerator } from '../../../support/sequential-id-generator'
import { FakePasswordHasher } from '../../../support/identity/fake-password-hasher'
import { InMemoryUserRepository } from '../../../support/identity/in-memory-user-repository'
import { SpyWelcomeNotifier } from '../../../support/identity/spy-welcome-notifier'

/**
 * Teste de CASO DE USO com dublês: nenhum banco, nenhum Fastify, nenhum arquivo.
 * Tudo roda em memória, em milissegundos.
 */
describe('RegisterUser', () => {
    let users: InMemoryUserRepository
    let hasher: FakePasswordHasher
    let notifier: SpyWelcomeNotifier
    let useCase: RegisterUser

    const valid = { name: 'Miguel', email: 'Miguel@X.com', password: 'secret1', isVip: false }

    beforeEach(() => {
        users = new InMemoryUserRepository()
        hasher = new FakePasswordHasher()
        notifier = new SpyWelcomeNotifier()
        useCase = new RegisterUser(
            users,
            hasher,
            notifier,
            new SequentialIdGenerator('user'),
            new FixedClock(new Date('2026-03-01T10:00:00.000Z')),
        )
    })

    it('caminho feliz: devolve DTO sem senha e com e-mail normalizado', async () => {
        const output = await useCase.execute(valid)

        assert.deepEqual(output, { id: 'user-1', name: 'Miguel', email: 'miguel@x.com', isVip: false })
    })

    it('persiste o usuário com HASH (nunca a senha em texto), id e data vindos das portas', async () => {
        await useCase.execute(valid)

        const saved = users.all[0]
        assert.ok(saved)
        assert.equal(saved.passwordHash.value, 'hashed:secret1')
        assert.notEqual(saved.passwordHash.value, 'secret1')
        assert.equal(saved.createdAt.toISOString(), '2026-03-01T10:00:00.000Z')
    })

    it('registra VIP quando isVip é true', async () => {
        const output = await useCase.execute({ ...valid, isVip: true })
        assert.equal(output.isVip, true)
    })

    it('notifica com o e-mail COMO FOI DIGITADO (quirk do legado)', async () => {
        await useCase.execute(valid)
        assert.deepEqual(notifier.sent, [{ name: 'Miguel', email: 'Miguel@X.com' }])
    })

    describe('validações (ordem do legado: nome → e-mail → senha)', () => {
        it('tudo inválido: aparece o erro do NOME', async () => {
            await assert.rejects(useCase.execute({ name: '', email: 'x', password: '1', isVip: false }), InvalidUserNameError)
        })

        it('nome ok, e-mail e senha inválidos: aparece o erro do E-MAIL', async () => {
            await assert.rejects(useCase.execute({ name: 'Miguel', email: 'x', password: '1', isVip: false }), InvalidEmailError)
        })

        it('só a senha inválida: aparece o erro da SENHA', async () => {
            await assert.rejects(useCase.execute({ ...valid, password: '123' }), WeakPasswordError)
        })

        it('entrada inválida não salva, não gera hash e não notifica', async () => {
            await assert.rejects(useCase.execute({ ...valid, password: '123' }))

            assert.equal(users.all.length, 0)
            assert.equal(hasher.calls, 0)
            assert.equal(notifier.sent.length, 0)
        })
    })

    describe('e-mail duplicado', () => {
        it('lança EmailAlreadyRegisteredError (conflict), mesmo com caixa diferente', async () => {
            await useCase.execute({ ...valid, email: 'miguel@x.com' })

            await assert.rejects(
                useCase.execute({ ...valid, name: 'Outro', email: 'MIGUEL@X.COM' }),
                (error) => error instanceof EmailAlreadyRegisteredError && error.kind === 'conflict',
            )
        })

        it('NÃO gasta o hash (caro) em e-mail duplicado: a checagem vem ANTES do hash', async () => {
            await useCase.execute(valid)
            assert.equal(hasher.calls, 1)

            await assert.rejects(useCase.execute(valid))

            assert.equal(hasher.calls, 1) // continua 1: o segundo pedido falhou antes de gerar hash
        })

        it('o segundo cadastro não grava nada e não notifica', async () => {
            await useCase.execute(valid)
            await assert.rejects(useCase.execute(valid))

            assert.equal(users.all.length, 1)
            assert.equal(notifier.sent.length, 1)
        })
    })
})

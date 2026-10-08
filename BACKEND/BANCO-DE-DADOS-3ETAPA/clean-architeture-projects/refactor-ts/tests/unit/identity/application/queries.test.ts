import { describe, it, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import { GetCustomerSnapshot } from '../../../../src/contexts/identity/application/use-cases/get-customer-snapshot'
import { GetUser } from '../../../../src/contexts/identity/application/use-cases/get-user'
import { RegisterUser } from '../../../../src/contexts/identity/application/use-cases/register-user'
import { UserNotFoundError } from '../../../../src/contexts/identity/domain/errors'
import { FixedClock } from '../../../support/fixed-clock'
import { SequentialIdGenerator } from '../../../support/sequential-id-generator'
import { FakePasswordHasher } from '../../../support/identity/fake-password-hasher'
import { InMemoryUserRepository } from '../../../support/identity/in-memory-user-repository'
import { SpyWelcomeNotifier } from '../../../support/identity/spy-welcome-notifier'

describe('GetUser e GetCustomerSnapshot', () => {
    let users: InMemoryUserRepository
    let userId: string

    beforeEach(async () => {
        users = new InMemoryUserRepository()
        const register = new RegisterUser(
            users,
            new FakePasswordHasher(),
            new SpyWelcomeNotifier(),
            new SequentialIdGenerator('user'),
            new FixedClock(new Date('2026-03-01T10:00:00.000Z')),
        )
        userId = (await register.execute({ name: 'Ana', email: 'ana@x.com', password: 'secret1', isVip: true })).id
    })

    it('GetUser devolve o usuário, createdAt em ISO, e SEM senha/hash', async () => {
        const output = await new GetUser(users).execute(userId)

        assert.deepEqual(output, {
            id: userId,
            name: 'Ana',
            email: 'ana@x.com',
            isVip: true,
            createdAt: '2026-03-01T10:00:00.000Z',
        })
        assert.equal('password' in output, false)
        assert.equal('passwordHash' in output, false)
    })

    it('GetUser lança UserNotFoundError (not_found) para id inexistente', async () => {
        await assert.rejects(
            new GetUser(users).execute('nao-existe'),
            (error) => error instanceof UserNotFoundError && error.kind === 'not_found' && error.message === 'usuario nao encontrado',
        )
    })

    it('GetCustomerSnapshot expõe só o mínimo (id, email, isVip)', async () => {
        const snapshot = await new GetCustomerSnapshot(users).execute(userId)
        assert.deepEqual(snapshot, { id: userId, email: 'ana@x.com', isVip: true })
    })

    it('GetCustomerSnapshot devolve null (não lança) quando não existe', async () => {
        assert.equal(await new GetCustomerSnapshot(users).execute('nao-existe'), null)
    })
})

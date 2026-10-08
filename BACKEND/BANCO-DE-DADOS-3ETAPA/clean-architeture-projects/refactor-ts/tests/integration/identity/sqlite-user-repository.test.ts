import { describe, it, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import Database from 'better-sqlite3'
import { Email } from '../../../src/contexts/identity/domain/email'
import { EmailAlreadyRegisteredError } from '../../../src/contexts/identity/domain/errors'
import { PasswordHash } from '../../../src/contexts/identity/domain/password-hash'
import { User } from '../../../src/contexts/identity/domain/user'
import { UserName } from '../../../src/contexts/identity/domain/user-name'
import { createIdentitySchema } from '../../../src/contexts/identity/infrastructure/schema'
import { SqliteUserRepository } from '../../../src/contexts/identity/infrastructure/sqlite-user-repository'
import { UserMapper, type UserRow } from '../../../src/contexts/identity/infrastructure/user-mapper'

const makeUser = (over: { id?: string; email?: string; isVip?: boolean; name?: string } = {}) =>
    User.register({
        id: over.id ?? 'u-1',
        name: UserName.create(over.name ?? 'Miguel'),
        email: Email.create(over.email ?? 'miguel@x.com'),
        passwordHash: PasswordHash.fromHashed('hash-123'),
        isVip: over.isVip ?? false,
        now: new Date('2026-03-01T10:00:00.000Z'),
    })

describe('UserMapper', () => {
    it('toRow converte para o formato do banco (snake_case, 0/1, data ISO)', () => {
        const row = UserMapper.toRow(makeUser({ isVip: true }))
        assert.deepEqual(row, {
            id: 'u-1',
            name: 'Miguel',
            email: 'miguel@x.com',
            password: 'hash-123',
            is_vip: 1,
            created_at: '2026-03-01T10:00:00.000Z',
        })
    })

    it('toDomain reconstrói a entidade (ida e volta sem perder nada)', () => {
        const original = makeUser({ isVip: true })
        const back = UserMapper.toDomain(UserMapper.toRow(original))

        assert.equal(back.id, original.id)
        assert.equal(back.name.value, original.name.value)
        assert.equal(back.email.value, original.email.value)
        assert.equal(back.passwordHash.value, original.passwordHash.value)
        assert.equal(back.isVip, true)
        assert.equal(back.createdAt.toISOString(), original.createdAt.toISOString())
    })

    it('is_vip 0 vira false', () => {
        const row: UserRow = { ...UserMapper.toRow(makeUser()), is_vip: 0 }
        assert.equal(UserMapper.toDomain(row).isVip, false)
    })
})

describe('SqliteUserRepository (banco :memory: de verdade)', () => {
    let db: Database.Database
    let repo: SqliteUserRepository

    beforeEach(() => {
        db = new Database(':memory:')
        createIdentitySchema(db)
        repo = new SqliteUserRepository(db)
    })

    afterEach(() => db.close())

    it('salva e busca por id (ida e volta)', async () => {
        await repo.save(makeUser({ isVip: true }))

        const found = await repo.findById('u-1')
        assert.ok(found)
        assert.equal(found.name.value, 'Miguel')
        assert.equal(found.email.value, 'miguel@x.com')
        assert.equal(found.isVip, true)
        assert.equal(found.passwordHash.value, 'hash-123')
        assert.equal(found.createdAt.toISOString(), '2026-03-01T10:00:00.000Z')
    })

    it('findById devolve null quando não existe', async () => {
        assert.equal(await repo.findById('nao-existe'), null)
    })

    it('existsByEmail encontra o e-mail gravado e rejeita o inexistente', async () => {
        await repo.save(makeUser())
        assert.equal(await repo.existsByEmail(Email.create('MIGUEL@x.com')), true) // VO normaliza
        assert.equal(await repo.existsByEmail(Email.create('outro@x.com')), false)
    })

    it('a coluna password guarda o HASH, e is_vip guarda 0/1 (formato do legado)', async () => {
        await repo.save(makeUser({ isVip: true }))
        const row = db.prepare('SELECT * FROM users WHERE id = ?').get('u-1') as UserRow
        assert.equal(row.password, 'hash-123')
        assert.equal(row.is_vip, 1)
    })

    it('salvar de novo o MESMO id atualiza (upsert), sem duplicar', async () => {
        await repo.save(makeUser({ name: 'Antigo' }))
        await repo.save(makeUser({ name: 'Novo' }))

        const count = db.prepare('SELECT COUNT(*) AS c FROM users').get() as { c: number }
        assert.equal(count.c, 1)
        assert.equal((await repo.findById('u-1'))?.name.value, 'Novo')
    })

    it('e-mail de OUTRO usuário: o UNIQUE do banco é traduzido para EmailAlreadyRegisteredError', async () => {
        await repo.save(makeUser({ id: 'u-1', email: 'igual@x.com' }))

        await assert.rejects(
            repo.save(makeUser({ id: 'u-2', email: 'igual@x.com' })),
            EmailAlreadyRegisteredError,
        )
    })
})

import { describe, it, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import Database from 'better-sqlite3'
import { SqliteUnitOfWork } from '../../../src/shared-kernel/infrastructure/sqlite-unit-of-work'


/**
 * Teste de INTEGRAÇÃO: usa um SQLite de verdade (em memória), porque o que
 * queremos provar é justamente o comportamento do BEGIN/COMMIT/ROLLBACK.
 */


describe('SqliteUnitOfWork', () => {
  let db: Database.Database
  let uow: SqliteUnitOfWork

  const insert = (id: string) => db.prepare('INSERT INTO items (id) VALUES (?)').run(id)
  const allIds = () => (db.prepare('SELECT id FROM items ORDER BY id').all() as { id: string }[]).map((r) => r.id)

  beforeEach(() => {
    db = new Database(':memory:')
    db.exec('CREATE TABLE items (id TEXT PRIMARY KEY)')
    uow = new SqliteUnitOfWork(db)
  })

  afterEach(() => {
    db.close()
  })

  it('COMMIT: quando o trabalho termina bem, os dados ficam no banco', async () => {
    await uow.run(async () => {
      insert('a')
      insert('b')
    })

    assert.deepEqual(allIds(), ['a', 'b'])
    assert.equal(db.inTransaction, false) // não deixou transação aberta
  })

  it('ROLLBACK: se o trabalho lança erro, NADA é gravado e o erro original é relançado', async () => {
    const boom = new Error('falhou no meio')

    await assert.rejects(
      uow.run(async () => {
        insert('a')
        insert('b')
        throw boom
      }),
      (error) => error === boom, // é exatamente o MESMO erro, sem embrulho
    )

    assert.deepEqual(allIds(), []) // 'a' e 'b' foram desfeitos
    assert.equal(db.inTransaction, false)
  })

  it('devolve o valor retornado pelo trabalho', async () => {
    const result = await uow.run(async () => {
      insert('a')
      return 42
    })

    assert.equal(result, 42)
  })

  it('ANINHADO: um run dentro de outro participa da mesma transação (commit conjunto)', async () => {
    await uow.run(async () => {
      insert('a')
      await uow.run(async () => {
        insert('b')
      })
    })

    assert.deepEqual(allIds(), ['a', 'b'])
  })

  it('ANINHADO: se o externo falha depois do interno, desfaz TUDO (inclusive o interno)', async () => {
    await assert.rejects(
      uow.run(async () => {
        await uow.run(async () => {
          insert('interno')
        })
        insert('externo')
        throw new Error('falha no externo')
      }),
    )

    assert.deepEqual(allIds(), [])
  })

  it('depois de um rollback, a próxima transação funciona normalmente', async () => {
    await assert.rejects(
      uow.run(async () => {
        insert('a')
        throw new Error('x')
      }),
    )

    await uow.run(async () => {
      insert('b')
    })

    assert.deepEqual(allIds(), ['b'])
  })
})

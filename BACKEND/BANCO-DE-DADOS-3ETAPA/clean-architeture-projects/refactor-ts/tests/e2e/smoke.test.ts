import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildApp } from '../../src/server'

test('Cadastra usuário em banco em memória', () => {
    const app = buildApp({ dbPath: ':memory' })
    const res = app.inject({
        method: 'POST', url: '/users',
        payload: { name: 'Miguel', email: 'm@x.com', password: 'secret1' },
    })

    assert.equal(res.statusCode, 201)
    app.close()
})
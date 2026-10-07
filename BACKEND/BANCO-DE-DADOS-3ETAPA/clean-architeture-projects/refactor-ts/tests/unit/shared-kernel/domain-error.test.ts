import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { DomainError } from '../../../src/shared-kernel/domain/domain-error'

// DomainError é abstrata, então criamos uma subclasse só para o teste.
class FakeConflictError extends DomainError {
  readonly kind = 'conflict' as const
}

describe('DomainError', () => {
  const error = new FakeConflictError('email ja cadastrado')

  it('é um Error e um DomainError (dá para capturar com instanceof)', () => {
    assert.ok(error instanceof Error)
    assert.ok(error instanceof DomainError)
    assert.ok(error instanceof FakeConflictError)
  })

  it('carrega a categoria (kind) declarada pela subclasse', () => {
    assert.equal(error.kind, 'conflict')
  })

  it('preserva a mensagem do legado', () => {
    assert.equal(error.message, 'email ja cadastrado')
  })

  it('usa o nome da subclasse concreta em name', () => {
    assert.equal(error.name, 'FakeConflictError')
  })

  it('mantém o stack trace (útil para depurar)', () => {
    assert.ok(error.stack)
  })
})

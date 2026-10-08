import { describe, it, afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'
import { ConsoleWelcomeNotifier } from '../../../src/contexts/identity/infrastructure/console-welcome-notifier'

describe('ConsoleWelcomeNotifier', () => {
    afterEach(() => mock.restoreAll())

    it('imprime a mesma mensagem do legado', async () => {
        const log = mock.method(console, 'log', () => { })
        await new ConsoleWelcomeNotifier().userRegistered({ name: 'Miguel', email: 'Miguel@X.com' })

        assert.equal(log.mock.calls[0]?.arguments[0], '[EMAIL FAKE] Bem-vindo, Miguel! Enviado para Miguel@X.com')
    })
})

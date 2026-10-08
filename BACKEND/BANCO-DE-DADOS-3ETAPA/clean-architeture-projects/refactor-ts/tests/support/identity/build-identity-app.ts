import Database from 'better-sqlite3'
import Fastify, { type FastifyInstance } from 'fastify'
import { wireIdentity } from '../../../src/app/identity-wiring'
import { createIdentitySchema } from '../../../src/contexts/identity/infrastructure/schema'
import { identityRoutes } from '../../../src/contexts/identity/interface/http/identity-routes'

/**
 * Monta um app SÓ com o contexto Identity, exatamente como o server.ts passará a fazer
 * (db + wireIdentity + register). Serve para rodar a suíte de caracterização dos
 * /users contra o código NOVO, sem depender do resto do monolito.
 */
export function buildIdentityApp(): FastifyInstance {
    const db = new Database(':memory:')
    createIdentitySchema(db)

    const app = Fastify({ logger: false })
    app.addHook('onClose', async () => {
        db.close()
    })
    app.register(identityRoutes, wireIdentity(db, { passwordSecret: 'segredo123' }))
    return app
}

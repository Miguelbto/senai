import "dotenv/config"
import Fastify from 'fastify'
import cors from '@fastify/cors'

// Import de rotas 
import { authRoutes } from './domain/auth/auth.routes.js'

const app = Fastify({ logger: true })


app.register(authRoutes, { prefix: '/auth' })

export const start = async () => {
    try {

        await app.register(cors, {
            origin: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true,
        })


        // Rota raiz com a mensagem e lista de endpoints
        app.get('/', async () => {
            return {
                status: 'online',
                message: 'Well Come the API techfood',
                availableRoutes: {
                    user: [
                        { method: "POST", path: "/users", description: "Criar novo usuário" },
                        { method: "GET", path: "/users", description: "Listar usuários" },
                        { method: "POST", path: "/login", description: "Autenticação" }
                    ]
                }
            }
        })

        const port = process.env.PORT ? parseInt(process.env.PORT) : 3000

        await app.listen({ port, host: "0.0.0.0" })

    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()
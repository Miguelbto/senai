import "dotenv/config"
import Fastify from 'fastify'
import cors from '@fastify/cors'

// Import de rotas 
import { authRoutes } from './domain/auth/auth.routes.js'

export async function buildApp() {
  const app = Fastify({ logger: false }) // logger desligado nos testes para não poluir o terminal

  // Registro de Plugins
  await app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })

  // Registro de Rotas
  await app.register(authRoutes, { prefix: '/auth' })

  // Rota raiz
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

  return app
}
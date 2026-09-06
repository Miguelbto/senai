import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { FastifyInstance } from 'fastify'
import { buildApp } from '../../../app.js' // Ajuste o caminho relativo se necessário
import { prisma } from '../../../shared/lib/prisma.js'
import bcrypt from 'bcryptjs'

describe('Auth (E2E)', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    // Instancia a aplicação configurada do Fastify
    app = await buildApp()
    await app.ready()

    // Limpa registros prévios do banco no Docker
    await prisma.usuario.deleteMany({
      where: { email: 'e2e_teste@restaurante.com' },
    })

    // Cria um usuário de teste real no PostgreSQL
    const senhaHash = await bcrypt.hash('123456', 10)
    await prisma.usuario.create({
      data: {
        nome: 'Cliente E2E',
        email: 'e2e_teste@restaurante.com',
        senha: senhaHash,
        papel: 'USER',
      },
    })
  })

  afterAll(async () => {
    await prisma.usuario.deleteMany({
      where: { email: 'e2e_teste@restaurante.com' },
    })
    await app.close()
  })

  it('POST /auth/login - deve autenticar e retornar status 200', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: 'e2e_teste@restaurante.com',
        password: '123456',
      },
    })

    expect(response.statusCode).toBe(200)
    
    const body = JSON.parse(response.payload)
    expect(body).toHaveProperty('token')
  })
})
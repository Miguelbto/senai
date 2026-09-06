import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import { AuthService } from '../services/auth.service.js'
import { prisma } from '@/shared/lib/prisma.js'
import { makeUsuario } from '@/shared/testing/factories/make-usuario.js'
import bcrypt from 'bcryptjs'

describe('AuthService (Integração)', () => {
  let authService: AuthService

  beforeEach(async () => {
    authService = new AuthService()

    // Limpa a tabela de usuários do banco Docker antes de cada teste
    await prisma.refreshToken.deleteMany()
    await prisma.usuario.deleteMany()
  })

  afterAll(async () => {
    // Limpeza final do banco após rodar a suíte
    await prisma.refreshToken.deleteMany()
    await prisma.usuario.deleteMany()
    await prisma.$disconnect()
  })

  it('deve realizar login salvando e buscando dados reais no PostgreSQL', async () => {
    // 1. Arrange: Insere um usuário real no banco Docker com senha criptografada
    const rawPassword = 'senha_secreta_123'
    const hashedPassword = await bcrypt.hash(rawPassword, 10)

    const usuarioFake = makeUsuario({
      email: 'integracao@restaurante.com',
      senha: hashedPassword,
    })

    const usuarioNoBanco = await prisma.usuario.create({
      data: usuarioFake,
    })

    // 2. Act: Executa o método de login do service consultando o banco real
    const result = await authService.login({
      email: 'integracao@restaurante.com',
      password: rawPassword,
    })

    // 3. Assert: Valida se o retorno do banco bate com o registro gerado
    expect(result.user.id).toBe(usuarioNoBanco.id)
    expect(result.user.email).toBe('integracao@restaurante.com')
    expect(result.token).toBeDefined()
  })

  it('deve registrar token na tabela invalid_tokens ao realizar logout', async () => {
    const tokenExemplo = 'token_jwt_de_teste_123'

    // Executa a invalidação do token
    await authService.logout(tokenExemplo)

    // Consulta direta no banco para confirmar se o registro foi salvo no Postgres
    const tokenInvalidadoNoBanco = await prisma.invalidToken.findUnique({
      where: { token: tokenExemplo },
    })

    expect(tokenInvalidadoNoBanco).not.toBeNull()
    expect(tokenInvalidadoNoBanco?.token).toBe(tokenExemplo)
  })
})
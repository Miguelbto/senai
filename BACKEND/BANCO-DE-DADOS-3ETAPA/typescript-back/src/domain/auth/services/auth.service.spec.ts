import { describe, it, expect, beforeEach, vi } from 'vitest'
import { AuthService } from './auth.service.js'
import { prismaMock } from '@/shared/testing/prisma.mock.js'
import { makeUsuario } from '@/shared/testing/factories/make-usuario.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { signToken, signResetToken } from '../../../shared/lib/jwt.js'
import { sendResetEmail } from '../../../shared/lib/mailer.js'

// Mock das bibliotecas externas e utilitários
vi.mock('bcryptjs', () => ({
  default: {
    compare: vi.fn(),
    hash: vi.fn(),
  },
}))

vi.mock('jsonwebtoken', () => ({
  default: {
    verify: vi.fn(),
  },
}))

vi.mock('../../../shared/lib/jwt.js', () => ({
  signToken: vi.fn(),
  signResetToken: vi.fn(),
}))

vi.mock('../../../shared/lib/mailer.js', () => ({
  sendResetEmail: vi.fn(),
}))

describe('AuthService (Unidade)', () => {
  let authService: AuthService

  beforeEach(() => {
    authService = new AuthService()
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('deve realizar o login com sucesso e retornar o usuário com o token', async () => {
      // Uso da factory especificando apenas os campos necessários para a regra do teste
      const fakeUser = makeUsuario({
        email: 'joao@restaurante.com',
        senha: 'hash_da_senha',
      })

      prismaMock.usuario.findUnique.mockResolvedValue(fakeUser)
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never)
      vi.mocked(signToken).mockReturnValue('fake_jwt_token')

      const result = await authService.login({
        email: 'joao@restaurante.com',
        password: '123456_senha_correta',
      })

      expect(prismaMock.usuario.findUnique).toHaveBeenCalledWith({
        where: { email: 'joao@restaurante.com' },
      })
      expect(result).toEqual({ user: fakeUser, token: 'fake_jwt_token' })
    })

    it('deve lançar erro se o usuário não for encontrado', async () => {
      prismaMock.usuario.findUnique.mockResolvedValue(null)

      await expect(
        authService.login({ email: 'inexistente@email.com', password: '123' })
      ).rejects.toThrow('Usuario não encontrado')
    })

    it('deve lançar erro se a senha for inválida', async () => {
      const fakeUser = makeUsuario({
        email: 'joao@restaurante.com',
      })

      prismaMock.usuario.findUnique.mockResolvedValue(fakeUser)
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never)

      await expect(
        authService.login({ email: 'joao@restaurante.com', password: 'senha_errada' })
      ).rejects.toThrow('Credencias inválidas')
    })
  })

  describe('logout', () => {
    it('deve invalidar o token e retornar mensagem de sucesso', async () => {
      prismaMock.invalidToken.create.mockResolvedValue({
        id: 1,
        token: 'token_para_invalidar',
        criadoEm: new Date(),
      })

      const result = await authService.logout('token_para_invalidar')

      expect(prismaMock.invalidToken.create).toHaveBeenCalled()
      expect(result).toEqual({ message: 'Logout realizado com sucesso!' })
    })
  })

  describe('forgotPassword', () => {
    it('deve gerar token e enviar e-mail de recuperação se o usuário existir', async () => {
      const fakeUser = makeUsuario({
        email: 'joao@restaurante.com',
      })

      prismaMock.usuario.findFirst.mockResolvedValue(fakeUser)
      vi.mocked(signResetToken).mockReturnValue('token_de_reset')

      await authService.forgotPassword('joao@restaurante.com')

      expect(signResetToken).toHaveBeenCalledWith('joao@restaurante.com')
      expect(sendResetEmail).toHaveBeenCalledWith('joao@restaurante.com', 'token_de_reset')
    })

    it('não deve enviar e-mail se o usuário não for encontrado', async () => {
      prismaMock.usuario.findFirst.mockResolvedValue(null)

      await authService.forgotPassword('inexistente@email.com')

      expect(sendResetEmail).not.toHaveBeenCalled()
    })
  })

  describe('resetPassword', () => {
    it('deve redefinir a senha do usuário com sucesso se o token for válido', async () => {
      vi.mocked(jwt.verify).mockReturnValue({ email: 'joao@restaurante.com' } as any)
      vi.mocked(bcrypt.hash).mockResolvedValue('novo_hash' as never)

      await authService.resetPassword('token_valido', 'novaSenha123')

      expect(jwt.verify).toHaveBeenCalledWith('token_valido', process.env.JWT_SECRET)
      expect(bcrypt.hash).toHaveBeenCalledWith('novaSenha123', 10)
      expect(prismaMock.usuario.update).toHaveBeenCalledWith({
        where: { email: 'joao@restaurante.com' },
        data: { senha: 'novo_hash' },
      })
    })

    it('deve lançar erro se o token for inválido ou estiver expirado', async () => {
      vi.mocked(jwt.verify).mockImplementation(() => {
        throw new Error('jwt expired')
      })

      await expect(
        authService.resetPassword('token_expirado', 'novaSenha123')
      ).rejects.toThrow('Token inválido ou expirado')
    })
  })
})
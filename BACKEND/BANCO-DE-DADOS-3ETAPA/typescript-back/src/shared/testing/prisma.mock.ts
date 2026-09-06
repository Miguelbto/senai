import { PrismaClient } from '@prisma/client'
import { beforeEach, vi } from 'vitest'
import { mockDeep, mockReset, DeepMockProxy } from 'vitest-mock-extended'

// 1. Cria uma versão totalmente mockada do PrismaClient
export const prismaMock = mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>

// 2. Intercepta a importação do prisma original e devolve o mock
vi.mock('@/shared/lib/prisma', () => ({
  prisma: prismaMock,
}))

beforeEach(() => {
  // Limpa o histórico de chamadas entre cada teste para garantir isolamento
  mockReset(prismaMock)
})
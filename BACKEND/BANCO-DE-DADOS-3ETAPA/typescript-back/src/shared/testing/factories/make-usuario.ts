import { faker } from '@faker-js/faker'
import { UserRole, Usuario } from '@prisma/client'

// Recebe dados opcionais para sobrescrever os fakes quando necessário
export function makeUsuario(override: Partial<Usuario> = {}): Usuario {
  return {
    id: faker.number.int({ min: 1, max: 9999 }),
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    senha: faker.internet.password({ length: 10 }),
    papel: UserRole.USER,
    criadoEm: new Date(),
    atualizadoEm: new Date(),
    ...override, // Permite sobrescrever qualquer campo
  }
}
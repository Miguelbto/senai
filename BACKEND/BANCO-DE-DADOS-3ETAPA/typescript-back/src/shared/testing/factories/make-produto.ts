import { faker } from '@faker-js/faker'
import { Produto } from '@prisma/client'

export function makeProduto(override: Partial<Produto> = {}): Produto {
  return {
    id: faker.number.int({ min: 1, max: 9999 }),
    nome: faker.commerce.productName(),
    descricao: faker.commerce.productDescription(),
    preco: faker.number.float({ min: 10, max: 100, fractionDigits: 2 }) as any,
    categoria: faker.commerce.department(),
    disponivel: true,
    imagemUrl: faker.image.url(),
    criadoEm: new Date(),
    atualizadoEm: new Date(),
    ...override,
  }
}


// <Partial> deixa todas as propriedades da interface tipagem produtos Particial
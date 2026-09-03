import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.produto.createMany({
        data: [
      { nome: 'Espaguete à Bolonhesa', descricao: 'Massa com molho de tomate e carne moída', preco: 35.50, categoria: 'Massa', disponivel: true, imagemUrl: '/src/uploads/espaguete.jpeg' },
      { nome: 'Lasanha de Frango', descricao: 'Lasanha com frango desfiado e queijo', preco: 42.00, categoria: 'Massa', disponivel: true, imagemUrl: '/src/uploads/espaguete.jpeg' },
      { nome: 'Pizza Margherita', descricao: 'Pizza de mussarela, tomate e manjericão', preco: 50.00, categoria: 'Pizza', disponivel: true, imagemUrl: '/src/uploads/espaguete.jpeg' },
      { nome: 'Suco de Laranja', descricao: 'Suco natural 500ml', preco: 12.00, categoria: 'Bebida', disponivel: true, imagemUrl: '/src/uploads/espaguete.jpeg' },
    ],
    })
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
    await prisma.$disconnect()
    process.exit(1)
})
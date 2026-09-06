import { PrismaClient, UserRole, StatusPedido } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. Limpeza do banco respeitando as chaves estrangeiras
  await prisma.itemPedido.deleteMany()
  await prisma.pedido.deleteMany()
  await prisma.cardapioProduto.deleteMany()
  await prisma.cardapio.deleteMany()
  await prisma.produto.deleteMany()
  await prisma.refreshToken.deleteMany()
  await prisma.usuario.deleteMany()
  await prisma.invalidToken.deleteMany()

  // 2. Criar Usuários
  const admin = await prisma.usuario.create({
    data: {
      nome: 'Gerente Admin',
      email: 'admin@restaurante.com',
      senha: 'adm123', 
      papel: UserRole.ADMIN,
    },
  })

  const cliente = await prisma.usuario.create({
    data: {
      nome: 'João Silva',
      email: 'joao@cliente.com',
      senha: 'cliente123',
      papel: UserRole.USER,
    },
  })

  // 3. Criar Produtos
  const hamburguer = await prisma.produto.create({
    data: {
      nome: 'X-Salada Especial',
      descricao: 'Pão brioche, blend 180g, queijo prato, alface, tomate e maionese da casa.',
      preco: 32.50,
      categoria: 'Hambúrgueres',
      disponivel: true,
      imagemUrl: 'https://exemplo.com/imagens/x-salada.jpg',
    },
  })

  const refrigerante = await prisma.produto.create({
    data: {
      nome: 'Coca-Cola 350ml',
      descricao: 'Lata gelada 350ml',
      preco: 7.00,
      categoria: 'Bebidas',
      disponivel: true,
      imagemUrl: 'https://exemplo.com/imagens/cocacola.jpg',
    },
  })

  // 4. Criar Cardápio e Vincular os Produtos (CardapioProduto)
  const cardapioPrincipal = await prisma.cardapio.create({
    data: {
      nome: 'Cardápio Principal',
      descricao: 'Itens disponíveis para o horário de funcionamento padrão.',
      disponivel: true,
      produtos: {
        create: [
          { produtoId: hamburguer.id },
          { produtoId: refrigerante.id },
        ],
      },
    },
  })

  // 5. Criar Pedido de Exemplo com Itens
  await prisma.pedido.create({
    data: {
      cliente: cliente.nome,
      status: StatusPedido.PENDENTE,
      total: 39.50,
      itens: {
        create: [
          {
            produtoId: hamburguer.id,
            quantidade: 1,
            precoUnitario: hamburguer.preco,
          },
          {
            produtoId: refrigerante.id,
            quantidade: 1,
            precoUnitario: refrigerante.preco,
          },
        ],
      },
    },
  })

  console.log('🌱 Banco de dados populado com sucesso!')
}

main()
  .catch((error) => {
    console.error('Erro ao executar o seed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
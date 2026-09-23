const path = require('path');

const swaggerDefinition = {
    openapi: '3.0.3',
    info: {
        title: 'Sabor Digital API',
        description: 'API REST para gerenciamento de produtos, cardápios, pedidos e usuários.',
        version: '1.0.0'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor local'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        schemas: {
            Erro: {
                type: 'object',
                properties: {
                    sucesso: { type: 'boolean', example: false },
                    mensagem: { type: 'string', example: 'Erro de validação' },
                    erro: { type: 'string', example: 'Detalhes do erro' }
                }
            },
            Produto: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    nome: { type: 'string', example: 'Pizza Margherita' },
                    descricao: { type: 'string', example: 'Pizza com molho de tomate e manjericao' },
                    preco: { type: 'number', format: 'float', example: 39.90 },
                    categoria: { type: 'string', nullable: true, example: 'Pizzas' },
                    disponivel: { type: 'boolean', example: true },
                    imagem: { type: 'string', nullable: true, example: '/public/uploads/produtos/pizza.jpg' }
                }
            },
            ItemPedido: {
                type: 'object',
                required: ['produto_id', 'quantidade'],
                properties: {
                    produto_id: { type: 'integer', example: 1 },
                    quantidade: { type: 'integer', minimum: 1, example: 2 }
                }
            },
            Pedido: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    cliente: { type: 'string', example: 'Miguel' },
                    status: { type: 'string', enum: ['pendente', 'preparo', 'pronto', 'entregue'], example: 'pendente' },
                    total: { type: 'number', format: 'float', example: 79.80 },
                    itens: { type: 'array', items: { $ref: '#/components/schemas/ItemPedido' } }
                }
            },
            Cardapio: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    nome: { type: 'string', example: 'Menu executivo' },
                    descricao: { type: 'string', nullable: true, example: 'Opcoes do dia' },
                    disponivel: { type: 'boolean', example: true },
                    produtos: { type: 'array', items: { type: 'integer' }, example: [1, 2] }
                }
            }
        }
    }
};

const swaggerOptions = {
    definition: swaggerDefinition,
    apis: [path.join(__dirname, 'routes', '*.js').replace(/\\/g, '/')]
};

module.exports = { swaggerOptions };
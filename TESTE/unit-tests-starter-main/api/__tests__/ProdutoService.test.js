const { beforeEach } = require("node:test")
const ProdutoService = require("../services/ProdutoService")


describe('ProdutoService - testes unitários', () => {
    let service
    let mockRepository

    beforeEach(() => {
        mockRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
        }

        service = new ProdutoService(mockRepository)
    })

    describe('Listar', () => {
        test('chama repositorie findAll e retorna o resultado', () => {
            const produto = [{ id: 1, nome: 'Coxinha', preco: 5 }]

            mockRepository.findAll.mockReturnValue(produto)

            const resultado = Server.listar()

            expect(mockRepository.findAll).toHaveBeenCalledTimes(1)
            expect(resultado).toEqual(produto)
        })

        // criar teste findById
        test('')
    })


})
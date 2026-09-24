const PedidoService = require("../services/PedidoService");

// Teste unitario: o service e testado em isolamento total.
// O repository e substituido por um mock (jest.fn()), assim testamos so a
// logica do service, sem depender de dados reais.
//
// Abaixo ha 1 teste pronto (listar) como referencia de estilo.
// Os demais estao como test.todo — implemente cada um seguindo o ENUNCIADO-03-PEDIDOS.md.

describe("PedidoService (unitario com mocks)", () => {
  let service;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      updateStatus: jest.fn(),
      delete: jest.fn(),
    };

    service = new PedidoService(mockRepository);
  });

  describe("listar", () => {
    test("chama repository.findAll uma vez e retorna o resultado", () => {
      const pedidos = [{ id: 1, cliente: "Ana Souza", itens: [], status: "pendente", total: 0 }];
      mockRepository.findAll.mockReturnValue(pedidos);

      const resultado = service.listar();

      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(resultado).toEqual(pedidos);
    });
  });

  describe("buscarPorId", () => {
    test.todo("repassa o id ao repository e retorna o pedido encontrado");
    test.todo("lanca erro 'Pedido nao encontrado' quando o repository retorna null");
  });

  describe("criar", () => {
    test.todo("repassa os dados ao repository e retorna o pedido criado com o total calculado");
    test.todo("propaga o erro quando o cliente estiver faltando");
    test.todo("propaga o erro quando a lista de itens estiver vazia");
    test.todo("propaga o erro quando algum item tiver preco ou quantidade invalidos");
  });

  describe("atualizarStatus", () => {
    test.todo("chama repository.findById e repository.updateStatus quando o pedido existe");
    test.todo("lanca erro 'Pedido nao encontrado' sem chamar repository.updateStatus quando o pedido nao existe");
    test.todo("propaga o erro quando o novo status for invalido");
    test.todo("propaga o erro quando o pedido ja estiver cancelado");
  });

  describe("remover", () => {
    test.todo("chama repository.delete com o id correto quando o pedido existe");
    test.todo("lanca erro 'Pedido nao encontrado' quando o repository retorna false");
  });
});

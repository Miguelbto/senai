const PedidoService = require("../services/PedidoService");

// Teste unitario: o service e testado em isolamento total.
// O repository e substituido por um mock (jest.fn()), assim testamos so a
// logica do service, sem depender de dados reais.

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
    test("repassa o id ao repository e retorna o pedido encontrado", () => {
      const pedido = { id: 1, cliente: "Ana Souza", itens: [], status: "pendente", total: 0 };
      mockRepository.findById.mockReturnValue(pedido);

      const resultado = service.buscarPorId(1);

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(resultado).toEqual(pedido);
    });

    test("lanca erro 'Pedido nao encontrado' quando o repository retorna null", () => {
      mockRepository.findById.mockReturnValue(null);

      expect(() => service.buscarPorId(99)).toThrow("Pedido nao encontrado");
      expect(mockRepository.findById).toHaveBeenCalledWith(99);
    });
  });

  describe("criar", () => {
    test("repassa os dados ao repository e retorna o pedido criado com o total calculated", () => {
      const dadosInput = {
        cliente: "Carlos Silva",
        itens: [
          { nome: "Hamburguer X Bacon", preco: 20, quantidade: 2 },
          { nome: "Refrigerante", preco: 10, quantidade: 1 },
        ],
      };

      const pedidoCriado = { id: 1, ...dadosInput, status: "pendente", total: 50 };
      mockRepository.create.mockReturnValue(pedidoCriado);

      const resultado = service.criar(dadosInput);

      expect(mockRepository.create).toHaveBeenCalled();
      expect(resultado).toEqual(pedidoCriado);
    });

    test("propaga o erro quando o cliente estiver faltando", () => {
      const dadosSemCliente = {
        itens: [{ nome: "Hamburguer", preco: 20, quantidade: 1 }],
      };

      expect(() => service.criar(dadosSemCliente)).toThrow();
    });

    test("propaga o erro quando a lista de itens estiver vazia", () => {
      const dadosItensVazio = {
        cliente: "Carlos Silva",
        itens: [],
      };

      expect(() => service.criar(dadosItensVazio)).toThrow();
    });

    test("propaga o erro quando algum item tiver preco ou quantidade invalidos", () => {
      const dadosItemInvalido = {
        cliente: "Carlos Silva",
        itens: [{ nome: "Hamburguer", preco: -10, quantidade: 0 }],
      };

      expect(() => service.criar(dadosItemInvalido)).toThrow();
    });
  });

  describe("atualizarStatus", () => {
    test("chama repository.findById e repository.updateStatus quando o pedido existe", () => {
      const pedidoExistente = { id: 1, cliente: "Ana Souza", status: "pendente" };
      const pedidoAtualizado = { ...pedidoExistente, status: "em_preparo" };

      mockRepository.findById.mockReturnValue(pedidoExistente);
      mockRepository.updateStatus.mockReturnValue(pedidoAtualizado);

      const resultado = service.atualizarStatus(1, "em_preparo");

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRepository.updateStatus).toHaveBeenCalledWith(1, "em_preparo");
      expect(resultado).toEqual(pedidoAtualizado);
    });

    test("lanca erro 'Pedido nao encontrado' sem chamar repository.updateStatus quando o pedido nao existe", () => {
      mockRepository.findById.mockReturnValue(null);

      expect(() => service.atualizarStatus(99, "em_preparo")).toThrow("Pedido nao encontrado");
      expect(mockRepository.updateStatus).not.toHaveBeenCalled();
    });

    test("propaga o erro quando o novo status for invalido", () => {
      const pedidoExistente = { id: 1, cliente: "Ana Souza", status: "pendente" };
      mockRepository.findById.mockReturnValue(pedidoExistente);

      expect(() => service.atualizarStatus(1, "status_invalido")).toThrow();
    });

    test("propaga o erro quando o pedido ja estiver cancelado", () => {
      const pedidoCancelado = { id: 1, cliente: "Ana Souza", status: "cancelado" };
      mockRepository.findById.mockReturnValue(pedidoCancelado);

      expect(() => service.atualizarStatus(1, "entregue")).toThrow();
    });
  });

  describe("remover", () => {
    test("chama repository.delete com o id correto quando o pedido existe", () => {
      mockRepository.findById.mockReturnValue({ id: 1, cliente: "Ana Souza" });
      mockRepository.delete.mockReturnValue(true);

      service.remover(1);

      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    test("lanca erro 'Pedido nao encontrado' quando o repository retorna false", () => {
      mockRepository.findById.mockReturnValue(null);
      mockRepository.delete.mockReturnValue(false);

      expect(() => service.remover(99)).toThrow("Pedido nao encontrado");
    });
  });
});
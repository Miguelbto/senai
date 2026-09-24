const ClienteService = require("../services/ClienteService");

// Teste unitario: o service e testado em isolamento total.
// O repository e substituido por um mock (jest.fn()), assim testamos so a
// logica do service, sem depender de dados reais.

describe("ClienteService (unitario com mocks)", () => {
  let service;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    service = new ClienteService(mockRepository);
  });

  describe("listar", () => {
    test("chama repository.findAll uma vez e retorna o resultado", () => {
      const clientes = [{ id: 1, nome: "Ana Souza", email: "ana@email.com" }];
      mockRepository.findAll.mockReturnValue(clientes);

      const resultado = service.listar();

      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(resultado).toEqual(clientes);
    });
  });

  describe("buscarPorId", () => {
    test("repassa o id ao repository e retorna o cliente encontrado", () => {
      const cliente = { id: 1, nome: "Ana Souza", email: "ana@email.com" };
      mockRepository.findById.mockReturnValue(cliente);

      const resultado = service.buscarPorId(1);

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(resultado).toEqual(cliente);
    });

    test("lanca erro 'Cliente nao encontrado' quando o repository retorna null", () => {
      mockRepository.findById.mockReturnValue(null);

      expect(() => service.buscarPorId(99)).toThrow("Cliente nao encontrado");
      expect(mockRepository.findById).toHaveBeenCalledWith(99);
    });
  });

  describe("criar", () => {
    test("repassa os dados ao repository e retorna o cliente criado", () => {
      const novosDados = { nome: "Carlos Silva", email: "carlos@email.com" };
      const clienteCriado = { id: 1, ...novosDados };

      mockRepository.findByEmail.mockReturnValue(null);
      mockRepository.create.mockReturnValue(clienteCriado);

      const resultado = service.criar(novosDados);

      expect(mockRepository.create).toHaveBeenCalledWith(novosDados);
      expect(resultado).toEqual(clienteCriado);
    });

    test("propaga o erro quando nome ou email estiverem faltando", () => {
      expect(() => service.criar({ email: "carlos@email.com" })).toThrow();
      expect(() => service.criar({ nome: "Carlos Silva" })).toThrow();
    });

    test("propaga o erro quando o email ja estiver cadastrado", () => {
      const dados = { nome: "Carlos Silva", email: "existente@email.com" };
      mockRepository.findByEmail.mockReturnValue({ id: 2, ...dados });

      expect(() => service.criar(dados)).toThrow();
    });
  });

  describe("atualizar", () => {
    test("chama repository.findById e repository.update quando o cliente existe", () => {
      const clienteExistente = { id: 1, nome: "Ana Souza", email: "ana@email.com" };
      const novosDados = { nome: "Ana Silva", email: "ana.silva@email.com" };
      const clienteAtualizado = { id: 1, ...novosDados };

      mockRepository.findById.mockReturnValue(clienteExistente);
      mockRepository.findByEmail.mockReturnValue(null);
      mockRepository.update.mockReturnValue(clienteAtualizado);

      const resultado = service.atualizar(1, novosDados);

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRepository.update).toHaveBeenCalledWith(1, novosDados);
      expect(resultado).toEqual(clienteAtualizado);
    });

    test("lanca erro 'Cliente nao encontrado' sem chamar repository.update quando o cliente nao existe", () => {
      mockRepository.findById.mockReturnValue(null);

      expect(() =>
        service.atualizar(99, { nome: "Novo", email: "novo@email.com" })
      ).toThrow("Cliente nao encontrado");
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    test("propaga o erro quando o novo email ja pertence a outro cliente", () => {
      const clienteExistente = { id: 1, nome: "Ana Souza", email: "ana@email.com" };
      const outroCliente = { id: 2, nome: "Beto", email: "beto@email.com" };

      mockRepository.findById.mockReturnValue(clienteExistente);
      mockRepository.findByEmail.mockReturnValue(outroCliente);

      expect(() =>
        service.atualizar(1, { nome: "Ana Souza", email: "beto@email.com" })
      ).toThrow();
    });
  });

  describe("remover", () => {
    test("chama repository.delete com o id correto quando o cliente existe", () => {
      mockRepository.findById.mockReturnValue({ id: 1, nome: "Ana", email: "ana@email.com" });
      mockRepository.delete.mockReturnValue(true);

      service.remover(1);

      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    test("lanca erro 'Cliente nao encontrado' quando o repository retorna false", () => {
      mockRepository.findById.mockReturnValue(null);
      mockRepository.delete.mockReturnValue(false);

      expect(() => service.remover(99)).toThrow("Cliente nao encontrado");
    });
  });
});
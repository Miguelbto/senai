const DevolucaoRepository = require("../repositories/DevolucaoRepository");
const ProdutoRepository = require("../repositories/ProdutoRepository");

class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

class DevolucaoService {
  async listarDevolucoes() {
    const devolucoes = await DevolucaoRepository.buscarTodasDevolucoes();

    if (!devolucoes) {
      throw new AppError("Nenhuma devolução encontrada", 404);
    }

    return {
      sucesso: true,
      dados: devolucoes,
    };
  }

  async listarDevolucaoPorId(id) {
    if (!id || isNaN(id)) {
      throw new AppError("Id deve ser informado");
    }

    const devolucao = await DevolucaoRepository.buscarDevolucoesPorId(id);

    if (!devolucao) {
      throw new AppError("Nenhuma devolução encontrada", 404);
    }

    return {
      sucesso: true,
      dados: devolucao,
    };
  }

  async criarDevolucao(dados) {
    // 1. Desestruturação dos campos com base na tabela devolucao
    const {
      idCadastro,
      codigoProduto,
      unidades,
      motivo,
      reutilizacao,
      valor,
      dataEntrada,
      etiqueta,
    } = dados;

    // 2. Validação de preenchimento (Campos NOT NULL no banco de dados)
    const camposObrigatorios = {
      codigoProduto,
      unidades,
      motivo,
      reutilizacao,
      valor,
    };

    for (const [campo, valorCampo] of Object.entries(camposObrigatorios)) {
      if (
        valorCampo === undefined ||
        valorCampo === null ||
        valorCampo === ""
      ) {
        throw new Error(
          `O campo '${campo}' é obrigatório e deve ser preenchido.`,
        );
      }
    }

    // 3. Validação de tipos (Strings e Booleano)
    if (
      typeof motivo !== "string" ||
      (etiqueta && typeof etiqueta !== "string")
    ) {
      throw new Error(
        "Os campos 'motivo' e 'etiqueta' devem ser do tipo texto.",
      );
    }

    if (typeof reutilizacao !== "boolean") {
      throw new Error(
        "O campo 'reutilizacao' deve ser um valor booleano (true ou false).",
      );
    }

    // 4. Validação de números (devem ser do tipo number e maiores que zero)
    const camposNumericos = {
      codigoProduto,
      unidades,
      valor,
      ...(idCadastro && { idCadastro }), // Valida idCadastro apenas se for fornecido
    };

    for (const [campo, valorCampo] of Object.entries(camposNumericos)) {
      if (
        typeof valorCampo !== "number" ||
        Number.isNaN(valorCampo) ||
        valorCampo <= 0
      ) {
        throw new Error(
          `O campo '${campo}' deve ser um número válido e maior que zero.`,
        );
      }
    }

    /*
    // 5. Validação da Data (se informada, deve ser igual à data atual)
    if (dataEntrada) {
      const dataAtualFormatada = new Date().toISOString().split("T")[0];
      const dataInformada = new Date(dataEntrada);
      const dataInformadaFormatada = !isNaN(dataInformada)
        ? dataInformada.toISOString().split("T")[0]
        : null;

      if (!dataInformadaFormatada || dataInformadaFormatada) {
        throw new Error("A data deve ser preenchida");
      }
    }

    // 6. Verificação de existência no Banco de Dados
    const produtoExiste = await ProdutoRepository.findById(codigoProduto);
    if (!produtoExiste) {
      throw new Error(
        `Produto com o código ${codigoProduto} não foi encontrado.`,
      );
    }*/

    /*
    if (idCadastro) {
        const funcionarioExiste = await funcionarioRepository.buscarPorId(idCadastro);
        if (!funcionarioExiste) {
            throw new Error(`Funcionário com o ID ${idCadastro} não foi encontrado.`);
        }
    }*/

    // Lógica para salvar a devolução no banco de dados aqui...

    const novaDevolucao = {
      idCadastro: idCadastro,
      codigoProduto: codigoProduto,
      unidades: unidades,
      motivo: motivo,
      reutilizacao: reutilizacao,
      valor: valor,
      dataEntrada: dataEntrada,
      etiqueta: etiqueta,
    };

    const resultado =
      await DevolucaoRepository.cadastrarDevolucao(novaDevolucao);

    return {
      sucesso: true,
      mensagem: "Devolução cadastrada",
      dados: resultado,
    };
  }
}


module.exports = new DevolucaoService()
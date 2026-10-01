const SaidaRepository = require("../repositories/SaidaRepository");
const ProdutoRepository = require("../repositories/ProdutoRepository");

class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

class SaidaService {
  async listarSaidas() {
    const saidas = await SaidaRepository.buscarTodasSaidas();

    return {
      sucesso: true,
      dados: saidas,
      total: saidas.length,
    };
  }

  async listarSaidasPorId(id) {
    if (!id || isNaN(id)) {
      throw new AppError("Id inválido", 400);
    }

    const saida = await SaidaRepository.buscarSaidaPorId(id);

    if (!saida) {
      throw new AppError("Nenhuma saida encontrada", 404);
    }

    return {
      sucesso: true,
      dados: saida,
    };
  }

  async criarSaida(dados) {
    const {
      idCadastro,
      codigoProduto,
      destinatario,
      dataSaida,
      codigoCliente,
      motivo,
      valor,
      unidades,
      lote,
      etiqueta,
      codigoRastreamento,
    } = dados;

    // 1. Validação de presença (campos obrigatórios)
    const camposObrigatorios = [
      idCadastro,
      codigoProduto,
      destinatario,
      dataSaida,
      codigoCliente,
      motivo,
      valor,
      unidades,
      lote,
      etiqueta,
      codigoRastreamento,
    ];

    if (
      camposObrigatorios.some(
        (campo) => campo === undefined || campo === null || campo === "",
      )
    ) {
      throw new Error("Todos os campos devem estar preenchidos.");
    }

    // 2. Validação de strings
    if (typeof destinatario !== "string" || typeof motivo !== "string") {
      throw new Error("Os campos destinatario e motivo devem ser textos.");
    }

    // 3. Validação de números (devem ser do tipo number e maiores que zero)
    const camposNumericos = {
      idCadastro,
      codigoProduto,
      codigoCliente,
      valor,
      unidades,
      codigoRastreamento,
    };

    for (const [campo, valorCampo] of Object.entries(camposNumericos)) {
      if (
        typeof valorCampo !== "number" ||
        Number.isNaN(valorCampo) ||
        valorCampo <= 0
      ) {
        throw new Error(
          `O campo ${campo} deve ser um número válido e maior que zero.`,
        );
      }
    }

    /*
    // 3. Validação da Data de Saída (compara com a data atual do sistema)
    const dataAtual = new Date();
    const dataInformada = new Date(dataSaida);

    // Compara apenas Ano, Mês e Dia (formato YYYY-MM-DD)
    const dataAtualFormatada = dataAtual.toISOString().split("T")[0];
    const dataInformadaFormatada = !isNaN(dataInformada)
      ? dataInformada.toISOString().split("T")[0]
      : null;

    if (!dataInformadaFormatada) {
      throw new Error("A data de saída deve ser informada");
    }*/

    // 4. Validação de existência no Banco de Dados
    const produtoExiste = await ProdutoRepository.findById(codigoProduto);
    if (!produtoExiste) {
      throw new Error(
        `Produto com o código ${codigoProduto} não foi encontrado.`,
      );
    }

    /*
    const clienteExiste = await clienteRepository.buscarPorCodigo(codigoCliente);
    if (!clienteExiste) {
        throw new Error(`Cliente com o código ${codigoCliente} não foi encontrado.`);
    }*/ //Fazer a implementação(urgência média)

    /*
    const loteExiste = await loteRepository.buscarPorCodigo(lote);
    if (!loteExiste) {
        throw new Error(`Lote '${lote}' não foi encontrado.`);
    }*/ //Fazer a implementação(urgência média)

    const novaSaida = {
      idCadastro: idCadastro,
      codigoProduto: codigoProduto,
      destinatario: destinatario,
      dataSaida: dataSaida,
      codigoCliente: codigoCliente,
      motivo: motivo,
      valor: valor,
      unidades: unidades,
      lote: lote,
      etiqueta: etiqueta,
      codigoRastreamento: codigoRastreamento,
    };

    const resultado = await SaidaRepository.cadastrarSaida(novaSaida);

    return {
      sucesso: true,
      mensagem: "Saída cadastrada com sucesso",
      dados: resultado,
    };
  }
}


module.exports = new SaidaService()
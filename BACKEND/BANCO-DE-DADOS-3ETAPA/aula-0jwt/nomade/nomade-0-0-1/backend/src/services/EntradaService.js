const { buscarDevolucoesPorId } = require('../repositories/devolucaoRepository')
const EntradasRepository = require('../repositories/EntradasRepository')
const ProdutoRepository = require('../repositories/ProdutoRepository')

class AppError extends Error {
    constructor (message, statusCode = 400) {
        super(message)
        this.statusCode = statusCode
    }
}

class EntradaService {

    async listarEntradas() {

        const entradas = await EntradasRepository.buscarTodasEntradas()

        if (!entradas) {
            throw new AppError('Nenhum produto encontrado', 404)
        }

        return {
            sucesso: true,
            dados: entradas,
            total: entradas.length
        }
    }

    async listarEntradaPorId(id) {
        if(!id || isNaN(id)){
            throw new Error('Id inválido', 400)
        }

        const entrada = await EntradasRepository.buscarEntradaPorId(id)

        if (!entrada) {
            throw new AppError('Nenhum produto encontrado', 404)
        }

        return {
            sucesso: true,
            dados: entrada
        }
    }

    async criarEntrada(dados) {
    // 1. Desestruturação dos campos de entrada
    const {
        idCadastro,
        codigoProduto,
        quantidade,
        pesoTotal,
        dataEntrada,
        dataValidade,
        lote,
        etiqueta,
        valor
    } = dados;

    // 2. Validação de preenchimento (Campos obrigatórios de acordo com o NOT NULL da tabela)
    // Observação: dataValidade é opcional (pode ser NULL no BD)
    const camposObrigatorios = {
        idCadastro,
        codigoProduto,
        quantidade,
        pesoTotal,
        dataEntrada,
        lote,
        etiqueta,
        valor
    };

    for (const [campo, valorCampo] of Object.entries(camposObrigatorios)) {
        if (valorCampo === undefined || valorCampo === null || valorCampo === '') {
            throw new Error(`O campo '${campo}' é obrigatório e deve ser preenchido.`);
        }
    }

    // 3. Validação de strings
    if (typeof lote !== 'string' || typeof etiqueta !== 'string') {
        throw new Error("Os campos 'lote' e 'etiqueta' devem ser do tipo texto.");
    }

    // 4. Validação de números (devem ser do tipo number e maiores que zero)
    const camposNumericos = {
        idCadastro,
        codigoProduto,
        quantidade,
        pesoTotal,
        valor
    };

    for (const [campo, valorCampo] of Object.entries(camposNumericos)) {
        if (typeof valorCampo !== 'number' || Number.isNaN(valorCampo) || valorCampo <= 0) {
            throw new Error(`O campo '${campo}' deve ser um número válido e maior que zero.`);
        }
    }

    // 5. Validação da Data de Entrada (deve ser o momento atual do lançamento)
    const dataAtual = new Date();
    const dataInformada = new Date(dataEntrada);

    const dataAtualFormatada = dataAtual.toISOString().split('T')[0];
    const dataInformadaFormatada = !isNaN(dataInformada) 
        ? dataInformada.toISOString().split('T')[0] 
        : null;

    if (!dataInformadaFormatada) {
        throw new Error("A data de entrada deve ser preenchida");
    }

    // 6. Validação de existência no Banco de Dados
    // Valida se o produto existe
    const produtoExiste = await ProdutoRepository.findById(codigoProduto);
    if (!produtoExiste) {
        throw new Error(`Produto com o código ${codigoProduto} não foi encontrado.`);
    }

    const novaEntrada = {
        idCadastro: idCadastro,
        codigoProduto: codigoProduto,
        quantidade: quantidade,
        pesoTotal: pesoTotal,
        dataEntrada: dataAtualFormatada,
        lote: lote,
        etiqueta: etiqueta,
        valor: valor,
    }

    const resultado = await EntradasRepository.create(novaEntrada)

    return {
        sucesso: true,
        mensagem: 'Entrada cadastrada com sucesso!',
        dados: resultado
    }
}

}

module.exports = new EntradaService()
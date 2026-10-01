const CardapioService = require('../services/CardapioService');

function formatarProdutoResumo(p) {
    return {
        id: p.id,
        nome: p.nome,
        descricao: p.descricao,
        preco: Number(p.preco),
        categoria: p.categoria || '',
        disponivel: !!p.disponivel
    };
}

function formatarCardapio(c) {
    if (!c) return c;
    return {
        id: c.id,
        nome: c.nome,
        descricao: c.descricao || '',
        disponivel: !!c.disponivel,
        produtos: {
            produto: (c.produtos || []).map(formatarProdutoResumo)
        }
    };
}

// node-soap entrega arrays simples (ex: <id>1</id><id>2</id>) como array JS
// quando maxOccurs="unbounded"; se vier só 1 elemento, pode chegar como valor
// único em vez de array — por isso o normalizeArray abaixo.
function normalizeArray(value) {
    if (value === undefined || value === null) return [];
    return Array.isArray(value) ? value : [value];
}

module.exports = {
    CardapioService: {
        CardapioPort: {

            async ListarCardapios() {
                const resultado = await CardapioService.listarCardapios();
                return {
                    sucesso: resultado.sucesso,
                    total: resultado.total,
                    cardapios: {
                        cardapio: resultado.cardapios.map(formatarCardapio)
                    }
                };
            },

            async BuscarCardapioPorId(args) {
                const resultado = await CardapioService.buscarCardapioPorId(args.id);
                return {
                    sucesso: resultado.sucesso,
                    cardapio: formatarCardapio(resultado.cardapio)
                };
            },

            async CadastrarCardapio(args) {
                const produtoIds = normalizeArray(args.produtoIds && args.produtoIds.id)
                    .map(Number);

                const resultado = await CardapioService.cadastrarCardapio({
                    nome: args.nome,
                    descricao: args.descricao,
                    disponivel: args.disponivel,
                    produtoIds
                });
                return resultado;
            },

            async DeletarCardapio(args) {
                const resultado = await CardapioService.deletarCardapio(args.id);
                return resultado;
            }
        }
    }
};

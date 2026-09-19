const ProdutoService = require('../services/ProdutoService');

/**
 * Este objeto é o "binding": o node-soap casa cada chave aqui com uma
 * <operation> do WSDL (ProdutoPortType). Cada função recebe os argumentos
 * já parseados do XML de entrada e deve devolver um objeto que será
 * serializado de volta para XML conforme o *Response definido no WSDL.
 *
 * Assinatura padrão do node-soap: (args, callback, headers, req)
 * Aqui usamos a versão que retorna uma Promise (suportado desde node-soap 0.x
 * recente) para poder usar async/await direto.
 */
function formatarProduto(p) {
    if (!p) return p;
    return {
        id: p.id,
        nome: p.nome,
        descricao: p.descricao,
        preco: Number(p.preco),
        categoria: p.categoria || '',
        imagem: p.imagem || '',
        disponivel: !!p.disponivel
    };
}

module.exports = {
    ProdutoService: {
        ProdutoPort: {

            async ListarProdutos() {
                const resultado = await ProdutoService.listarProdutos();
                return {
                    sucesso: resultado.sucesso,
                    total: resultado.total,
                    produtos: {
                        produto: resultado.produtos.map(formatarProduto)
                    }
                };
            },

            async BuscarProdutoPorId(args) {
                const resultado = await ProdutoService.buscarProdutoPorId(args.id);
                return {
                    sucesso: resultado.sucesso,
                    produto: formatarProduto(resultado.produto)
                };
            },

            async CadastrarProduto(args) {
                const resultado = await ProdutoService.cadastrarProduto(args);
                return resultado;
            },

            async AtualizarProduto(args) {
                const { id, ...dados } = args;
                const resultado = await ProdutoService.atualizarProduto(id, dados);
                return resultado;
            },

            async DeletarProduto(args) {
                const resultado = await ProdutoService.deletarProduto(args.id);
                return resultado;
            }
        }
    }
};

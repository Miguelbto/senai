const ProdutoRepository = require('../repositories/ProdutoRepositorie.js')

class ProdutoService {

    async listarProdutos () {
        const produto = await ProdutoRepository.listarProdutos

        return {
            sucesso: true,
            dados: produto,
            total: produto.length

        }
    }

    async buscarProdutoPorId (id) {
        
        if(!id || isNaN(id)){
            throw {status: 400, mensagem: 'ID inválido'}
        }

        const produto = await ProdutoRepository.buscarProdutoPorId(id)

        if(!produto){
            throw {status:404, mensagem:'Produto não encontrado'}
        }

        return {
            sucesso: true,
            dados: produto
        }
    }
}
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

    async cadastrarProduto (dados) {
        const { nome, descricao, preco, categoria, disponivel } = dados

        if (!nome || !descricao || preco === undefined){
            throw{
                status: 400,
                mensagem: "Nome, descrição e preço devem ser preenchidos"
            }
        }

        if (typeof preco !== "number" || preco <= 0){
            throw {
                status: 400,
                mensagem: "Preço deve ser um número positivo"
            }
        }

        const novoProduto = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco,
            categoria: categoria || null,
            disponivel: disponivel || true

        }

        const resultado = await ProdutoRepository.cadastrarProduto(novoProduto)

        return {
            sucesso: true,
            mensagem: "Produto cadastrado com sucesso", 
            resultado
        }


    }

    async atualizarProduto (id, dados){
        if (!id || isNaN(id)){
            throw{
                status: 400,
                mensagem: "ID inválido"
            }
        }

        const produtoId = await ProdutoRepository.buscarProdutoPorId(id)

        if (!produtoId){
            throw{
                status: 404,
                mensagem: "Produto não encontrado"
            }
        }

        const produtoAtualizado = { }

        const { nome, preco, descricao, categoria, disponivel} = dados

        if (nome !== undefined) produtoAtualizado.nome = nome.trim()
        if (descricao !== undefined) produtoAtualizado.descricao = descricao.trim()
        if (preco !== undefined){
            if(typeof preco !== "number" || preco ){
                throw{
                    status: 400,
                    mensagem: "Preço deve ser um número positivo",
                }
            }
            produtoAtualizado.preco = preco
        }

        if (categoria !== undefined) produtoAtualizado.categoria = categoria
        if (disponivel !== undefined) produtoAtualizado.disponivel = disponivel

        if (Object.keys(produtoAtualizado).length === 0 ){
            throw{
                status: 400,
                mensagem:"Nenhum dado válido enviado para atualização"
            }
        }
        
        await ProdutoRepository.atualizarProduto(id, produtoAtualizado)
        return{
            sucesso:true,
            mensagem: "Produto atualizado"
        }

    }


    async deletarProduto (id) {

        if (!id || isNaN(id)){
            throw{
                status: 400,
                mensagem: "ID inválido"
            }
        }

        const produtoId = await ProdutoRepository.buscarProdutoPorId(id)

        if (!produtoId){
            throw{
                status: 404,
                mensagem: "Produto não encontrado"
            }
        }

        await ProdutoRepository.apagarProduto(id)
        return {
            status: 200,
            mensagem: "Produto apagado"
        }

    }

}


module.exports = new ProdutoService()
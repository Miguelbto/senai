// CORREÇÃO: Verifique se o nome do arquivo é 'ProdutoRepository.js' ou 'ProdutoRepositorie.js' para evitar erro de caminho
const ProdutoRepository = require('../repositories/ProdutoRepositorie') 
const fs = require('fs').promises
const path = require('path')      
class ProdutoService {

    async listarProdutos () {
        const produto = await ProdutoRepository.listarProdutos()

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

    async cadastrarProduto (dados, file) {
        const { nome, descricao, preco, categoria, disponivel } = dados

        if (!nome || !descricao || preco === undefined){
            throw{
                status: 400,
                mensagem: "Nome, descrição e preço devem ser preenchidos"
            }
        }


        const precoNumerico = Number(preco)
        if (isNaN(precoNumerico) || precoNumerico <= 0){
            throw {
                status: 400,
                mensagem: "Preço deve ser um número positivo"
            }
        }

        const novoProduto = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco: precoNumerico,
            categoria: categoria || null,
            disponivel: disponivel === 'false' ? false : true
        }

        if (file) {
            novoProduto.imagem_url = file.path
        }

        const resultado = await ProdutoRepository.cadastrarProduto(novoProduto)

        return {
            sucesso: true,
            mensagem: "Produto cadastrado com sucesso", 
            resultado
        }
    }

    async atualizarProduto (id, dados, file){
        if (!id || isNaN(id)){
            throw{
                status: 400,
                mensagem: "ID inválido"
            }
        }

        // Buscando o produto para obter o objeto correto vindo do banco desestruturado
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
            const precoNumerico = Number(preco)
            if(isNaN(precoNumerico) || precoNumerico <= 0 ){
                throw{
                    status: 400,
                    mensagem: "Preço deve ser um número positivo",
                }
            }
            produtoAtualizado.preco = precoNumerico
        }

        if (categoria !== undefined) produtoAtualizado.categoria = categoria
        
        if (disponivel !== undefined) {
            // CORREÇÃO: Convertendo string para booleano
            produtoAtualizado.disponivel = disponivel === 'false' ? false : true
        }

        if (file) {
            if (produtoId.imagem_url) {
                const caminhoAntigo = path.join(process.cwd(), produtoId.imagem_url) //cwd: Descobre qual e´o caminho raiz do projeto
                await fs.unlink(caminhoAntigo).catch(() => {}) // fs.unlink - Serve para desvincular o arquivo do disco, o catch fala pro node tentar apagar e caso não dê certo ele continua rodando normalmente a API
            }
            
            produtoAtualizado.imagem_url = `uploads/${file.filename}`;
        }

        if (Object.keys(produtoAtualizado).length === 0 && !file){
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

        if (produtoId.imagem_url) {
            const caminhoArquivo = path.join(process.cwd(), produtoId.imagem_url) // o cwd descrobre o caminho absoluto so sistema operacional, o produtoid_imagem_url é o caminho para acessar as imagens, path.join pega os dois caminhos anteriores e junta em um único texto
            // CORREÇÃO: Trocado 'FileSystem.unlink' por 'fs.unlink'
            await fs.unlink(caminhoArquivo).catch(() => {}) //remover o link, com o fs a função se torna assíncrona, esperando o disco rígido apagar o arquivo antes de continuar, esse catch tem a função de caso alguém apague manualmente a foto, o código continua rodando e apaga o produto com ou sem a imagem, dando um erro silencioso ao invés de para o código tudo
        }

        await ProdutoRepository.apagarProduto(id)
        return {
            status: 200,
            mensagem: "Produto apagado"
        }
    }
}

module.exports = new ProdutoService()
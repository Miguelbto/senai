const ProdutoService = require("../services/produtoService")

class ProdutoController {

    async listarProduto (req, res){
        try {

            const resultado = await ProdutoService.listarProdutos()
            res.json(resultado)
            
        } catch (erro) {

            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            })
            
        }

    }


    async buscarProdutoPorId (req, res) {
        try {

            const resultado = await ProdutoService.buscarProdutoPorId(req.params.id)
            res.json(resultado)
            
        } catch (erro) {

            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            })
            
        }
    }

    async cadastrarProduto (req, res){
        try {

            const resultado = await ProdutoService.cadastrarProduto(req.body, req.file)
            res.json(resultado)
            
        } catch (erro) {
            
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            })
        }
    }

    async atualizarProduto (req, res) {

        try {

            const resultado = await ProdutoService.atualizarProduto(req.params.id, req.body, req.file)
            res.json(resultado)
            
        } catch (erro) {

            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            })
            
        }
         
    }

    async deletarProduto (req, res) {

        try {
             const resultado = await ProdutoService.deletarProduto(req.params.id)
            res.json(resultado)
            
        } catch (erro) {

            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            })
            
        }

       
    }

}

<<<<<<< Updated upstream

module.exports = new ProdutoController()
=======
/*

const produtoService = require('../services/produto.service');

class ProdutoController {
    async listarProdutos(req, res) {
        try {
            const produtos = await produtoService.listarProdutos();
            return res.status(200).json(produtos);
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }

    async buscarProdutoPorId(req, res) {
        try {
            const { id } = req.params;
            const produto = await produtoService.buscarProdutoPorId(id);
            return res.status(200).json(produto);
        } catch (erro) {
            // Se o erro for de "não encontrado" gerado pelo service, pode retornar 404
            return res.status(404).json({ erro: erro.message });
        }
    }

    async cadastrarProduto(req, res) {
        try {
            const dadosDoProduto = req.body;
            const novoProduto = await produtoService.cadastrarProduto(dadosDoProduto);
            return res.status(201).json(novoProduto); // 201: Created
        } catch (erro) {
            return res.status(400).json({ erro: erro.message }); // 400: Bad Request
        }
    }

    async atualizarProduto(req, res) {
        try {
            const { id } = req.params;
            const dadosDoProduto = req.body;
            const produtoAtualizado = await produtoService.atualizarProduto(id, dadosDoProduto);
            return res.status(200).json(produtoAtualizado);
        } catch (erro) {
            return res.status(400).json({ erro: erro.message });
        }
    }

    async apagarProduto(req, res) {
        try {
            const { id } = req.params;
            await produtoService.apagarProduto(id);
            return res.status(200).json({ mensagem: 'Produto apagado com sucesso!' });
        } catch (erro) {
            return res.status(400).json({ erro: erro.message });
        }
    }
}

module.exports = new ProdutoController();

*/
>>>>>>> Stashed changes

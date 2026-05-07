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

            const resultado = await ProdutoService.cadastrarProduto(req.body)
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

            const resultado = await ProdutoService.atualizarProduto(req.params.id, req.body)
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


module.exports = new ProdutoController()
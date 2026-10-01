const ProdutoService = require('../services/ProdutoService');

class ProdutoController {

        async listarAtivos(req, res) {
    try {
        const produtos = await ProdutoService.listarAtivos();
        return res.status(200).json({ sucesso: true, dados: produtos });
    } catch (erro) {
        return res.status(500).json({ sucesso: false, mensagem: erro.message });
    }
    }

    async listarDesativados(req, res) {
    try {
        const produtos = await ProdutoService.listarDesativados();
        return res.status(200).json({ sucesso: true, dados: produtos });
    } catch (erro) {
        return res.status(500).json({ sucesso: false, mensagem: erro.message });
    }
    }

    async buscarPorId(req, res) {
        try {

            const resultado = await ProdutoService.buscarProdutoPorId(req.params.id);

            res.json(resultado);

        } catch (erro) {

            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });

        }
    }

    

async cadastrar(req, res) {
    try {
        console.log("REQ.BODY:", req.body);

        const resultado = await ProdutoService.cadastrarProduto(req.body);

        res.status(201).json(resultado);

    } catch (erro) {
        res.status(erro.status || 500).json({
            sucesso: false,
            mensagem: erro.mensagem || 'Erro interno do servidor',
            erro: erro.toString()
        });
    }
}

    async atualizar(req, res) {
        try {

            const resultado = await ProdutoService.atualizarProduto(
                req.params.id,
                req.body
            );

            res.json(resultado);

        } catch (erro) {

            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });

        }
    }

}

module.exports = new ProdutoController();

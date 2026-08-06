const produtoService = require('../services/produtoService')

exports.deletarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await produtoService.remover(id);
        
        return res.status(200).json({
            sucesso: true,
            mensagem: 'Produto deletado com sucesso'
        });
    } catch (erro) {
        const status = erro.status || 500;
        return res.status(status).json({
            sucesso: false,
            mensagem: erro.message || 'Erro interno'
        });
    }
};
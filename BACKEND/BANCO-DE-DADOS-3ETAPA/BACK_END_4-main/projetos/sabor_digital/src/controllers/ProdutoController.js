const ProdutoService = require('../services/ProdutoService');

class ProdutoController {
    async listar(req, res) {
        try {
            const resultado = await ProdutoService.listarProdutos();
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
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
        /*  #swagger.consumes = ['multipart/form-data']
            #swagger.parameters['nome'] = { in: 'formData', type: 'string', required: true, description: 'Nome do produto' }
            #swagger.parameters['descricao'] = { in: 'formData', type: 'string', required: true, description: 'Descrição do produto' }
            #swagger.parameters['preco'] = { in: 'formData', type: 'number', required: true, description: 'Preço do produto (Ex: 35.50)' }
            #swagger.parameters['categoria'] = { in: 'formData', type: 'string', required: true, description: 'Categoria (Ex: Massa, Bebida)' }
            #swagger.parameters['disponivel'] = { in: 'formData', type: 'boolean', required: false, description: 'Status de disponibilidade (1 ou 0)' }
            #swagger.parameters['imagem'] = { in: 'formData', type: 'file', required: false, description: 'Imagem do produto (JPEG, PNG)' }
        */
        try {
            const dados = { ...req.body, file: req.file };
            const resultado = await ProdutoService.cadastrarProduto(dados);
            res.status(201).json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

    async atualizar(req, res) {
        /*  #swagger.consumes = ['multipart/form-data']
            #swagger.parameters['nome'] = { in: 'formData', type: 'string', required: false }
            #swagger.parameters['descricao'] = { in: 'formData', type: 'string', required: false }
            #swagger.parameters['preco'] = { in: 'formData', type: 'number', required: false }
            #swagger.parameters['categoria'] = { in: 'formData', type: 'string', required: false }
            #swagger.parameters['disponivel'] = { in: 'formData', type: 'boolean', required: false }
            #swagger.parameters['imagem'] = { in: 'formData', type: 'file', required: false }
        */
        try {
            const dados = { ...req.body, file: req.file };
            const resultado = await ProdutoService.atualizarProduto(req.params.id, dados);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

    async deletar(req, res) {
        try {
            const resultado = await ProdutoService.deletarProduto(req.params.id);
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

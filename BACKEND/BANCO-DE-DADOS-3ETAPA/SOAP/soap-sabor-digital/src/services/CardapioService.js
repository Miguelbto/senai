const CardapioRepository = require('../repositories/CardapioRepository');
const ProdutoRepository = require('../repositories/ProdutoRepository');

class CardapioService {
    async listarCardapios() {
        const cardapios = await CardapioRepository.findAll();
        return {
            sucesso: true,
            total: cardapios.length,
            cardapios
        };
    }

    async buscarCardapioPorId(id) {
        if (!id || isNaN(id)) {
            throw new Error('ID inválido');
        }

        const cardapio = await CardapioRepository.findById(id);
        if (!cardapio) {
            throw new Error('Cardápio não encontrado');
        }

        return { sucesso: true, cardapio };
    }

    async cadastrarCardapio(dados) {
        const { nome, descricao, disponivel, produtoIds } = dados;

        if (!nome) {
            throw new Error('O nome do cardápio é obrigatório');
        }

        if (!produtoIds || !Array.isArray(produtoIds) || produtoIds.length === 0) {
            throw new Error('O cardápio deve conter pelo menos um produto vinculado (lista de IDs)');
        }

        const produtosUnicos = [...new Set(produtoIds)];
        for (const produtoId of produtosUnicos) {
            const produtoExistente = await ProdutoRepository.findById(produtoId);
            if (!produtoExistente) {
                throw new Error(`Produto com ID ${produtoId} não encontrado. Cadastro de cardápio cancelado.`);
            }
        }

        const novoCardapio = {
            nome: nome.trim(),
            descricao: descricao ? descricao.trim() : null,
            disponivel: disponivel === false || disponivel === 'false' ? false : true
        };

        const id = await CardapioRepository.create(novoCardapio, produtosUnicos);

        return {
            sucesso: true,
            mensagem: 'Cardápio cadastrado com sucesso',
            id
        };
    }

    async deletarCardapio(id) {
        if (!id || isNaN(id)) {
            throw new Error('ID inválido');
        }

        const existe = await CardapioRepository.findById(id);
        if (!existe) {
            throw new Error('Cardápio não encontrado');
        }

        await CardapioRepository.delete(id);

        return {
            sucesso: true,
            mensagem: 'Cardápio apagado com sucesso'
        };
    }
}

module.exports = new CardapioService();

const ProdutoRepository = require('../repositories/ProdutoRepository');

// Mesma regra de negócio da versão REST original, só que agora lança
// Error simples em vez de { status, mensagem }, porque quem trata o
// erro para o formato certo (SOAP Fault) é a camada src/soap/*.js.
class ProdutoService {
    async listarProdutos() {
        const produtos = await ProdutoRepository.findAll();
        return {
            sucesso: true,
            total: produtos.length,
            produtos
        };
    }

    async buscarProdutoPorId(id) {
        if (!id || isNaN(id)) {
            throw new Error('ID inválido');
        }

        const produto = await ProdutoRepository.findById(id);
        if (!produto) {
            throw new Error('Produto não encontrado');
        }

        return { sucesso: true, produto };
    }

    async cadastrarProduto(dados) {
        let { nome, descricao, preco, categoria, disponivel, imagem } = dados;

        if (typeof preco === 'string') {
            preco = parseFloat(preco);
        }

        if (!nome || !descricao || preco === undefined || isNaN(preco)) {
            throw new Error('Nome, descrição e preço são obrigatórios e devem ser válidos');
        }

        if (preco <= 0) {
            throw new Error('Preço deve ser um número positivo');
        }

        const novoProduto = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco,
            categoria: categoria || null,
            // No REST original a imagem vinha de upload (multer). Em SOAP não há
            // multipart/form-data nativo, então aqui ela é apenas uma URL/string
            // já pronta (ex: o cliente sobe a imagem em outro lugar e manda o link).
            imagem: imagem || null,
            disponivel: disponivel === false || disponivel === 'false' ? false : true
        };

        const id = await ProdutoRepository.create(novoProduto);

        return {
            sucesso: true,
            mensagem: 'Produto cadastrado com sucesso',
            id
        };
    }

    async atualizarProduto(id, dados) {
        if (!id || isNaN(id)) {
            throw new Error('ID inválido');
        }

        const existe = await ProdutoRepository.findById(id);
        if (!existe) {
            throw new Error('Produto não encontrado');
        }

        const atualizado = {};
        let { nome, descricao, preco, categoria, disponivel, imagem } = dados;

        if (nome !== undefined && nome !== null && nome !== '') atualizado.nome = nome.trim();
        if (descricao !== undefined && descricao !== null && descricao !== '') atualizado.descricao = descricao.trim();
        if (preco !== undefined && preco !== null) {
            if (typeof preco === 'string') preco = parseFloat(preco);
            if (isNaN(preco) || preco <= 0) {
                throw new Error('Preço deve ser um número positivo');
            }
            atualizado.preco = preco;
        }
        if (categoria !== undefined && categoria !== null) atualizado.categoria = categoria;
        if (imagem !== undefined && imagem !== null) atualizado.imagem = imagem;
        if (disponivel !== undefined && disponivel !== null) {
            atualizado.disponivel = disponivel === false || disponivel === 'false' ? false : true;
        }

        if (Object.keys(atualizado).length === 0) {
            throw new Error('Nenhum dado válido enviado para atualização');
        }

        await ProdutoRepository.update(id, atualizado);

        return {
            sucesso: true,
            mensagem: 'Produto atualizado com sucesso'
        };
    }

    async deletarProduto(id) {
        if (!id || isNaN(id)) {
            throw new Error('ID inválido');
        }

        const existe = await ProdutoRepository.findById(id);
        if (!existe) {
            throw new Error('Produto não encontrado');
        }

        await ProdutoRepository.delete(id);

        return {
            sucesso: true,
            mensagem: 'Produto apagado com sucesso'
        };
    }
}

module.exports = new ProdutoService();

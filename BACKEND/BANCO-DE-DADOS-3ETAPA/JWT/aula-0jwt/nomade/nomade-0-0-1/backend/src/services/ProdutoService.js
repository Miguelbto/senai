const ProdutoRepository = require('../repositories/ProdutoRepository');

class ProdutoService {


async listarAtivos() {
    const produtosAtivos = await ProdutoRepository.findAtivos();
    return produtosAtivos;
}

async listarDesativados() {
    const produtosDesativados = await ProdutoRepository.findDesativados();
    return produtosDesativados;
}

    async buscarProdutoPorId(id) {

        if (!id || isNaN(id)) {
            throw {
                status: 400,
                mensagem: "ID inválido."
            };
        }

        const produto = await ProdutoRepository.findById(id);

        if (!produto) {
            throw {
                status: 404,
                mensagem: "Produto não encontrado."
            };
        }

        return {
            sucesso: true,
            dados: produto
        };

    }

    async cadastrarProduto(dados) {

        let {
            nome_produto,
            descricao,
            fornecedor,
            quantidade,
            etiqueta,
            lote,
            data_entrada,
            data_validade,
            valor,
            peso,
            fk_funcionario_cargo_id,
            ativo
        } = dados;

        if (
            !nome_produto ||
            quantidade == null ||
            !etiqueta ||
            !lote ||
            !data_entrada ||
            valor == null ||
            peso == null ||
            !fk_funcionario_cargo_id
        ) {
            throw {
                status: 400,
                mensagem: "Preencha todos os campos obrigatórios."
            };
        }

        quantidade = Number(quantidade);
        valor = Number(valor);
        peso = Number(peso);
        fk_funcionario_cargo_id = Number(fk_funcionario_cargo_id);

        if (isNaN(quantidade) || quantidade < 0) {
            throw {
                status: 400,
                mensagem: "Quantidade deve ser maior ou igual a zero."
            };
        }

        if (isNaN(valor) || valor <= 0) {
            throw {
                status: 400,
                mensagem: "Valor deve ser maior que zero."
            };
        }

        if (isNaN(peso) || peso <= 0) {
            throw {
                status: 400,
                mensagem: "Peso deve ser maior que zero."
            };
        }

        if (ativo === undefined) {
            ativo = true;
        }

        if (typeof ativo === "string") {
            ativo = ativo.toLowerCase() === "true";
        }

        const novoProduto = {

            nome_produto: nome_produto.trim(),

            descricao: descricao
                ? descricao.trim()
                : null,

            fornecedor: fornecedor
                ? fornecedor.trim()
                : null,

            quantidade,

            etiqueta: etiqueta.trim(),

            lote: lote.trim(),

            data_entrada,

            data_validade: data_validade || null,

            valor,

            peso,

            fk_funcionario_cargo_id,

            ativo

        };

        const id = await ProdutoRepository.create(novoProduto);

        return {

            sucesso: true,

            mensagem: "Produto cadastrado com sucesso.",

            id

        };

    }

    async atualizarProduto(id, dados) {

        if (!id || isNaN(id)) {
            throw {
                status: 400,
                mensagem: "ID inválido."
            };
        }

        const produto = await ProdutoRepository.findById(id);

        if (!produto) {
            throw {
                status: 404,
                mensagem: "Produto não encontrado."
            };
        }

        const atualizado = {};

        let {

            nome_produto,

            descricao,

            fornecedor,

            quantidade,

            etiqueta,

            lote,

            data_entrada,

            data_validade,

            valor,

            peso,

            fk_funcionario_cargo_id,

            ativo

        } = dados;

                if (nome_produto !== undefined) {

            if (!nome_produto.trim()) {
                throw {
                    status: 400,
                    mensagem: "Nome do produto é obrigatório."
                };
            }

            atualizado.nome_produto = nome_produto.trim();

        }

        if (descricao !== undefined) {

            atualizado.descricao = descricao
                ? descricao.trim()
                : null;

        }

        if (fornecedor !== undefined) {

            atualizado.fornecedor = fornecedor
                ? fornecedor.trim()
                : null;

        }

        if (quantidade !== undefined) {

            quantidade = Number(quantidade);

            if (isNaN(quantidade) || quantidade < 0) {
                throw {
                    status: 400,
                    mensagem: "Quantidade deve ser maior ou igual a zero."
                };
            }

            atualizado.quantidade = quantidade;

        }

        if (etiqueta !== undefined) {

            if (!etiqueta.trim()) {
                throw {
                    status: 400,
                    mensagem: "Etiqueta é obrigatória."
                };
            }

            atualizado.etiqueta = etiqueta.trim();

        }

        if (lote !== undefined) {

            if (!lote.trim()) {
                throw {
                    status: 400,
                    mensagem: "Lote é obrigatório."
                };
            }

            atualizado.lote = lote.trim();

        }

        if (data_entrada !== undefined) {

            atualizado.data_entrada = data_entrada;

        }

        if (data_validade !== undefined) {

            atualizado.data_validade = data_validade || null;

        }

        if (valor !== undefined) {

            valor = Number(valor);

            if (isNaN(valor) || valor <= 0) {

                throw {
                    status: 400,
                    mensagem: "Valor deve ser maior que zero."
                };

            }

            atualizado.valor = valor;

        }

        if (peso !== undefined) {

            peso = Number(peso);

            if (isNaN(peso) || peso <= 0) {

                throw {
                    status: 400,
                    mensagem: "Peso deve ser maior que zero."
                };

            }

            atualizado.peso = peso;

        }

        if (fk_funcionario_cargo_id !== undefined) {

            fk_funcionario_cargo_id = Number(fk_funcionario_cargo_id);

            if (isNaN(fk_funcionario_cargo_id)) {

                throw {
                    status: 400,
                    mensagem: "Funcionário inválido."
                };

            }

            atualizado.fk_funcionario_cargo_id = fk_funcionario_cargo_id;

        }

        if (ativo !== undefined) {

            if (typeof ativo === "string") {

                ativo = ativo.toLowerCase() === "true";

            }

            atualizado.ativo = ativo;

        }

                if (Object.keys(atualizado).length === 0) {

            throw {
                status: 400,
                mensagem: "Nenhum dado enviado para atualização."
            };

        }

        await ProdutoRepository.update(id, atualizado);

        return {

            sucesso: true,
            mensagem: "Produto atualizado com sucesso."

        };

    }

}

module.exports = new ProdutoService();

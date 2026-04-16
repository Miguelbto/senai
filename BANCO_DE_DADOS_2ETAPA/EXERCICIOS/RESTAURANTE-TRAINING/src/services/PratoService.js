const produtoModel = require('../models/produtoModel');

exports.remover = async (id) => {
    // Validação de ID (Pilar da Consistência)
    if (!id || isNaN(id)) {
        throw { status: 400, message: 'ID produto inválido' };
    }

    const produto = await produtoModel.buscarPorId(id);
    if (!produto) {
        throw { status: 404, message: 'Produto não encontrado' };
    }

    return await produtoModel.deletar(id);
};
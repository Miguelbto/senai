const db = require('../config/db'); // onde está seu queryAsync

exports.buscarPorId = async (id) => {
    return await db.queryAsync('SELECT * FROM produto WHERE id = ?', [id]);
};

exports.deletar = async (id) => {
    return await db.queryAsync('DELETE FROM produto WHERE id = ?', [id]);
};
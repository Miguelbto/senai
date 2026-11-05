const pool = require('../config/database')


class UsuarioRepository {
    // CREATE
    async criar(usuario) {
        const { nome, email, senha } = usuario
        const [result] = await pool.query(`
            INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?) `, [nome, email, senha])

        return result.insertId;
    }

}
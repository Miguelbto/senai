const pool = require("../config/database");

class UsuarioRepository {

  async create({ nome, email, senha, papel = 'user' }) {
    const [result] = await pool.query(
      `INSERT INTO usuarios (nome, email, senha, papel) VALUES (?, ?, ?, ?)`,
      [nome, email, senha, papel]
    );

    // MySQL não tem RETURNING — buscamos o registro criado usando o insertId
    const [rows] = await pool.query(
      `SELECT id, nome, email, papel, criado_em FROM usuarios WHERE id = ?`,
      [result.insertId]
    );

    return rows[0];
  }

  async findByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );
    return rows[0]; // undefined se não encontrar
  }

  // --- refresh token ---
  async salvarRefreshToken(usuarioId, token, expiraEm) {
    await pool.query(
      `INSERT INTO refresh_tokens (usuario_id, token, expira_em) VALUES (?, ?, ?)`,
      [usuarioId, token, expiraEm]
    );
  }

  async buscarRefreshToken(token) {
    const [rows] = await pool.query(
      'SELECT * FROM refresh_tokens WHERE token = ?',
      [token]
    );
    return rows[0];
  }

  async removerRefreshToken(token) {
    await pool.query('DELETE FROM refresh_tokens WHERE token = ?', [token]);
  }

}


module.exports = new UsuarioRepository()

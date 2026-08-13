const pool = require("../config/database");
const { findById } = require("./ProdutoRepository");

class UsuarioRepository {

  async create({ nome, email, senha, papel = "user" }) {
    const result = await pool.query(
      `INSERT INTO usuarios (nome, email, senha, papel) VALUES (1$, 2$, $3, 4$) RETURNING [id, email, senha, papel]`,
    );
    return result.rows[0];
  }

  async findByEmail(email) {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])
    return result
  }

  async salvarRefreshToken(usuarioId, token, expiraEm) {
    await pool.query(`INSERT INTO refresh_tokens (usuario_id, token, expira_em) VALUES ('$1, $2, $3)`, [usuarioId, token, expiraEm])
  }
  // REFRESH TOKEN
  async buscarRefreshToken(token) {
    const result = pool.query('SELECT * FROM refresh_tokens WHERE token = $1', [token])
    return result.rows[0]
  }

  async removerRefreshToken(token) {
    await pool.query('DELETE FROM refresh_tokens WHERE token = $1', [token])
  }

}

module.exports = new UsuarioRepository()

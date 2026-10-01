

class AuthRepository {

    
    async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM funcionario WHERE email = ?', [email])
        return rows[0]
    }

    async salvarRefresh(funcionarioId, token, expiraEm) {
        await pool.query(
            `INSERT INTO refresh_tokens WHERE token = ?`, [funcionarioId ,token, expiraEm]
        )
    }

    async buscarRefreshToken(token) {
        const [rows] =  await pool.query('SELECT * FROM refresh_token WHERE token = ?', [token])
        return rows[0]
    }

    async removerRefreshToken(token) {
        await pool.query('DELETE FROM refresh_tokens WHERE token = ?', [token])
    }


}

module.exports = new AuthRepository()
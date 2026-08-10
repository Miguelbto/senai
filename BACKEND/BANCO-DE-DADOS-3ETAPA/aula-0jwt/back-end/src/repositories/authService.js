const pool = require('../config/database')

class UserRepository {

    /**
   * Busca um usuário pelo e-mail
   * @param {string} email 
   * @returns {Promise<Object|null>}
   */

    async findByEmail (email) {
        const query = `SELECT id, name, email, role, created_at FROM users WHERE email = ? LIMIT 1`


        const [rows] = await pool.execute(query, [email])

        // verificação existência usuário
        return rows.length > 0 ? rows[0] : null
    }

    /** 
     * @param {object} userData
     * @return {Promise<Object>}
     */

    async create({ name, email, password, role }) {
        const query = `INSERT INTO users ( email, name, password, role) VALUES (?, ?, ?, ?)`

        const id = 

        await pool.execute(query, [name, email, password, role])

        return { 
            name, 
            email,
            role
        }
    }
}

module.exports = UserRepository()
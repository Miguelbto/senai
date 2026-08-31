const pool = require('../config/database')

class UserRepository {

    async createUser(userData) {

        const { nome, email, password, role } = userData
        const [ result ] = await pool.query('INSERT INTO user (name, email, passwor, role) VALUES (?, ?, ?, ? ', [nome, email, password, role || 'client'])

        return result.insertId
    }

    async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM user WHERE email = ? ', [email])
        return rows[0]
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT id, nome, email, role, criado_em FROM user WHERE id = ?', [id])
        return rows[0]
    }
}


module.exports = new UserRepository()
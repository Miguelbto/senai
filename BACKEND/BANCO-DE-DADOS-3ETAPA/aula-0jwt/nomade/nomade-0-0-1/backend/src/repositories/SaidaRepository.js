const pool = require('../config/database')

class SaidaRepository {

    async buscarTodasSaidas(){
        const [rows] = await pool.query('SELECT * FROM saida')
        return rows
    }

    async buscarSaidaPorId(id) {
        const [saidaRows] = await pool.query('SELECT * FROM saida WHERE id_saida = ?', [id])

        if (saidaRows.length === 0) return null

        const saidas = saidaRows[0]

        return saidas
    }

    async cadastrarSaida(saidaData) {
        const connection = await pool.getConnection()

        try {
            await connection.beginTransaction()

            const [result] = await pool.query('INSERT INTO saidas SET ?', [saidaData])

            await connection.commit()
            return result.insertId
        } catch (error) {
            await connection.rollback()
            throw error
        } finally {
            connection.release()
        }
    }
}

module.exports = new SaidaRepository()
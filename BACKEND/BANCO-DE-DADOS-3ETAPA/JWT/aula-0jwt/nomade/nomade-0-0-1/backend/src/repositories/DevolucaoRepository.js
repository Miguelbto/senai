const pool = require('../config/database')

class DevolucaoRepository {

    async buscarTodasDevolucoes() {

        const [rows] = await pool.query('SELECT * FROM devolucao')
        return rows
    }

    async buscarDevolucoesPorId(id) {

        const [devolucaoRows] = await pool.query('SELECT * FROM devolucao WHERE id_devolucao = ?', [id])

        if(devolucaoRows.length === 0) return null

        const devolucao = devolucaoRows[0]

        return devolucao
    }

    async cadastrarDevolucao(devolucaoData) {
        const connection = await pool.getConnection()

        try {
            await connection.beginTransaction()

            const [result] = await connection.query('INSERT INTO devolucao SET ?', [devolucaoData])
        } catch (error) {
            await connection.rollback()
            throw error
        } finally {
            connection.release()
        }
    }
}

module.exports = new DevolucaoRepository
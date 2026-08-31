const pool = require('../config/database')

class EntradasRepository {

    async buscarTodasEntradas(){
        const [rows] = await pool.query('SELECT * FROM entrada')
        return rows
    }

    async buscarEntradaPorId(id) {
        const [entradaRows] = await pool.query('SELECT * FROM entrada WHERE id_entrada = ?', [id])

        if(entradaRows.length === 0) return null

        const entradas = entradaRows
        return entradas
    }

    async create(EntradaData) {
        const { idCadastro, quantidade, pesoTotal, dataEntrada, dataValidade, lote, etiqueta, valor} = EntradaData
        const connection = await pool.getConnection()

        try {
            await connection.beginTransaction()

            const [result] = await connection.query('INSERT INTO entrada (id_cadastro, quantidade, peso_total, data_entrada, data_validade, lote, etiqueta, valor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [idCadastro, quantidade, pesoTotal, dataEntrada, dataValidade, lote, etiqueta, valor])

            const entradaId = result.insertId

            await connection.commit()
            return entradaId

        } catch (error) {
            await connection.rollback()
            throw error
        } finally {
            connection.release()
        }
        
    }
}

module.exports = new EntradasRepository()
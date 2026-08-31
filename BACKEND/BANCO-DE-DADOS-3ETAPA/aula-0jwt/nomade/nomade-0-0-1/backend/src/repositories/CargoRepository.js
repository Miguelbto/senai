const pool = require('../config/database')

class CargoRepository {

    async buscarTodosCargos() {
        const [rows] = await pool.query('SELECT * FROM cargos ORDER BY DESC')
        return rows
    }

    async buscarCargoPorId(id) {
        const [cargosRows] = await pool.query('SELECT * FROM cargos WHERE id = ?', [id])

        if (cargosRows.length === 0) return null

        const cargos = cargosRows[0]
        return cargos
    }
}

module.exports = new CargoRepository()
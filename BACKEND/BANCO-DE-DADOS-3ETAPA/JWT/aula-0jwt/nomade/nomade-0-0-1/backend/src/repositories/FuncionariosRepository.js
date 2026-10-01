const pool = require('../config/database')

class FuncionarioRepository {


    async buscarTodosFuncionarios(){
        const [rows] = await pool.query('SELECT * FROM funcionario')
        return rows
    }

    async buscarFuncionarioUnico(id){
        const [funcionarioRows] = await pool.query('SELECT * FROM funcionario WHERE id_funcionario = ?', [id])
        
        if(funcionarioRows.length === 0) return null
        
        const funcionario = funcionarioRows[0]
        return funcionario
    }

    async cadastrarFuncionario(funcionarioData) {
        const { nome, dataNascimento, senha, email, idCargo} = funcionarioData

        const connection = await pool.getConnection()

        try {
            await connection.beginTransaction()

            const [result] = await connection.query('INSERT INTO funcionario (nome_completo, data_nascimento, senha, email, id_cargo) VALUES (?, ?, ?, ?, ?)', [nome, dataNascimento, senha, email, idCargo])

            const funcionarioId = result.insertId

            await connection.commit()
            return funcionarioId
        } catch (error) {
            await connection.rollback()
            throw error
        } finally {
            connection.release()
        }


    }

    async atualizarFuncionario(id, funcionarioData) {
        const fields = []
        const values = []

        for (const [key, value] of Object.entries(funcionarioData)) {
            fields.push(`${key} = ?`)
            values.push(value)
        }

        if(fields.length === 0) return null

        values.push(id)
        const query = `UPDATE funcionario SET ${fields.join(', ')} WHERE id = ?`
        const [result] = await pool.query(query, values)
        return result.affectedRows
    }

    async apagarFuncionario(id) {
        const [result] = await pool.query('DELETE FROM funcionario WHERE id = ?', [id])
        return result.affectedRows
    }

}


module.exports = new FuncionarioRepository()
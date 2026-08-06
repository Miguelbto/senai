const pool = require("../config/database.js")

class PedidoRepository {

    async listarPedidos () {
        const listaPedidos = await pool.query('SELECT * FROM pedido')
        return listaPedidos
    }

    async buscarPedidoPorId (id) {
        const mostrarPedido = await pool.query('SELECT * FROM pedido WHERE id = ?', [id])
        return mostrarPedido[0]
    } 
    
    async cadastrarPedido (dadosDoPedido) {
        const resultadoCadastroDePedido = await pool.query('INSERT INTO pedido SET ?', [dadosDoPedido])
        return resultadoCadastroDePedido.insertId
    }

    async atualizarPedido (id, dadosDoPedido){
        const camposPedido = []
        const dadosPedido = []

        for (const [key, value] of Object.entries(dadosDoPedido)){
            camposPedido.push(`${key} = ?`)
            dadosPedido.push(value)
        }

        if(camposPedido.length === 0) return null 

        dadosPedido.push(id)

        const query = `UPDATE pedido SET ${camposPedido.join(',')} WHERE id = ?`

        const resultado = await pool.query(query, dadosPedido)

        return resultado.affectedRows
    }

    async deletarPedido (id) {
        await pool.query('DELETE FROM pedido WHERE id = ?', [id])
        return true
    }

}

module.exports = new PedidoRepository()
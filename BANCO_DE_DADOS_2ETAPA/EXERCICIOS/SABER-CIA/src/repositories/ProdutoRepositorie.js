const pool = require("../config/database.js")

class produtoRepository {

    async listarProdutos () {
        const listaProdutos = await pool.query('SELECT * FROM produto')
        return listaProdutos
    }

    async buscarProdutoPorId (id) {
        const mostrarProduto = await pool.query('SELECT * FROM produto WHERE id = ?', [id])
        return mostrarProduto[0]
    } 
    
    async cadastrarProduto (dadosDoProduto) {
        const resultadoCadastroDeProduto = await pool.query('INSERT INTO produto SET ?', [dadosDoProduto])
        return resultadoCadastroDeProduto.insertId
    }

    async atualizarProduto (id, dadosDoProduto){
        const camposProduto = []
        const dadosProduto = []

        for (const [key, value] of Object.entries(dadosDoProduto)){
            camposProduto.push(`${key} = ?`)
            dadosProduto.push(value)
        }

        if(camposProduto.length === 0) return null 

        dadosProduto.push(id)

        const query = `UPDATE PRODUTO SET ${camposProduto.join(',')} WHERE id = ?`

        const resultado = await pool.query(query, dadosProduto)

        return resultado.affectedRows

    }

    async apagarProduto (id) {
        await pool.query('DELETE FROM produto WHERE id = ?', [id])
        return true
    }



}





module.exports = new ProdutoRepository()
    
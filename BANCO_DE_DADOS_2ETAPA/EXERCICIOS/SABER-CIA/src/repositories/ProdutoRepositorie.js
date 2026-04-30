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
        const produtoAtualizado = await pool.query('UPDATE produto SET ? WHERE id = ?', [dadosDoProduto], [id])
        return produtoAtualizado
    }

    async apagarProduto (id) {
        await pool.query('DELETE FROM produto WHERE id = ?', [id])
        return true
    }



}





module.exports = new ProdutoRepository()
    
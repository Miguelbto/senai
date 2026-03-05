const express = require('express')
const pool = require('./config/database')

const app =express()

app.use(express.json())

const queryAsync = (sql, values = []) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, results) => {
            if(err) reject(err)
            else resolve(results)
        })
    })
}



app.get('/', (req, res) => {
    res.send("API CINEMA")
})


/*
app.get('/filmes', (req, res) =>{
    pool.query('SELECT * FROM filme', (err, results) =>{
        res.json(results)
    })
})
*/

app.get('/filmes', async (req, res) =>{
     try{
        const filmes = await queryAsync('SELECT * FROM filme')
        res.json({
            sucesso: true,
            dados: filmes,
            total: filmes.length
        })
    } catch (erro) {
        console.error('Erro ao listar filmes:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar filmes',
            erro: erro.mensage
        })
    }

})



app.get('/filmes/:id', async (req, res) => {
    try{
        const {id} = req.params

        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID de filme inválido'
            })
        }

        const filmes = await queryAsync('SELECT * FROM filme WHERE id = ?', [id])

        if(filmes.length === 0){
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Filme não encontrado'
            })
        }

        res.json({
            sucesso: true,
            dados: filmes
        })
    } catch (erro) {
        console.error('Erro ao encontrar filme:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao encontrar filme',
            erro: erro.mensage
        })
    }
})






/*

app.get('/filmes/:id', (req, res) => {
    const {id} = req.params

    pool.query('SELECT * FROM filme WHERE id = ?', [id], (err, results) => {
        res.json(results)
    })
})
*/











module.exports = app
const express = require('express')
const pool = require('./config/database')

const app = express()

app.use(express.json())

const queryAsync = (sql, values = []) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, results) => {
            if (err) reject(err)
            else resolve(results)
        })
    })
}

app.get('/', (req, res) => {
    res.send("API Sabor Digital")
})


app.get('/produto', async (req, res) => {
    try {
        const produto = await queryAsync('SELECT * FROM produto ')
        res.json({
            sucesso: true,
            dados: produto,
            total: produto.length,
        })
        
    } catch (erro) {
        console.error('Erro ao listar produtos:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar produtos',
            erro: erro.mensage
        })
    }
})


app.get('/produto/:id', async (req, res) => {
    try {
        const {id} = req.params

        if(!id || isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID de filme inválido'
            })
        } 

        const produto = await queryAsync('SELECT * FROM produto WHERE id = ?', [id])

        if(produto.length === 0){
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Filme não encontrado'
            })
        }

        res.json({
            sucesso: true,
            dados: produto
        })
        
    } catch (erro) {
        console.error(`Erro ao encontrar o filme id:${req.params.id}`, erro)
        res.status(500).json({
            sucesso: true,
            erro: erro.mensage
        })
        
    }
})


app.post('/produto', async(req,res) => {
    try {
        const {nome, descricao, preco, disponivel} = req.body

        if(!nome || !descricao || !preco){
            return res.status(400).json({
                sucesso: false, 
                mensagem: 'Nome, descrição, preco, e disponível devem ser preenchidos obrigatóriamente'
            })
        }

        if(typeof nome !== 'string' || typeof descricao !== 'string') {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nome e descrição devem ser textos válidos'
            })
        }

        if(typeof preco !== 'number' || preco < 0){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'O preço deve ser um numero positivo'
            })
        }

        if(typeof disponivel !== 'boolean'){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'O campo disponível deve ser verdadeiro ou falso'
            })
        }

        const novoProduto = {
            nome: nome,
            descricao: descricao,
            preco: preco,
            disponivel: disponivel,
        }

        const resultado = await queryAsync('INSERT INTO produto SET ?', [novoProduto])

        res.status(201).json({
            sucesso: true,
            mensagem: 'Produto cadastrado com sucesso!',
            id: resultado.insertid
        })
        
    } catch (erro) {
        console.error(`Erro ao salvar produto`, erro)

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao salvar produto',
            erro: erro.menssage
        })
        
    }
})


app.put('/produto/:id', async (req,res) => {
    try {
        const {id} = req.params
        const {nome, descricao, preco, disponivel} = req.body

        if(!id || isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Id produto inválido'
            })
        }

        const produtoExiste = await queryAsync('SELECT  * FROM produto WHERE id = ?', [id])
        if(produtoExiste.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'produto não encontrado'
            })
        }

        const produtoAtualizado = {}

        if(nome !== undefined) produtoAtualizado.nome = nome.trim()
        if(descricao !== undefined) produtoAtualizado.descricao = descricao.trim()
        if(preco !== undefined){
            if(typeof preco !== 'number' || preco <= 0) {
                return res.status(400).json({
                    sucesso:false,
                    mensagem: 'Preço deve ser um número positivo'
                })
            }
            produtoAtualizado.preco = preco
        } 
        if(disponivel !== undefined){
            if(typeof disponivel !== 'boolean'){
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'O campo disponível deve ser true ou false'
                })
            }
            produtoAtualizado.disponivel = disponivel
        } 

        if(Object.keys(produtoAtualizado).length === 0){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nenhum campo para atualizar'
            })
        }

        res.json({
            sucesso: true,
            mensagem: 'produto atualizado'
        })
        
    } catch (erro) {
        console.error(`Erro ao atualizar filme:`, erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar produto',
            erro: erro.message,
        })
    }
})


app.delete('/produto/:id', async (req, res) => {
    try {
        const {id} = req.params

        if(!id !== isNaN || (id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID produto inválido'
            })
        }
        
        const produtoExiste = await queryAsync('SELECT * FROM produto WHERE id = ?')

        if(produtoExiste.length === 0){
            return res.status(404).json({
                sucesso:false,
                mensagem: 'Produto não encontrado'
            })
        }

        await queryAsync('DELETE FROM produto WHERE id = ?', [id])

        res.status(200).json({
            sucesso: true,
            mensagem: 'Produto deletado com sucesso'
        })


    } catch (erro) {
        console.error(`Erro ao apagar produto:`, erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'produto não deletado',
            erro: erro.message,
        })
        
    }
})







module.exports = app

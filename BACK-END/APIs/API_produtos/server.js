import express from 'express'

const app = express()

const produtos = []

app.use(express.json())

app.get('/produto', (req, res) => {
    res.json(produtos)
})

app.post('/produto', (req,res) => {
    produtos.push(req.body)

    res.json(req.body)
})

app.listen(3000, () => console.log("Servidor Rodando"))
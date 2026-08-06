import express from 'express'

const app = express()

const users = []

app.use(express.json())

app.get('/usuario', (req, res) => {
    res.json(users)
})

app.post('/usuario', (req,res) => {
    users.push(req.body)

    res.json(req.body)
})

app.listen(3000, () => console.log("Servidor Rodando"))


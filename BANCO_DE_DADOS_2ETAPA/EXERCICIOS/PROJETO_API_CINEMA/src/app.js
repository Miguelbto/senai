const express = require('express')
const pool = required('./config/database')

const app =express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("API CINEMA")
})

app.get('/filmes', (req, res) =>{
    pool.query('SELECT * FROM filme', (err, results) =>{
        res.json(results)
    })
})
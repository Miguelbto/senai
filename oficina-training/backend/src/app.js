const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');

app.use(cors())
app.use(express.json())


app.use('/', routes)

app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500).json({
        sucesso: false,
        mensagem: err.message || 'Erro interno do servidor'
    })
})

module.exports = app
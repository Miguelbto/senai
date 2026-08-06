const express = require('express');
const app = express();

// Para o Express entender JSON no corpo da requisição
app.use(express.json());

// Importando as rotas de produto
const rotasDeProduto = require('./routes/produtoRouter');

// Dizendo para o app usar essas rotas sempre que a URL começar com "/produtos"
app.use('/produtos', rotasDeProduto);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!');
});
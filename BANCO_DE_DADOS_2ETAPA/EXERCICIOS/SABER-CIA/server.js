<<<<<<< Updated upstream
const app = require('./app'); // Importa as configurações do seu arquivo app.js
const PORT = 3000; // Define a porta do servidor

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando com sucesso na porta ${PORT}!`);
    console.log(`Manda bala nos testes lá no Thunder Client!`);
=======
const express = require('express');
const app = express();

// Para o Express entender JSON no corpo da requisição
app.use(express.json());

// Importando as rotas de produto
const rotasDeProduto = require('./routes/produto.routes');

// Dizendo para o app usar essas rotas sempre que a URL começar com "/produtos"
app.use('/produtos', rotasDeProduto);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!');
>>>>>>> Stashed changes
});
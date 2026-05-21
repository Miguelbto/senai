const app = require('./app'); // Importa as configurações do seu arquivo app.js
const PORT = 3000; // Define a porta do servidor

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando com sucesso na porta ${PORT}!`);
    console.log(`Manda bala nos testes lá no Thunder Client!`);
});
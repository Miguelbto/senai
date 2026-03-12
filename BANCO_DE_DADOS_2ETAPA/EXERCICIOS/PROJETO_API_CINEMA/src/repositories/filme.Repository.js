const { queryAsync } = require('../config/database.js');

async function buscarPorId(id) {
    // Faz a query ao banco de dados
    const filmes = await queryAsync('SELECT * FROM filme WHERE id = ?', [id]);
    
    //Retorna o primeiro filme encontrado ou undefined (se não existir)

    return filmes[0];

}

module.exports = { buscarPorId };
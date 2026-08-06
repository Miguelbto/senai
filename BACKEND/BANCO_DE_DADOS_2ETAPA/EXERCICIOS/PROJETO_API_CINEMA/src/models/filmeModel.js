// filmeModel.js
const { queryAsync } = require ('../config/database.js')

//Função focada apenas em ir ao banco e trazer os dados 
async function buscarFilmePorId(id) {
    const filmes = await queryAsync('SELECT * FROM filme WHERE id = ?', [id]);
    return filmes;
}

// Exportamos a função para usá-la em outros arquivos 
module.exports = {
    buscarFilmePorId
}
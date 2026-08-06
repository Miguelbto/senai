const filmeRepository = require('../repositories/filme.Repository.js');

async function obterFilme(id) {
    const filme = await filmeRepository.buscarPorId(id);

    //Regra de negócio: Se o filme for encontrado, lançamos um erro 
    if (!filme) {
        throw { status: 404, menssage: 'Filme não encontrado no catálogo'};
    }
    return filme;

}

module.exports = { obterFilme };
const filmeService = require('../services/filme.Service.js');
const { idParaSchema, idParamSchema } = require ('../validations/filmeSchema.js');

async function buscar(req, res, next) {
    try {
        //1. O Zod valida o ID enviado na URL
        const dadosValidados = idParamSchema.parse(req.params);

        //2. Chame o Service passando o ID validado
        const filme = await filmeService.obterFilme(dadosValidados.id);

        //3. Retorne o sucesso
        res.status(200).json({
            sucesso: true,
            dados: filme 
        });

    } catch (erro) {
        // Se der erro de validação (Zod) ou de não encontrado (service), joga Middleware central!
        next(erro);
        
    }
    
}

module.exports = { buscar };




/*
//filmeController.js

const filmeModel = require('./filmeModel');

async function obterFilme(req, res) {
    try {
        const { id } = req.params;

        //1. Validação
        if (!id || isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID de filme inválido. Por favor, envie um número.'
            });
        }

        //2. Chamada ao Model (Banco de dados)
        const filmes = await filmeModel.buscarFilmePorId;

        //3. Regra de negócio (Não encontrou?)
        if (filmes.length === 0 ) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Filme não encontrado'
            });
        }

        //4. Resposta de sucesso 
        res.json({
            sucesso: true,
            dados: filmes[0]
        });

    } catch (erro) {
        console.error(`Erro crítico ao buscar o filme ID ${req.params.id}:`, erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Ocorreu um erro interno no servidor'
        });
    }
}

module.exports = {
    obterFilme
};

*/
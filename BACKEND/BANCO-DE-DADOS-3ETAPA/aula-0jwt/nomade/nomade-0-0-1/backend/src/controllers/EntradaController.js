const EntradaService = require("../services/EntradaService");

class EntradaController {

    async listar(req, res) {
        try {
            const entrada = await EntradaService.listarEntradas()

            return res.status(200).json(entrada);
        } catch (error) {
            return res.status(500).json({
                erro: error.message
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            const entradas = await EntradaService.listarEntradaPorId(id);

            return res.status(200).json(entradas);
        } catch (error) {
            return res.status(500).json({
                erro: error.message
            });
        }
    }

    async cadastrar(req, res) {
        try {
            const entrada = await EntradaService.criarEntrada(req.body);

            return res.status(201).json(entrada);
        } catch (error) {
            return res.status(500).json({
                erro: error.message
            });
        }
    }

}

module.exports = new EntradaController()
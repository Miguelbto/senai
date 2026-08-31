const EstoqueService = require("../services/EstoqueService");

class EstoqueController {

    async listar(req, res) {
        try {
            const estoque = await EstoqueService.listar();

            return res.status(200).json(estoque);

        } catch (error) {
            return res.status(500).json({
                erro: error.message
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            const estoque = await EstoqueService.buscarPorId(id);

            return res.status(200).json(estoque);

        } catch (error) {
            return res.status(404).json({
                erro: error.message
            });
        }
    }

}

module.exports = new EstoqueController();
const CargoService = require("../services/CargoService");

class CargoController {

    async listar(req, res) {
        try {
            const cargos = await CargoService.listar();

            return res.status(200).json(cargos);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            const cargo = await CargoService.buscarPorId(id);

            return res.status(200).json(cargo);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async cadastrar(req, res) {
        try {
            const cargo = await CargoService.cadastrar(req.body);

            return res.status(201).json(cargo);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;

            const cargo = await CargoService.atualizar(id, req.body);

            return res.status(200).json(cargo);
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;

            await CargoService.excluir(id);

            return res.status(200).json({
                mensagem: "Cargo removido."
            });
        } catch (error) {
            return res.status(500).json({ erro: error.message });
        }
    }

}

module.exports = new CargoController();
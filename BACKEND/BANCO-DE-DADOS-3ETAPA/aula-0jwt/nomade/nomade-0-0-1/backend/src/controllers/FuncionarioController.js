const FuncionarioService = require("../services/FuncionarioService");

class FuncionarioController {

    async listarFuncionarios(req, res) {
        try {
            const funcionarios = await FuncionarioService.listarFuncionarios();

            return res.status(200).json(funcionarios);
        } catch (error) {
            return res.status(500).json({
                erro: error.message
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const funcionario = await FuncionarioService.buscarFuncionarioPorId(id);

            return res.status(200).json(funcionario);
        } catch (error) {
            return res.status(500).json({
                erro: error.message
            });
        }
    }

    async cadastrar(req, res) {
        try {
            const funcionario = await FuncionarioService.cadastrarFuncionario(req.body);

            return res.status(201).json(funcionario);
        } catch (error) {
            return res.status(500).json({
                erro: error.message
            });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const funcionario = await FuncionarioService.atualizarFuncionario(id, req.body);

            return res.status(200).json(funcionario);
        } catch (error) {
            return res.status(500).json({
                erro: error.message
            });
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;
            const resposta = await FuncionarioService.deletarFuncionario(id);

            return res.status(200).json(resposta);
        } catch (error) {
            return res.status(500).json({
                erro: error.message
            });
        }
    }

}

module.exports = new FuncionarioController();
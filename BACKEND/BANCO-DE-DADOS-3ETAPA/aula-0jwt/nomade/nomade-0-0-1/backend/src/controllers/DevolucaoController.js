const DevolucaoService = require("../services/DevolucaoService");

class DevolucaoController {

    async listar(req, res) {
            try {
                const entrada = await DevolucaoService.listarDevolucoes()
    
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
    
                const entradas = await DevolucaoService.listarDevolucaoPorId(id)
    
                return res.status(200).json(entradas);
            } catch (error) {
                return res.status(500).json({
                    erro: error.message
                });
            }
        }
    

    async cadastrar(req, res) {
        try {
            const devolucao = await DevolucaoService.cadastrar(req.body);

            return res.status(201).json(devolucao);
        } catch (error) {
            return res.status(500).json({
                erro: error.message
            });
        }
    }

}

module.exports = new DevolucaoController();
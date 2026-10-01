const UsuarioService = require('../services/UsuarioService');

class UsuarioController {
    async registrar(req, res) {
        /*  #swagger.parameters['body'] = {
                in: 'body',
                description: 'Dados do novo usuário',
                schema: {
                    $nome: 'Administrador',
                    $email: 'admin@sabordigital.com',
                    $senha: '123456',
                    $papel: 'admin'
                }
            }
        */
        try {
            const resultado = await UsuarioService.registrarUsuario(req.body);
            res.status(201).json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

    async login(req, res) {
        /*  #swagger.parameters['body'] = {
                in: 'body',
                description: 'Credenciais de acesso',
                schema: {
                    $email: 'admin@sabordigital.com',
                    $senha: '123456'
                }
            }
        */
        try {
            const { email, senha } = req.body;
            const resultado = await UsuarioService.login(email, senha);
            res.status(200).json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }
}

module.exports = new UsuarioController();

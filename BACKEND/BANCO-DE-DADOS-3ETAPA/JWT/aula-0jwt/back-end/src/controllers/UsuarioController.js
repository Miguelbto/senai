const UsuarioService = require('../services/UsuarioService');

class UsuarioController {


    async registrar(req, res) {
        try {
            const { nome, email, senha, papel } = req.body;
            const usuario = await UsuarioService.registrarUsuario({ nome, email, senha, papel });
            return res.status(201).json(usuario);
        } catch (erro) {
            return res.status(400).json({ mensagem: erro.message });
        }
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const resultado = await UsuarioService.login(email, senha);
            return res.status(200).json(resultado);
        } catch (erro) {
            return res.status(401).json({ mensagem: erro.message });
        }
    }

    async refresh(req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(400).json({ mensagem: 'Refresh token não enviado' });
            }
            const resultado = await UsuarioService.renovarToken(refreshToken);
            return res.status(200).json(resultado);
        } catch (erro) {
            return res.status(401).json({ mensagem: erro.message });
        }
    }

    async logout(req, res) {
        try {
            const { refreshToken } = req.body;
            await UsuarioService.logout(refreshToken);
            return res.status(204).send();
        } catch (erro) {
            return res.status(400).json({ mensagem: erro.message });
        }
    }
}

module.exports = new UsuarioController()
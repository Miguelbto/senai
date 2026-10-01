const AuthService = require('../services/AuthFuncionarioService')

class AuthController {

    async login(req, res) {
        try {
            const {nome, email, senha, role } = req.body;
            const usuario = await AuthService.login(email, senha)
            return res.status(201).json(usuario)
        } catch (error) {
            return res.status(500).json({ mensagem: error.message })
        }
    }

    async refresh(req, res) {
        try {
            const { refreshToken } =req.body
            if(!refreshToken) {
                return res.status(400).json({ mensagem: 'Refresh token não enviado'})
            }

            const resultado = await AuthService.renovarToken(refreshToken)
            return res.json(200).json(resultado)
        } catch (error) {
            return res.status(400).json({ mensagem: error.message })
        }
    }

    async logout(req, res) {
        try {
            const { refreshToken } = req.body
            await AuthService.logout(refreshToken)
            return res.status(200).send()
        } catch (error) {
            return res.status(400).json({ mensagem: error.message })
        }
    }
    
}

module.exports = new AuthController()
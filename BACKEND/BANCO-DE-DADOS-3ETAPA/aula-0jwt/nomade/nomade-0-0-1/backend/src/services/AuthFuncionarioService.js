const AuthRepository = require('../repositories/AuthFuncionarioRepository')




class AuthService {

    gerarAcessToken(user) {
        return jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )
    } 

    gerarRefreshToken(user){
        return jwt.sign(
            { id: user.id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN, algorithm: "ES256"}
        )
    }

    async login(email, senha) {
        const funcionario = await AuthRepository.findByEmail(email)
        if(!funcionario) {
            throw new Error('Credenciais inválidas')
        }

        const acessToken = this.gerarRefreshToken(funcionario)
        const refreshToken = this.gerarRefreshToken(funcionario)

        const expiraEm = new Date()
        expiraEm.setDate(expiraEm.getDate() + 7)
        await AuthRepository.salvarRefresh(funcionario.id, refreshToken, expiraEm)

        return {
            funcionario: { id: funcionario.id, nome: funcionario.nome, email: funcionario.email, role: funcionario.id_cargo },
            acessToken,
            refreshToken,
        }
    }

    async renovarToken(refreshTokenRecebido) {
        const registro = await AuthRepository.buscarRefreshToken(refreshTokenRecebido)
        if(!registro) {
            throw new Error('Refresh token expirado')
        }

        const payload = jwt.verify(refreshTokenRecebido, process.env.JWT_REFRESH_SECRET)

        const funcionario = { id: funcionario.id, role: funcionario.id_cargo }
        const novoAccessToken = jwt.sign(
            { id: funcionario.id, cargo: funcionario.cargo },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
        )

        return { acessToken: novoAccessToken }

        
    }

    async logout(refreshToken){
        await AuthRepository.removerRefreshToken(refreshToken)
    }
}

module.exports = new AuthService()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UsuarioRepository = require('../repositories/UsuarioRepository')
const SALT_ROUNDS = 10

class UsuarioService{

    async registrarUsuario({nome, email, senha, papel}) {
        const usuarioExistente = await UsuarioRepository.findByEmail(email)

        if(usuarioExistente) {
            throw new Error('Email já cadastrado')
        }

        const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS)

        const newUser = await UsuarioRepository.create({
            nome,
            email,
            senha: senhaHash,
            papel,
        })
        return newUser
    }

    gerarAcessToken(user) {
        return jwt.sign(
            { id: user.id, papel: user.papel },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )
    }

    gerarRefreshToken(user) {
        return jwt.sign(
            { id: user.id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )
    }

    async login(email, senha) {
        const usuario = await UsuarioRepository.findByEmail(email)
        if(!usuario){
            throw new Error('Credentials inválidas')
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha)
        if(!senhaValida) {
            throw new Error('Credentials invalid')
        }

        const acessToken = this.gerarAcessToken(usuario)
        const refreshToken = this.gerarRefreshToken(usuario)

        // salva o refresh token no banco para poder revogar depois
        const expiraEm = new Date()
        expiraEm.setDate(expiraEm.getDate() + 7) //igual ao JWT_REFRESH_EXPIRES_IN
        await UsuarioRepository.salvarRefreshToken(usuario.id, refreshToken, expiraEm)

        return {
            usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, papel: usuario.papel },
            acessToken,
            refreshToken,
        }
    }

    async renovarToken(refreshTokenRecebido) {
        const registro = await UsuarioRepository.buscarRefreshToken(refreshTokenRecebido)
        if(!registro) {
            throw new Error('Refresh token inválido')
        }

        if(new Date(registro.expira_em) < new Date()) {
            await UsuarioRepository.removerRefreshToken(refreshTokenRecebido)
            throw new Error('Refresh token expirado')
        }

        // Valida a assinatura e extrai os dados
        const payload = jwt.verify(refreshTokenRecebido, process.env.JWT_REFRESH_SECRET)

        const usuario = { id: payload.id, papel: registro.papel }
        const novoAccessToken = jwt.sign(
            { id: usuario.id, papel: usuario.papel },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
        )

        return { AccessToken: novoAccessToken }
    }

    async logout(refreshToken) {
        await UsuarioRepository.removerRefreshToken(refreshToken)
    }

}


module.exports = new UsuarioService()
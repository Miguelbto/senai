const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UsuarioRepository = require('../repositories/UsuarioRepository')
const SALT_ROUNDS = 10

class UsuarioService {

    async registrarUsuario({nome, email, senha, papel}) {
        const usuarioExistente = await usuarioRepository.findByEmail(email)

        if(usuarioExistente) {
            throw new Error('Email já cadastrado')
        }

        const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS)

        const newUser = await usuarioRepository.create({
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
            usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, papel: usuario.papel}
        }
    }


    




}


module.exports = new UsuarioService()
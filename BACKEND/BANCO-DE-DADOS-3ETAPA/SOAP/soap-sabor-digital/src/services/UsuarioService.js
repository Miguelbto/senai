const UsuarioRepository = require('../repositories/UsuarioRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'chave_super_secreta_sabor_digital_123';

class UsuarioService {
    async registrarUsuario(dados) {
        const { nome, email, senha, papel } = dados;

        if (!nome || !email || !senha) {
            throw new Error('Nome, e-mail e senha são obrigatórios');
        }

        const usuarioExistente = await UsuarioRepository.findByEmail(email);
        if (usuarioExistente) {
            throw new Error('E-mail já está em uso');
        }

        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        const role = (papel === 'admin') ? 'admin' : 'cliente';

        const novoId = await UsuarioRepository.create({
            nome,
            email,
            senha: senhaHash,
            papel: role
        });

        return {
            sucesso: true,
            mensagem: 'Usuário registrado com sucesso',
            id: novoId
        };
    }

    async login(email, senha) {
        if (!email || !senha) {
            throw new Error('E-mail e senha são obrigatórios');
        }

        const usuario = await UsuarioRepository.findByEmail(email);
        if (!usuario) {
            throw new Error('Credenciais inválidas');
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            throw new Error('Credenciais inválidas');
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, papel: usuario.papel },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        return {
            sucesso: true,
            mensagem: 'Login realizado com sucesso',
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                papel: usuario.papel
            }
        };
    }
}

module.exports = new UsuarioService();

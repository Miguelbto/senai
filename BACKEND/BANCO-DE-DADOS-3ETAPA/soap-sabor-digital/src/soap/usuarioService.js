const UsuarioService = require('../services/UsuarioService');

module.exports = {
    UsuarioService: {
        UsuarioPort: {

            async RegistrarUsuario(args) {
                const resultado = await UsuarioService.registrarUsuario(args);
                return resultado;
            },

            async Login(args) {
                const resultado = await UsuarioService.login(args.email, args.senha);
                return {
                    sucesso: resultado.sucesso,
                    mensagem: resultado.mensagem,
                    token: resultado.token,
                    usuario: resultado.usuario
                };
            }
        }
    }
};

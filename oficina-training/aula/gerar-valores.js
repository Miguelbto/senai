require('dotenv').config()
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

function gerarHashSenha(senha) {
    return bcrypt.hashSync(senha, 10);
}

function criptografarCPF(cpf) {
    const cifra = crypto.createCipheriv('aes-256-cbc', process.env.CRIPTO_CHAVE, process.env.CRIPT_IV)
    return cifra.update(cpf, 'utf8', 'hex') + cifra.final('hex')
}

/*console.log('hash da senha 123456:', gerarHashSenha('123456'))*/
/*console.log('CPF 11122233344 criptografado:', criptografarCPF('11122233344'))*/

// João da Silva
console.log('hash da senha 123456:', gerarHashSenha('123456'))
console.log('CPF 11122233344 criptografado:', criptografarCPF('11122233344'))

// Maria Souza
console.log('hash da senha 654321:', gerarHashSenha('654321'))
console.log('CPF 22233344455 criptografado:', criptografarCPF('22233344455'))

// Pedro Oliveira
console.log('hash da senha 123123:', gerarHashSenha('123123'))
console.log('CPF 33344455566 criptografado:', criptografarCPF('33344455566'))
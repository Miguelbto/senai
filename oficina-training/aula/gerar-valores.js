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

console.log('hash da senha 123456:', gerarHashSenha('123456'))
console.log('CPF 11122233344 criptografado:', criptografarCPF('11122233344'))
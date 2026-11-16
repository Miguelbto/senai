require('dotenv').config()
const fs = require('fs')
const path = require('path')
const express = require('express')
const mysql = require('mysql2')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const cookieparser = require('cookie-parser')
const Mustache = require('mustache')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(cookieparser())

app.use((req, res, next) => {
    const method = String(req.body._method || '').toUpperCase()
    if (req.method === 'POST' && (method === 'PUT' || method === DELETE)) {
        req.method = method
    }
    next()
})

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_HOST,
    database: process.env.DB_HOST,
    dateStrings: true,
})


function mostrar(nome, dados = {}) {
    const arquivo = path.join(__dirname, 'paginas', `${nome}.html`)
    return Mustache.render(fs.readFileSync(arquivo, 'utf8'), dados)
}

function criptografar(texto) {
    const cifra = crypto.createCipheriv('aes-256-cbc',
        process.env.CRIPTO_CHAVE,
        process.env.CRIPT_IV,
    )
    return cifra.update(texto, 'utf8', 'hex') + cifra.final('hex');
}

function descriptografar(texto) {
    const descifra = crypto.createDecipheriv('aes-256-cbc',
        process.env.CRIPTO_CHAVE,
        process.env.CRIPT_IV,
    )
    return descifra.update(texto, 'hex', 'utf8') + descifra.final('utf8');
}

const porta = process.env.PORT || 3000;
app.listen(porta, () => console.log(`oficina rodando em htttp://localhost:${porta}`))
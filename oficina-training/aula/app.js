const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const express = require('express')
const mysql = require('mysql2/promise')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const cookieparser = require('cookie-parser')
const Mustache = require('mustache')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(cookieparser())

app.use((req, res, next) => {
    if (req.body && req.body._method) {
        const method = String(req.body._method).toUpperCase()
        if (req.method === 'POST' && (method === 'PUT' || method === 'DELETE')) {
            req.method = method
        }
    }
    next()
})

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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

async function excluir(res, tabela, id, volta, motivo) {
    try {
        await db.query(`DELETE FROM ${tabela} WHERE id = ?`, [id])
        res.redirect(volta)
    } catch (erro) {
        if (erro.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(409).send(`<p>Não foi possível excluir: ${motivo}</p> <p><a href="${volta}">Voltar</a></p>`,)
        }

        console.error(erro)
        res.status(500).send(`<p>Erro ao excluir.</p> <p><a href="${volta}">Voltar<a/></p>`);
    }
}

async function mostrarVeiculos(req, res, erro = '') {
    const [veiculos] = await db.query(`
        SELECT veiculos.*, clientes.nome AS cliente_nome 
        FROM veiculos 
        JOIN clientes ON veiculos.cliente_id = clientes.id
    `)
    const [listaClientes] = await db.query('SELECT id, nome FROM clientes')
    const editar = veiculos.find((v) => String(v.id) === req.query.editar)

    const clientes = listaClientes.map((cliente) => ({
        ...cliente,
        selecionado: editar && cliente.id === editar.cliente_id ? 'selected' : '',
    }))

    res.send(mostrar('veiculos', {
        veiculos,
        clientes,
        erro,
        editando: Boolean(editar),
        acao: editar ? `/veiculos/${editar.id}` : '/veiculos',
        form: editar || {}
    }))
}

app.get('/', (req, res) => {
    res.send(mostrar('login'))
})

app.post('/login', async (req, res) => {
    const { email, senha } = req.body || {}
    const [usuarios] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email])
    const usuario = usuarios[0]

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
        return res.send(mostrar('login', { erro: 'Email ou senha inválidos' }))
    }

    const token = jwt.sign(
        { id: usuario.id_usuario, nome: usuario.nome },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )
    console.log('1. Token gerado:', token)
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/principal')
})

app.post('/sair', async (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})


app.use((req, res, next) => {
    try {
        req.usuario = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
        next()
    } catch (erro) {
        res.redirect('/')
    }
})

// PRINCIPAL

app.get('/principal', async (req, res) => {

    return res.send(mostrar('principal', { nome: req.usuario.nome }))
})

// CLIENTES 

app.get('/clientes', async (req, res) => {
    const busca = req.query.busca || ''
    const [lista] = await db.query('SELECT * FROM clientes WHERE nome LIKE ?', [`%${busca}%`])
    const clientes = lista.map((cliente) => ({ ...cliente, cpf: descriptografar(cliente.cpf) }))
    const editar = clientes.find((cliente) => String(cliente.id) === req.query.editar)
    res.send(mostrar('clientes', { busca, clientes, editando: Boolean(editar), acao: editar ? `/clientes/${editar.id}` : '/clientes', form: editar || {}, }))
})

app.post('/clientes', async (req, res) => {
    const { nome, cpf, telefone, email } = req.body
    await db.query(`INSERT INTO clientes (nome, cpf, telefone, email) VALUES (?,?,?,?)`, [nome, criptografar(cpf), telefone, email])
    res.redirect('/clientes')
})

app.put('/clientes/:id', async (req, res) => {
    const { nome, cpf, telefone, email } = req.body
    await db.query('UPDATE clientes SET nome = ?, cpf = ?, telefone = ?, email = ? WHERE id = ?', [nome, criptografar(cpf), telefone, email, req.params.id])
    res.redirect('/clientes')
})

app.delete('/clientes/:id', async (req, res) => {
    await excluir(res, 'clientes', req.params.id, '/clientes', 'O cliente já possui veiculos cadastrados')
})

// VEICULOS

app.get('/veiculos', async (req, res) => mostrarVeiculos(req, res))

app.post('/veiculos', async (req, res) => {
    const { cliente_id, placa, marca, modelo, ano } = req.body

    if (!cliente_id) {
        return mostrarVeiculos(req, res, 'Cliente ID é obrigatório')
    }

    await db.query('INSERT INTO veiculos (cliente_id, placa, marca, modelo, ano) VALUES (?, ?, ?, ?, ?)', [cliente_id, placa, marca, modelo, ano || null]),

        res.redirect('/veiculos')
})

const porta = process.env.PORT || 3000;
app.listen(porta, () => console.log(`oficina rodando em http://localhost:${porta}`))
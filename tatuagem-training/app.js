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

async function excluir(res, tabela, colunaId, id, volta, motivo) {
    try {
        await db.query(`DELETE FROM ${tabela} WHERE ${colunaId} = ?`, [id])
        res.redirect(volta)
    } catch (erro) {
        if (erro.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(409).send(`<p>Não foi possível excluir: ${motivo}</p> <p><a href="${volta}">Voltar</a></p>`)
        }

        console.error(erro)
        res.status(500).send(`<p>Erro ao excluir.</p> <p><a href="${volta}">Voltar</a></p>`);
    }
}

async function mostrarProjetos(req, res, erro = '') {
    const [projetos] = await db.query(`
        SELECT projeto_tatuagem.*, cliente.nome AS cliente_nome 
        FROM projeto_tatuagem 
        JOIN cliente ON projeto_tatuagem.fk_cliente_id = cliente.cliente_id
    `)
    const [listaClientes] = await db.query('SELECT cliente_id, nome FROM cliente')
    const editar = projetos.find((p) => String(p.projeto_tatuagem_id) === req.query.editar)

    const clientes = listaClientes.map((cliente) => ({
        ...cliente,
        selecionado: editar && cliente.cliente_id === editar.fk_cliente_id ? 'selected' : '',
    }))

    res.send(mostrar('projetos', {
        projetos,
        clientes,
        erro,
        editando: Boolean(editar),
        acao: editar ? `/projetos/${editar.projeto_tatuagem_id}` : '/projetos',
        form: editar || {}
    }))
}

app.get('/', (req, res) => {
    res.send(mostrar('login'))
})

app.post('/login', async (req, res) => {
    const { email, senha } = req.body || {}
    const [usuarios] = await db.query('SELECT * FROM usuario WHERE email = ?', [email])
    const usuario = usuarios[0]

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
        return res.send(mostrar('login', { erro: 'Email ou senha inválidos' }))
    }

    const token = jwt.sign(
        { id: usuario.usuario_id, nome: usuario.nome },
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
    const [lista] = await db.query('SELECT * FROM cliente WHERE nome LIKE ?', [`%${busca}%`])
    const clientes = lista.map((cliente) => ({ ...cliente, cpf: descriptografar(cliente.cpf) }))
    const editar = clientes.find((cliente) => String(cliente.cliente_id) === req.query.editar)
    res.send(mostrar('clientes', {
        busca,
        clientes,
        editando: Boolean(editar),
        acao: editar ? `/clientes/${editar.cliente_id}` : '/clientes',
        form: editar || {},
    }))
})

app.post('/clientes', async (req, res) => {
    const { nome, cpf, telefone, email } = req.body
    await db.query('INSERT INTO cliente (nome, cpf, telefone, email) VALUES (?,?,?,?)', [nome, criptografar(cpf), telefone, email])
    res.redirect('/clientes')
})

app.put('/clientes/:id', async (req, res) => {
    const { nome, cpf, telefone, email } = req.body
    await db.query('UPDATE cliente SET nome = ?, cpf = ?, telefone = ?, email = ? WHERE cliente_id = ?', [nome, criptografar(cpf), telefone, email, req.params.id])
    res.redirect('/clientes')
})

app.delete('/clientes/:id', async (req, res) => {
    await excluir(res, 'cliente', 'cliente_id', req.params.id, '/clientes', 'O cliente possui projetos ou agendamentos cadastrados')
})

// PROJETOS DE TATUAGEM

app.get('/projetos', async (req, res) => mostrarProjetos(req, res))

app.post('/projetos', async (req, res) => {
    const { fk_cliente_id, nome, descricao } = req.body

    if (!fk_cliente_id) {
        return mostrarProjetos(req, res, 'Cliente é obrigatório')
    }

    await db.query('INSERT INTO projeto_tatuagem (fk_cliente_id, nome, descricao) VALUES (?, ?, ?)', [fk_cliente_id, nome, descricao])
    res.redirect('/projetos')
})

app.put('/projetos/:id', async (req, res) => {
    const { fk_cliente_id, nome, descricao } = req.body

    if (!fk_cliente_id) {
        return mostrarProjetos(req, res, 'Cliente é obrigatório')
    }

    await db.query('UPDATE projeto_tatuagem SET fk_cliente_id = ?, nome = ?, descricao = ? WHERE projeto_tatuagem_id = ?', [fk_cliente_id, nome, descricao, req.params.id])
    res.redirect('/projetos')
})

app.delete('/projetos/:id', async (req, res) => {
    await excluir(res, 'projeto_tatuagem', 'projeto_tatuagem_id', req.params.id, '/projetos', 'O projeto possui agendamentos')
})

// AGENDAMENTOS

app.get('/agendamentos', async (req, res) => {
    const [lista] = await db.query(`
        SELECT agendamento.*,
               cliente.nome AS cliente_nome,
               cliente.cpf AS cliente_cpf,
               cliente.telefone AS cliente_telefone,
               cliente.email AS cliente_email,
               projeto_tatuagem.nome AS projeto_nome,
               projeto_tatuagem.descricao AS projeto_descricao
        FROM agendamento
        JOIN cliente ON cliente.cliente_id = agendamento.fk_cliente_id
        JOIN projeto_tatuagem ON projeto_tatuagem.projeto_tatuagem_id = agendamento.fk_projeto_tatuagem_id
        ORDER BY agendamento.data_agendamento ASC
    `)

    const [clientes] = await db.query('SELECT cliente_id, nome FROM cliente')
    const [projetos] = await db.query('SELECT projeto_tatuagem_id, nome FROM projeto_tatuagem')

    const agendamentos = lista.map((a) => ({
        ...a,
        cliente_cpf: descriptografar(a.cliente_cpf),
        data_br: new Date(a.data_agendamento).toLocaleString('pt-BR'),
        data_input: (a.data_agendamento instanceof Date ? new Date(a.data_agendamento.getTime() - a.data_agendamento.getTimezoneOffset() * 60000).toISOString() : a.data_agendamento).slice(0, 16).replace(' ', 'T')
    }))

    res.send(mostrar('agendamentos', { agendamentos, clientes, projetos }))
})

app.post('/agendamentos', async (req, res) => {
    const { fk_cliente_id, fk_projeto_tatuagem_id, data_agendamento } = req.body

    await db.query('INSERT INTO agendamento (fk_cliente_id, fk_projeto_tatuagem_id, data_agendamento) VALUES (?, ?, ?)', [fk_cliente_id, fk_projeto_tatuagem_id, data_agendamento.replace('T', ' ')])
    res.redirect('/agendamentos')
})

app.put('/agendamentos/:id', async (req, res) => {
    await db.query('UPDATE agendamento SET data_agendamento = ? WHERE id_agendamento = ?', [req.body.data_agendamento.replace('T', ' '), req.params.id])
    res.redirect('/agendamentos')
})

app.delete('/agendamentos/:id', async (req, res) => {
    await excluir(res, 'agendamento', 'id_agendamento', req.params.id, '/agendamentos', '')
})

const porta = process.env.PORT || 3000;
app.listen(porta, () => console.log(`Estúdio de tatuagem rodando em http://localhost:${porta}`))
require('dotenv').config();
const express = require('express');
const soap = require('soap');
const fs = require('fs');
const path = require('path');

const pool = require('./config/database');

const produtoBinding = require('./soap/produtoService');
const cardapioBinding = require('./soap/cardapioService');
const pedidoBinding = require('./soap/pedidoService');
const usuarioBinding = require('./soap/usuarioService');

const PORT = process.env.PORT || 3000;

const app = express();

// O soap.listen precisa que o body chegue como texto puro (XML), então
// NÃO usamos express.json() aqui — isso é coisa de API REST.
// O node-soap cuida de ler e fazer o parse do envelope SOAP internamente.

function lerWsdl(nomeArquivo) {
    return fs.readFileSync(path.join(__dirname, 'wsdl', nomeArquivo), 'utf8');
}

async function startServer() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexão com MySQL estabelecida! ✔️');
        connection.release();
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        console.error('O servidor SOAP vai subir mesmo assim, mas as chamadas vão falhar até o banco estar disponível.');
    }

    const server = app.listen(PORT, () => {
        console.log(`Servidor SOAP rodando na porta ${PORT} 🚀`);
        console.log('');
        console.log('WSDLs disponíveis em:');
        console.log(`  http://localhost:${PORT}/produtoService?wsdl`);
        console.log(`  http://localhost:${PORT}/cardapioService?wsdl`);
        console.log(`  http://localhost:${PORT}/pedidoService?wsdl`);
        console.log(`  http://localhost:${PORT}/usuarioService?wsdl`);
    });

    // Cada soap.listen "pluga" um WSDL + seu binding num path específico,
    // usando o MESMO servidor HTTP do express (por isso passamos `server`).
    soap.listen(server, '/produtoService', produtoBinding, lerWsdl('produto.wsdl'));
    soap.listen(server, '/cardapioService', cardapioBinding, lerWsdl('cardapio.wsdl'));
    soap.listen(server, '/pedidoService', pedidoBinding, lerWsdl('pedido.wsdl'));
    soap.listen(server, '/usuarioService', usuarioBinding, lerWsdl('usuario.wsdl'));
}

startServer();

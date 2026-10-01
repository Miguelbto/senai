const mysql = require('mysql2/promise')
const config = require('./environment')
const logger = require('../utils/logger')
const { connect } = require('../../../src/app')
const { Connection } = require('mysql2')

const pool = mysql.createPool({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
    port: config.database.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
})

//teste conexão
pool.getConnection() 
    .then((connection) => {
        logger.info('Conexão com o banco de dados estabelecida')
        connection.release()
    })
    .catch((error) => {
        logger.error('Erro ao conectar com o banco de dados:', error.message)
        process.exit(1)
    })

module.exports = pool
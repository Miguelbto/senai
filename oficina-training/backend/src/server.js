const { start } = require('node:repl')
const app = require('./app')
const pool = require('./config/database')

const PORT = process.env.PORT || 3000

async function startServer() {
    try {
        const connection = await pool.getConnection()
        console.log('Conexão com Mysql estabelecida!! Parabens Miguel')
        connection.release()

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)
            console.log(`Rotas MVC ativas e escutando!`)
        })
    } catch (error) {
        console.error('Erro faltal ao conectar ao banco de dados:', error)
        process.exit(1)
    }
}

startServer()
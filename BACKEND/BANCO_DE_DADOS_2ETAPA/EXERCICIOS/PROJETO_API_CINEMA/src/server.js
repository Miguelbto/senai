const { connection } = require('mongoose')
const pool = require('./config/database.js')
const app = require('./app.js')

const PORT = 3000

pool.getConnection((err, connection) => {
    if(err){
        console.error('erro ao conectar ao banco:', err)
        process.exit(1)
    }
    console.log('conectado ao MYSQL')
    connection.release()
})

app.listen(PORT, () => {
    console.log("Servidor rodando!!")
})


import { buildApp } from './server'

const app = buildApp({ dbPath: 'loja.db', logger: false })

app.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
    console.log('Servidor rodando em http://localhost:3000')
})
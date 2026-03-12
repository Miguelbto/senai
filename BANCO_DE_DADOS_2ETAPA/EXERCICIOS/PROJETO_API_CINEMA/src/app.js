const express = require('express')
const pool = require('./config/database')
/*
const rotas = require('./rotas');
const app = express();

app.use(express.json()); //Permite que a API entenda o JSON
app.use(rotas); //Conecta o nosso arquivo de rotas

const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}!`);
});
*/ 

const app =express()

app.use(express.json())

const queryAsync = (sql, values = []) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, results) => {
            if(err) reject(err)
            else resolve(results)
        })
    })
}



app.get('/', (req, res) => {
    res.send("API CINEMA")
})


/*
app.get('/filmes', (req, res) =>{
    pool.query('SELECT * FROM filme', (err, results) =>{
        res.json(results)
    })
})
*/

app.get('/filmes', async (req, res) =>{
     try{
        const filmes = await queryAsync('SELECT * FROM filme')
        res.json({
            sucesso: true,
            dados: filmes,
            total: filmes.length
        })
    } catch (erro) {
        console.error('Erro ao listar filmes:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar filmes',
            erro: erro.mensage
        })
    }

})



app.get('/filmes/:id', async (req, res) => {
    try{
        const {id} = req.params

        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID de filme inválido'
            })
        }

        const filmes = await queryAsync('SELECT * FROM filme WHERE id = ?', [id])

        if(filmes.length === 0){
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Filme não encontrado'
            })
        }

        res.json({
            sucesso: true,
            dados: filmes
        })
    } catch (erro) {
        console.error(`Erro ao encontrar o filme id: ${req.params.id}`, erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Ocorreu um erro interno ao buscar o filme',
            /*erro: erro.menssage*/
        })
    }
})






/*

app.get('/filmes/:id', (req, res) => {
    const {id} = req.params

    pool.query('SELECT * FROM filme WHERE id = ?', [id], (err, results) => {
        res.json(results)
    })
})
*/

app.post('/filmes', async(req, res) => {
    try {
        const {titulo, genero, duracao, classificacao, data_lancamento} = req.body

        if(!titulo || !genero || !duracao) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Titulo, gênero e duração são obrigatórios'
            })
        }

        if(typeof titulo !== 'string' || typeof genero !== 'string'){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Titulo, gênero e duração devem ser textos validos'
            })
        }

        if(typeof duracao !== 'number' || duracao <= 0){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Duração deve ser um número positivo.'
            })
        }
        
        const novoFilme = {
            titulo: titulo.trim(),
            genero: genero.trim(),
            duracao: duracao, classificacao: classificacao || null, data_lancamento: data_lancamento || null
        }

        const resultado = await queryAsync('INSERT INTO filme SET ?', [novoFilme])

        res.status(201).json({
            sucesso: true,
            mensagem: 'Filme cadastrado com sucesso!',
            id: resultado.insertId,
        })

    } catch (erro) {
        console.error(`Erro ao salvar filme:`, erro)

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao salvar filme', 
            erro: erro.message
        })

        
        
    }
})



app.put('/filmes/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {titulo, genero, duracao, classificacao, data_lancamento} = req.body

        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID filme inválido'
            })
            
        }
        
        const filmesExiste = await queryAsync('SELECT * FROM filme WHERE id = ?', [id])
        if(filmesExiste.length === 0){
            return res.status(404).json({
                sucesso: false,
                mensagem: `Filme não encontrado.`
            })
        }

        const filmeAtualizado = {}

        if(titulo !== undefined) filmeAtualizado.titulo = titulo.trim()
        if(genero !== undefined) filmeAtualizado.genero = genero.trim()
        if(duracao !== undefined){
            if(typeof duracao !== 'number' || duracao <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Duração deve ser um número positivo'
                })
            }
            filmeAtualizado.duracao = duracao
        }

        if(classificacao !== undefined) filmeAtualizado.classificacao = classificacao
        if(data_lancamento !== undefined) filmeAtualizado.data_lancamento = data_lancamento

        if(Object.keys(filmeAtualizado).length === 0){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nenhum campo para atualizar'
            })
        }

        await queryAsync('UPDATE filme SET ? WHERE id = ?', [filmeAtualizado, id])

        res.json({
            sucesso: true,
            mensagem: 'Filme atualizado.'
        })

    } catch (erro) {
        console.error(`Erro ao atualizar filme:`, erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar filme',
            erro: erro.message,
        })
        
    }
})

app.delete('filmes/:id', async (req, res) => {
    try {
        const {id} = req.params

        if(!id !== isNaN || (id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID filme inválido'
            })
        }

        const filmesExiste = await queryAsync('SELECT * FROM filme WHERE id = ?')

        if(filmesExiste.length === 0){
            return res.status(404).json({
                sucesso:false,
                mensagem: `Filme não encontrado`
            })
        }

        await queryAsync('DELETE FROM filme WHERE id = ?', [id])

        res.status(200).json({
            sucesso: true,
            mensagem: 'Filme deletado com sucesso!',
        })
        
    } catch (erro) {
        console.error(`Erro ao apagar filme:`, erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Filme apagado',
            erro: erro.message,
        })
    }
})










module.exports = app
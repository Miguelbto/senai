//Exercício 1 - Usuários

app.get('/usuario', async (req, res) => {
    try {
        const x = await queryAsync("SELECT * FROM usuario WHERE id = ?", [req.params.id])
        const produto = await queryAsync('SELECT * FROM usuario ')
        res.json({
            sucesso: true,
            dados: usuario,
            total: usuario.length,
        })
        
    } catch (erro) {
        console.error('Erro ao listar usuario:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar usuario',
            erro: erro.mensage
        })
    }
})

app.get('/usuario/:id', async (req, res) => {
    try {
        const {id} = req.params

        if(!id || isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID de usuario inválido'
            })
        } 

        const usuario = await queryAsync('SELECT * FROM usuario WHERE id = ?', [id])

        if(usuario.length === 0){
            return res.status(404).json({
                sucesso: false,
                mensagem: 'usuario não encontrado'
            })
        }

        res.json({
            sucesso: true,
            dados: usuario
        })
        
    } catch (erro) {
        console.error(`Erro ao encontrar o usuario id:${req.params.id}`, erro)
        res.status(500).json({
            sucesso: true,
            erro: erro.mensage
        })
        
    }
})

   

//Exercício 2 - Pedidos

app.post('/pedidos', async (req, res) => {
    try {
        const { cliente, valor } = req.body
        if(!cliente || !valor){
            return res.status(400).json({
                sucesso: false, 
                mensagem: 'Cliente e valor devem estar preenchidos obrigatóriamente'
            })
        }

        if(typeof cliente !== 'string') {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nome e descrição devem ser textos válidos'
            })
        }

        if(typeof valor !== 'number' || valor < 0){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'O valor deve ser um numero positivo'
            })
        }


        const novoPedido = {
            cliente: cliente,
            valor: valor,
        }

        const resultado = await queryAsync('INSERT INTO produto SET ?', [novoPedido])

        res.status(201).json({
            sucesso: true,
            mensagem: 'Pedido cadastrado com sucesso!',
            id: resultado.insertid
        })
        
    } catch (erro) {
        console.error(`Erro ao salvar pedido`, erro)

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao salvar pedido',
            erro: erro.menssage
        })
        
    }
})


//Exercício 3 - Salas

app.put('/salas/:id', async (req, res) => {
    const id = req.params
    const dados = req.body

    const s = await queryAsync("SELECT * FROM sala WHERE id = ?", [id])

    if (s.length === 0) {
        return res.send("nao tem")
    }

    await queryAsync("UPDATE sala SET ? WHERE id = ?", [dados, id])

    res.send("foi")

    try {
        const {id} = req.params
        const {salas} = req.body

        if(!id || isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Id sala inválido'
            })
        }

        const salaExiste = await queryAsync('SELECT  * FROM sala WHERE id = ?', [id])
        if(salaExiste.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'sala não encontrada'
            })
        }

        const salaAtualizado = {}

        if(salas !== undefined) salaAtualizado.salas = salas.trim()
        
        if(Object.keys(salaAtualizado).length === 0){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nenhum campo para atualizar'
            })
        }

        res.json({
            sucesso: true,
            mensagem: 'sala atualizada'
        })
        
    } catch (erro) {
        console.error(`Erro ao atualizar sala:`, erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar sala',
            erro: erro.message,
        })
    }
})


app.delete('/salas/:id', async (req, res) => {
    try {
        const {id} = req.params

        if(!id !== isNaN || (id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID sala inválido'
            })
        }
        
        const salaExiste = await queryAsync('SELECT * FROM sala WHERE id = ?')

        if(salaExiste.length === 0){
            return res.status(404).json({
                sucesso:false,
                mensagem: 'sala não encontrada'
            })
        }

        await queryAsync('DELETE FROM sala WHERE id = ?', [id])

        res.status(200).json({
            sucesso: true,
            mensagem: 'sala deletada com sucesso'
        })


    } catch (erro) {
        console.error(`Erro ao apagar sala:`, erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'sala não deletada',
            erro: erro.message,
        })
        
    }
})

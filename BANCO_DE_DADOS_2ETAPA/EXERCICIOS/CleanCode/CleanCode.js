//Exercício 1 - Usuários

const exibirUsuario = async () => {
    const resultado = await queryAsync('SELECT * FROM usuario')
    return resultado
}


app.get('/usuario', async (req, res) => {
    try {
        const usuario = await exibirUsuario()
        return res.status(200).json({
            sucesso: true,
            dados: usuario,
            total: usuario.length,
        })
        
    } catch (erro) {
        console.error('Erro ao listar usuario:', erro)
        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar usuario',
            erro: erro.message
        })
    }
})




const buscarUsuarioNoBanco = async (id) => {
    const resultado = await queryAsync('SELECT * FROM usuario WHERE id = ?', [id]);
    
    // Como buscamos por ID, queremos retornar apenas 1 usuário (um objeto) 
    // e não uma lista (array). Se a lista vier vazia, retornamos null.
    return resultado.length > 0 ? resultado[0] : null;
};


app.get('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params;

       
        if (!id || isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID de usuário inválido'
            });
        } 

        
        const usuario = await buscarUsuarioNoBanco(id);

        // Verificamos o resultado da busca
        if (!usuario) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Usuário não encontrado'
            });
        }

        // Resposta de sucesso
        return res.status(200).json({
            sucesso: true,
            dados: usuario
        });
        
    } catch (erro) {
        console.error(`Erro ao encontrar o usuario id:${req.params.id}`, erro);
        return res.status(500).json({
            sucesso: false, 
            mensagem: 'Erro interno ao processar a solicitação'
        });
    }
});



   

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
            id: resultado.insertId
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

const buscarSalaNoBanco = async (id) => {
    const resultado = await queryAsync('SELECT * FROM sala WHERE id = ?', [id]);
    
    // Como buscamos por ID, queremos retornar apenas 1 usuário (um objeto) 
    // e não uma lista (array). Se a lista vier vazia, retornamos null.
    return resultado.length > 0 ? resultado[0] : null;
};

const validarDadosAtualizados = async(dadosAtualizados) => {
    if (Object.keys(dadosAtualizados).length === 0){
        return console.error("Nenhum campo para atualizar")
    }
}



app.put('/salas/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {salas} = req.body

        if(!id || isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Id sala inválido'
            })
        }

        const sala = await buscarSalaNoBanco(id)


        const salaAtualizado = {}

        if(salas !== undefined) salaAtualizado.salas = salas.trim()
        
        if(Object.keys(salaAtualizado).length === 0){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nenhum campo para atualizar'
            })
        }

        if (!validarDadosAtualizados){
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

// --- FUNÇÃO AUXILIAR (Banco de Dados) ---
const atualizarSalaNoBanco = async (id, dadosAtualizados) => {
    // Exemplo de como seria a query (o formato exato depende do seu driver/banco)
    // No MySQL (usando a biblioteca 'mysql2' ou similar), geralmente passamos o objeto direto:
    await queryAsync('UPDATE salas SET ? WHERE id = ?', [dadosAtualizados, id]);
};


app.put('/salas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { salas } = req.body; 

        // 1. Validação do ID (Fail Fast)
        if (!id || isNaN(id)) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID da sala inválido'
            });
        }

        // 2. Montagem e validação dos dados de entrada
        const salaAtualizado = {};

        // Verificamos se foi enviado E se é uma string antes de dar o .trim()
        if (salas !== undefined && typeof salas === 'string') {
            salaAtualizado.salas = salas.trim();
        }
        
        // Se após a limpeza o objeto estiver vazio, rejeitamos a requisição
        if (Object.keys(salaAtualizado).length === 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nenhum campo válido para atualizar'
            });
        }

        if (!validarDadosAtualizados){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nenhum campo para atualizar'
            })
        }

        // 3. Verificar se a sala existe ANTES de atualizar
        const salaExiste = await buscarSalaNoBanco(id);
        if (!salaExiste) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Sala não encontrada para atualização'
            });
        }

        // 4. Executar a atualização no banco
        await atualizarSalaNoBanco(id, salaAtualizado);

        // 5. Resposta de Sucesso
        return res.json({
            sucesso: true,
            mensagem: 'Sala atualizada com sucesso'
        });
        
    } catch (erro) {
        console.error(`Erro ao atualizar sala id:${req.params.id}:`, erro);
        
        // Mantendo a segurança: erro 500 sem expor o erro real (erro.message)
        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro interno ao processar a atualização da sala'
        });
    }
});


const deletarSalaNoBanco = async (id) => {
    await queryAsync('DELETE FROM sala WHERE id = ?', [id]);
};



app.delete('/salas/:id', async (req, res) => {
    try {
        const {id} = req.params

        if(!id || isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID sala inválido'
            })
        }

        const salaExiste = await buscarSalaNoBanco(id)
        if (!salaExiste){
            return res.status(404).json({
                sucesso: false,
                mensagem: 'sala não encontrada'
            })
        }
        

        await deletarSalaNoBanco(id)

        return res.status(200).json({
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


/*

CÓDIGO INSTRUTOR

//Exercício 1
function mensagem(res, tipo) {
    res.status(404).json({
        sucesso: false,
        mensagem: `${tipo} não encontrado(a).`
    })
}

function validarExistencia(resultado, res, tipo) {
    if (resultado.length === 0) {
        mensagem(res, tipo)
        return false
    }
    return true
}

app.get('/usuario', async (req, res) => {
    try {
        const listaUsuarios = await queryAsync("SELECT * FROM usuario")
        res.status(200).json({
            sucesso: true,
            dados: listaUsuarios
        })

    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: erro
        })

    }
})

app.get('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params
        const usuario = await queryAsync("SELECT * FROM usuario WHERE id = ?", [id])

        if (!validarExistencia(usuario, res, "Usuário")) {
            return
        }

        res.status(200).json({
            sucesso: true,
            dados: usuario[0]
        })
    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: erro
        })
    }
})

//Exercício 2

const validarDadosPedido = ({ cliente, valor }) => {
    if (!cliente || valor === undefined) {
        return "Cliente e valor são obrigatórios."
    }

    if (typeof valor !== 'number' || valor <= 0) {
        return "Valor inválido"
    }

    return null
}

app.post('/pedidos', async (req, res) => {
    try {
        const erro = validarDadosPedido(req.body)

        if (erro) {
            return res.status(400).json({
                sucesso: false,
                mensagem: erro
            })
        }

        await queryAsync("INSERT INTO pedido SET ?", [req.body])

        res.status(201).json({
            sucesso: true,
            mensagem: "Pedido cadastrado."
        })

    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: erro
        })
    }
})

//Exercício 3

const validarDadosAtualizados = (dados, res) => {
    if (Object.keys(dados).length === 0) {
            res.status(400).json({
            sucesso: false,
            mensagem: "Nenhum dado enviado"
        })
        return false
    }
    return true
}

app.put('/salas/:id', async (req, res) => {
    try {
        const { id } = req.params
        const dados = req.body

        const sala = await queryAsync("SELECT * FROM sala WHERE id = ?", [id])

        if (!validarExistencia(sala, res, "Sala")) {
            return
        }

        if(!validarDadosAtualizados(dados, res)){
            return
        }

        await queryAsync("UPDATE sala SET ? WHERE id = ?", [dados, id])

        res.status(200).json({
            sucesso: true,
            mensagem: "Sala atualizada"
        })
    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: erro
        })
    }
})

app.delete('/salas/:id', async (req, res) => {
    try {
        const id = req.params

        const sala = await queryAsync("SELECT * FROM sala WHERE id = ?", [id])

        if (!validarExistencia(sala, res, "Sala")) {
            return
        }

        await queryAsync("DELETE FROM sala WHERE id = ?", [id])

        res.status(200).json({
            sucesso: true,
            mensagem: "Sala removida."
        })
    } catch (erro) {
        res.status(500).json({
            sucesso: false,
            mensagem: erro
        })
    }
})




*/
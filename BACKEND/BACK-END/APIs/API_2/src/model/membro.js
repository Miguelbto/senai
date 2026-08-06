const app = express()

app.use(express.json())

const membro = [
    {
        id_membro:12627,
        nome_membro:"Miguel",
        endereco:"Rua sapinho verde",
        telefone:17262627,
       
    },
    {
        id_membro:12627,
        nome_membro:"Miguel",
        endereco:"Rua sapinho azul",
        telefone:17262627,
    }
]

function buscarMembro(id_membro){
    return membro.findIndex(membro => {
        return membro.id_membro === Number(membro)
    })
}

app.get("/", (req,res) => {
    res.status(200).send("Livraria Saber e Cia")
})

app.get("/membro", (req,res) => {
    res.status(200).json(membro)
})

app.get("/membro/:id_membro", (req,res) =>{
    const index = buscarMembro(req.params.id_membro)
    res.status(200).json(membro[index])
})

app.post("/membro", (req,res) => {
    membro.push(req.body)
    res.status(201).json(req.body)
})

app.put("/membro/:id_membro", (req,res) =>{
    const index = buscarMembro(req.params.membro)

    membro[index].id_membro = req.body.id_membro
    membro[index].nome_membro = req.body.nome_membro
    membro[index].endereco = req.body.endereco
    membro[index].telefone = req.body.telefone


    res.status(200).json(membro[index])
})

app.delete("/membro/:id_membro", (req,res) =>{
    const index = buscarMembro(req.params.id_membro)
    membro.splice(index, 1)
    res.status(200).json(membro)
})




export default app
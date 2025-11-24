const app = express()

app.use(express.json())

const exemplar = [
    {
        id_exemplar:17262627,
        status_exeplar:"PENDENTE",
        isbn:"62738373518",
       
    },
    {
        id_exemplar:15462622,
        status_exeplar:"DEVOLVIDO",
        isbn:"62733333518",
    }
]

function buscarExemplar(id_exemplar){
    return exemplar.findIndex(exemplar => {
        return exemplar.id_exemplar === Number(exemplar)
    })
}

app.get("/", (req,res) => {
    res.status(200).send("Livraria Saber e Cia")
})

app.get("/exemplar", (req,res) => {
    res.status(200).json(exemplar)
})

app.get("/exemplar/:id_exemplar", (req,res) =>{
    const index = buscarExemplar(req.params.id_exemplar)
    res.status(200).json(exemplar[index])
})

app.post("/exemplar", (req,res) => {
    exemplar.push(req.body)
    res.status(201).json(req.body)
})

app.put("/exemplar/:id_exemplar", (req,res) =>{
    const index = buscarExemplar(req.params.id_exemplar)

    exemplar[index].id_exemplar = req.body.id_exemplar
    exemplar[index].status_exemplar = req.body.status_exemplar
    exemplar[index].isbn = req.body.isbn


    res.status(200).json(autor_livro[index])
})

app.delete("/autor_livro/:isbn", (req,res) =>{
    const index = buscarAutor_livro(req.params.isbn)
    autor_livro.splice(index, 1)
    res.status(200).json(autor_livro)
})




export default app
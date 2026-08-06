const app = express()

app.use(express.json())

const autores = [
    {
        id_autor:1234,
        nome:"Miguel",
        nacionalidade:"Brasileiro",
       
    },
    {
        id_autor:1235,
        nome:"Miguel",
        nacionalidade:"Brasileiro",
       
    }
]

function buscarautor(id_autor){
    return autor.findIndex(autor => {
        return autor.isbn === Number(autor)
    })
}

app.get("/", (req,res) => {
    res.status(200).send("Livraria Saber e Cia")
})

app.get("/autor", (req,res) => {
    res.status(200).json(livros)
})

app.get("/autor/:id_autor", (req,res) =>{
    const index = buscarAutor(req.params.id_autor)
    res.status(200).json(autor[index])
})

app.post("/autor", (req,res) => {
    autor.push(req.body)
    res.status(201).json(req.body)
})

app.put("/autor/:autor", (req,res) =>{
    const index = buscarAutor(req.params.isbn)

    autor[index].id_autor = req.body.titulo_livro
    autor[index].nome = req.body.editora
    autor[index].nacionalidade = req.body.ano_publicacao

    res.status(200).json(autor[index])
})

app.delete("/autors/:id_autor", (req,res) =>{
    const index = buscarAutor(req.params.id_autor)
    livros.splice(index, 1)
    res.status(200).json(autor)
})




export default app
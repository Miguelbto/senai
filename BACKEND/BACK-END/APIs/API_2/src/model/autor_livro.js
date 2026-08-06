const app = express()

app.use(express.json())

const autores = [
    {
        isbn:2953926729179,
        id_autor:"Miguel",
       
    },
    {
        isbn:2953926729179,
        id_autor:"Miguel",
    }
]

function buscarautor_livro(isbn){
    return autor_livro.findIndex(autor_livro => {
        return autor_livro.isbn === Number(autor_livro)
    })
}

app.get("/", (req,res) => {
    res.status(200).send("Livraria Saber e Cia")
})

app.get("/autor_livro", (req,res) => {
    res.status(200).json(autor_livro)
})

app.get("/autor_livro/:isbn", (req,res) =>{
    const index = buscarAutor_livro(req.params.isbn)
    res.status(200).json(autor_livro[index])
})

app.post("/autor_livro", (req,res) => {
    autor_livro.push(req.body)
    res.status(201).json(req.body)
})

app.put("/autor_livro/:autor_livro", (req,res) =>{
    const index = buscarAutor_livro(req.params.isbn)

    autor_livro[index].isbn = req.body.isbn
    autor_livro[index].id_autor = req.body.id_autor

    res.status(200).json(autor_livro[index])
})

app.delete("/autor_livro/:isbn", (req,res) =>{
    const index = buscarAutor_livro(req.params.isbn)
    autor_livro.splice(index, 1)
    res.status(200).json(autor_livro)
})




export default app
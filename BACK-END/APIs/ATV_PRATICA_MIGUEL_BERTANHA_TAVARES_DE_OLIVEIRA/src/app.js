import express from "express"

const app = express()

app.use(express.json())

const livros = [
    {
        isbn:1,
        titulo_livro:"Java - Como programar",
        editora:"Saber",
        ano_publicacao:"2002"
    },
    {
        isbn:2,
        titulo_livro:"Java - Como programar de verdade",
        editora:"Saber",
        ano_publicacao:"2008"
    }
]

function buscarLivro(isbn){
    return livros.findIndex(livro => {
        return livro.isbn === Number(isbn)
    })
}

app.get("/", (req,res) => {
    res.status(200).send("Livraria Saber e Cia")
})

app.get("/livros", (req,res) => {
    res.status(200).json(livros)
})

app.get("/livros/:isbn", (req,res) =>{
    const index = buscarLivro(req.params.isbn)
    res.status(200).json(livros[index])
})

app.post("/livros", (req,res) => {
    livros.push(req.body)
    res.status(201).json(req.body)
})

app.put("/livros/:isbn", (req,res) =>{
    const index = buscarLivro(req.params.isbn)

    livros[index].titulo_livro = req.body.titulo_livro
    livros[index].editora = req.body.editora
    livros[index].ano_publicacao = req.body.ano_publicacao

    res.status(200).json(livros[index])
})

app.delete("/livros/:isbn", (req,res) =>{
    const index = buscarLivro(req.params.isbn)
    livros.splice(index, 1)
    res.status(200).json(livros)
})




export default app
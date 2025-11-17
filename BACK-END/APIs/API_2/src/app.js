import express from "express"
import conectaDB from "./config/dbConnect"
import livro from "./model/livro.js"

const conexao = await conectaDB()

conexao.on("error", (erro)=>{
    console.erro("erro de conexão", erro)
})

conexao.once("open", () =>{
    console.log("Conexão realizada!")
})

const app = express()

app.use(express.json())
/*
const livros = [
    {
        isbn: "1",
        titulo_livro:"Java - Como programar",
        editora: "Editora Saber",
        ano_publicacao: "2002"
    },

    {
        isbn: "2",
        titulo_livro:"Java - Como programar 2",
        editora: "Editora Saber",
        ano_publicacao: "2004"
    }
]
*/
/*
function buscarLivro(isbn) {
    return livros.findIndex(livro => {
        return livro.isbn === Number(isbn)
    })
}
*/
app.get("/",  (req, res) => {
    res.status(200).send("Livraria Saber e Cia")
})

/*
app.get("/livros",  (req, res) => {
    res.status(200).send(livros)
})
*/

app.get("/livros", async (req, res) => {
    const listarLivros = await livro.find({})
    res.status(200).json(listarLivros)
})

/*
app.get("/livros/:isbn",  (req, res) => {
    const index = buscarLivro(req.params.isbn)
    res.status(200).json(livros[index])
})
*/

app.get("/livros/:isbn", async (req, res) => {
    const isbn = req.params.isbn
    const livroSelecionado = await livro.findById(id)
    res.status(200).json(livroSelecionado)
})

/*
app.post("/livros", (req, res) => {
    livros.push(req.body)
    res.status(201).json(req.body)
} )
    */

app.post("/livros", async (req, res) => {
    const novoLivro = await livro.create(req.body)
    res.status(201).json({message: "Livro cadastrado", livro:novoLivro})
} )

app.put("/livros/:isbn", (req, res) =>{
    const index = buscarLivro(req.params.isbn)

    livros[index].titulo_livro = req.body.titulo_livro
    livros[index].editora = req.body.editora
    livros[index].ano_publicacao = req.body.ano_publicacao

    res.status(200).json(livros[index])
})

app.delete("/livros/:isbn", (req,res) => {
    const index = buscarLivro(req.params.isbn)

    livros.splice(index, 1,)
    res.status(200).json(livros)
})








export default app
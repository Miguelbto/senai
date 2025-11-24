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





const autor = [
    {
        id_autor:2926729179,
        nome_autor:"Miguel",
        nacionalidade:"Brasileiro",
       
    },
    {
        id_autor:2926720079,
        nome_autor:"Miguel3",
        nacionalidade:"Brasileiro",
    }
]



function buscarAutor (id_autor){
    return autor.findIndex(autor => {
        return autor.id_autor === Number(id_autor)
    })
}


app.get("/autor", (req,res) => {
    res.status(200).json(autor)
})

app.get("/autor/:id_autor", (req,res) =>{
    const index = buscarAutor(req.params.id_autor)
    res.status(200).json(autor[index])
})

app.post("/autor", (req,res) => {
    autor.push(req.body)
    res.status(201).json(req.body)
})

app.put("/autor/:id_autor", (req,res) =>{
    const index = buscarAutor(req.params.id_autor)

    autor[index].id_autor = req.body.id_autor
    autor[index].nome = req.body.nome
    autor[index].nacionalidade = req.body.nacionalidade

    res.status(200).json(autor[index])
})

app.delete("/autor/:id_autor", (req,res) =>{
    const index = buscarAutor(req.params.id_autor)
    autor.splice(index, 1)
    res.status(200).json(autor)
})


const emprestimo = [
    {
        id_emprestimo:12627,
        data_emprestimo:"12-03-1998",
        data_devolucao:"19-03-1998",
        data_devlucao_efetiva:"14-03-1998",
        id_exemplar:1799872627,
        id_membro:17262627,
       
    },
    {
        id_emprestimo:1227,
        data_emprestimo:"22-03-1998",
        data_devolucao:"29-04-1998",
        data_devlucao_efetiva:"30-03-1998",
        id_exemplar:179972627,
        id_membro:1726627,
    }
]

function buscarEmprestimo(id_emprestimo){
    return emprestimo.findIndex(emprestimo => {
    return emprestimo.id_emprestimo === Number(emprestimo)
    })
}

app.get("/", (req,res) => {
    res.status(200).send("Livraria Saber e Cia")
})

app.get("/emprestimo", (req,res) => {
    res.status(200).json(emprestimo)
})

app.get("/emprestimo/:emprestimo", (req,res) =>{
    const index = buscarEmprestimo(req.params.id_emprestimo)
    res.status(200).json(emprestimo[index])
})

app.post("/emprestimo", (req,res) => {
    emprestimo.push(req.body)
    res.status(201).json(req.body)
})

app.put("/emprestimo/:id_emprestimo", (req,res) =>{
    const index = buscarEmprestimo(req.params.emprestimo)

    emprestimo[index].id_emprestimo = req.body.id_emprestimo
    emprestimo[index].data_emprestimo = req.body.data_emprestimo
    emprestimo[index].data_devolucao = req.body.data_devolucao
    emprestimo[index].data_devolucao_efetiva = req.body.data_devolucao_efetiva
    emprestimo[index].id_exemplar = req.body.id_exemplar
    emprestimo[index].id_membro = req.body.id_membro


    res.status(200).json(emprestimo[index])
})

app.delete("/emprestimo/:id_emprestimo", (req,res) =>{
    const index = buscarEmprestimo(req.params.id_emprestimo)
    emprestimo.splice(index, 1)
    res.status(200).json(emprestimo)
})

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



app.use(express.json())

const membro = [
    {
        id_membro:12627,
        nome_membro:"Miguel",
        endereco:"Rua sapinho verde",
        telefone:17262627
       
    },
    {
        id_membro:12627,
        nome_membro:"Miguel",
        endereco:"Rua sapinho azul",
        telefone:17262627
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
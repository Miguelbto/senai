const app = express()

app.use(express.json())

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




export default app
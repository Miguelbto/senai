import mongoose from 'mongoose'

const livroSchema = new mongoose.Schema({
    id: {type:mongoose.Schema.Types.ObjectId},
    isbn: {type: int, required:true},
    titulo_livro: {type:string, required:true},
    editora: {type:string, required:true},
    ano_publicacao: {type:string, required:true}
}, {versionKey: false})

const autorSchema = new mongoose.Schema({
    id_autor: {type:mongoose.Schema.Types.ObjectId},
    nome_autor: {type: string, required:true},
    nacionalidade: {type:string, required:true}
}, {versionKey: false})

const autor_livroSchema = new mongoose.Schema({
    fk_id_autor: {type:mongoose.Schema.Types.ObjectId},
    fk_isbn: {type: int, required:true}
}, {versionKey: false})

const exemplarSchema = new mongoose.Schema({
    id_exemplar: {type:mongoose.Schema.Types.ObjectId},
    status_exemplar: {type: int, required:true},
    isbn: {type:int, required:true}
}, {versionKey: false})

const emprestimoSchema = new mongoose.Schema({
    id_emprestimo: {type:mongoose.Schema.Types.ObjectId},
    data_emprestimo: {type: date, required:true},
    data_devolucao: {type:date, required:false},
    data_devolucao_efetiva: {type:date, required:true},
    id_exemplar: {type:int, required:true},
    id_membro: {type:int, required:true}
}, {versionKey: false})

const membroSchema = new mongoose.Schema({
    id_membro: {type:mongoose.Schema.Types.ObjectId},
    nome_membro: {type: varchar(200), required:true},
    endereco: {type:varchar(200), required:false},
    telefone: {type:varchar(16), required:true}
}, {versionKey: false})




const livro = mongoose.model("livros", livroSchema)

export default livro
import mongoose from 'mongoose'

const livroSchema = new mongoose.Schema({
    id: {type:mongoose.Schema.Types.ObjectId},
    isbn: {type: int, required:true},
    titulo_livro: {type:string, required:true},
    editora: {type:string, required:true},
    ano_publicacao: {type:string, required:true}
}, {versionKey: false})

const livro = mongoose.model("livros", livroSchema)

export default livro
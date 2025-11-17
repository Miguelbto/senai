import mongoose from 'mongoose'

async function conectaDB(){
    mongoose.connect('mongodb+srv://miguelboliveira7:5ZsmChqsncoQOYiK@biblioteca.qx5e5qv.mongodb.net/?appName=Biblioteca')

    return mongoose.connection
}

export default conectaDB
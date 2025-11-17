import mongoose from 'mongoose'

function conectaDB(){
    mongoose.connect('mongodb+srv://miguelboliveira7:5ZsmChqsncoQOYiK@biblioteca.qx5e5qv.mongodb.net/?appName=Biblioteca')
}
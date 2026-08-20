// imports 

import { Admin } from "mongodb";
import { accessSync } from "node:fs";
import { bcrypt } from 'bcrypt'

// importar a rota anterior dos casos de uso do usuario
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// SALT_ROUNDS = 10

const dadosUsuario = [
    {id: 1,
    name: 'miguel',
    email: 'miguel@gmail',
    password: '123345',
    role: 'user'},

   { id: 2,
    name: 'ana',
    email: 'ana@gmail',
    password: '1245',
    role: 'admin'
}
]



interface User {
    id: number
    name: string;
    email: string;
    password: string | number;
    role: 'user' | 'admin';
}

const dados: User = {
    id: 1,
    name: 'miguel',
    email: 'miguel@gmail',
    password: '123345',
    role: 'user'}

class UserUseCase{
    
    async registerUser(DataUser: User) {

        const UserExist = dados.email
        if(!UserExist) {
            return 'usuario não existe'
        }

        const validPassword = await bcrypt.hash(DataUser.password)
    }
}
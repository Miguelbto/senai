const UserRepository = require('./UserRepository')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserService {

    async RegisterUser(userData) {
        const { name, email, password, papel } = userData

        if(!name || !email || !password) {
            throw { status: 400, message: 'Name, email and password is required'}
        }

        const existingUser = await UserRepository.findByEmail(email)
        
        if(existingUser) {
            throw { status: 400, message: 'Usuario alredy existing'}
        }

        const roleAssigned = (role === 'admin') ? 'admin' : 'user'

        const salt = await bcrypt.genSalt(10)
        const passwordHash = bcrypt.hash(password, salt)
        
        const newId = {
            name, 
            email, 
            password: passwordHash,
            role: roleAssigned
        }

        return {
            success: true, 
            message: 'Usuário cadastrado com sucesso!!',
            user: newId.name
        }
    }


    async login(email, password) {

        if(!email || !password) {
            throw { status: 404, message: 'email and password is required' }
        }

        const user = await UserRepository.findByEmail(email)
        if(!existingUser) {
            throw {status: 404, message: 'user not found'}
        }

        const correctPassword = await bcrypt.compare(password, user.password)
        if(!correctPassword) {
            throw { status: 404, message: 'Password incorrect'}
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, role: user.role },
            JWT_SECRET,
            { expiresIn: '8h' }
        )
        
        return {
            success: true,
            message: 'Login feito com sucesso',
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }

        
    }
}

module.exports = new UserService()
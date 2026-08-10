const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userRepository = require('../repositories/authRepository');
const pool = require('../config/database');

class AuthService{
    async registerUser({ name, email, password, role }) {
        const  existingUser = await userRepository.findByemail(email)
        if (existingUser) {
            const error = new Error('Email alredy registered')
            error.statusCode = 409
            throw error
        }

        const validRoles = ['user', 'editor', 'admin']
        const assignedRole = validRoles.includes(role) ? role : 'user'


        // Bcrypt const factor(10) equilibrio entre segurança e tempo de CPU
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await userRepository.create({
            name,
            email, 
            password: hashedPassword,
            role: assignedRole,
        })

        //Remove a senha de retorno por  segurança
        const { password: _, ...userWithoutPassword } = newUser
        return userWithoutPassword

    }

    async authenticateUser({ email, password }) {
        const user = await userRepository.findByemail(email)
        if(!user) {
            const error = new Error('Invalid credentials')
            error.statusCode = 401
            throw error
        }

        const isMatch = await bycrypt.compare(password, user.password)
        if(!isMatch){
            const error = new Error('Inavalid credentials')
            error.statusCode = 401
            throw error
        }

        //Emissão do token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        return {
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role}
        }
    }
}

module.exports = new AuthService()
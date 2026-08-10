const authService = require('../services/authService')

exports.register = async (req, res, next) => {
    try {
        
        const { name, email, password, role } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, password are required'})
        }

        const newUser = await authService.registerUser({ name, email, password, role })

        return res.status(201).json({
            message: 'User registered sucessfully',
            user: newUser,
        })

    } catch (error) {
        next(error) //Repassa para o middleware de tratamento de erros        
    }
}

exports.login = async(req, res, next) => {
    try {
        const { email, password } = req.body

        if(!email || !password) {
            return res.status(400).json({ message: 'Email and password are required'})
        }

        const { token, user } = await authService.authenticateUser({ email, password })

        return res.json({
            message: 'Login sucessful',
            token,
            user})
    } catch (error) {
        next(error)        
    }
}
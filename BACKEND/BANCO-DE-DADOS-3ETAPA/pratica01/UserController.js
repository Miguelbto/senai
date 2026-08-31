const UserService = require('./UserService')

class userController {

    async registerUser(req, res) {
        try {
            const result = await UserService.RegisterUser(req.body)
        res.status(201).json(result)
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error from server',
                erro: error.stack
            })
        }
    }


    async login(req, res) {
        try {
            const { email, password } = req.body
            const result = await UserService.login(email, password)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({
                successe: false,
                message: 'Error from server',
                error: error.stack
            })
        }
    }
}

module.exports = new userController()
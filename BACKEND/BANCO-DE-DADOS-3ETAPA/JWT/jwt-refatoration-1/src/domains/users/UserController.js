import UserService from './UserService.js';

class UserController {
    async createUser(req, res, next) {
        try {
            const { name, email, password, role } = req.body

            const user = await UserService.createUser({ name, email, password, role })

            return res.status(201).json({
                message: 'User created successfully',
                data: user
            })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    async register(req, res) {
        try {
            const { name, email, password, role } = req.body;
            const user = await UserService.registerUser({ name, email, password, role });
            return res.status(201).json(user);
        } catch (erro) {
            return res.status(400).json({ message: erro.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await UserService.login(email, password);
            return res.status(200).json(result);
        } catch (erro) {
            return res.status(401).json({ message: erro.message });
        }
    }

    async refresh(req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(400).json({ message: 'Refresh token not provided' });
            }
            const result = await UserService.renewToken(refreshToken);
            return res.status(200).json(result);
        } catch (erro) {
            return res.status(401).json({ message: erro.message });
        }
    }

    async logout(req, res) {
        try {
            const { refreshToken } = req.body;
            await UserService.logout(refreshToken);
            return res.status(204).send();
        } catch (erro) {
            return res.status(400).json({ message: erro.message });
        }
    }
}


export default new UserController()
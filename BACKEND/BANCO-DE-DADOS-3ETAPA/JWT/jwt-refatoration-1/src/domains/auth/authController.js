import AuthService from './authService.js';

class AuthController {
    async register(req, res, next) {
        try {
            const user = await AuthService.register(req.body);
            return res.status(201).json({
                status: 'success',
                message: 'Usuário registrado com sucesso!',
                user,
            });
        } catch (err) {
            return next(err);
        }
    }

    async login(req, res, next) {
        try {
            const result = await AuthService.login(req.body);
            return res.status(200).json({
                status: 'success',
                message: 'Login realizado com sucesso!',
                ...result,
            });
        } catch (err) {
            return next(err);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                const error = new Error('Refresh token not provided');
                error.statusCode = 400;
                throw error;
            }
            const result = await AuthService.refresh(refreshToken);
            return res.status(200).json({
                status: 'success',
                ...result,
            });
        } catch (err) {
            return next(err);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (refreshToken) {
                await AuthService.logout(refreshToken);
            }
            return res.status(204).send();
        } catch (err) {
            return next(err);
        }
    }
}

export default new AuthController();

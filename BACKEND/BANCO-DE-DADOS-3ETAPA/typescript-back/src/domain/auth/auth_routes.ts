import { FastifyInstance } from "fastify";
import { authController } from './auth_controller.js'
import { authenticate } from '../../shared/middlewares/authenticate.js'

export async function authRoutes(fastify: FastifyInstance) {

    // Rota de login deve ser pública
    fastify.post("/login", authController.login)

    fastify.post("/forgot-password", authController.forgotPassword)

    fastify.post("/reset-password", authController.resetPassword)

    // Rota de logout precisa authenticação
    fastify.post("/logout", {
        preHandler: authenticate,
        handler: authController.logout,
    })
}

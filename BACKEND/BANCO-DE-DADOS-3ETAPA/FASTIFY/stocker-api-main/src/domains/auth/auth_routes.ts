import { FastifyInstance } from "fastify";
import { authController } from "./auth_controller";
import { authenticate } from "../../shared/middlewares/authenticate";

export async function authRoutes(fastify: FastifyInstance) {
  // Rota de login deve ser pública
  fastify.post("/login", authController.login);

  fastify.post("/forgot-password", authController.forgotPassword);

  fastify.post("/reset-password", authController.resetPassword);

  // Rota de logout precisa de autenticação
  fastify.post("/logout", {
    preHandler: authenticate,
    handler: authController.logout,
  });
}

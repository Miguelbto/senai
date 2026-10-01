import { FastifyReply, FastifyRequest } from "fastify";
import { formatError } from "../../shared/utils/errors/formatZodErrors";
import { AuthService } from "./auth_service";
import {
  authBodySchema,
  ForgotPasswordBody,
  forgotPasswordSchema,
  LoginBody,
  ResetPasswordBody,
  resetPasswordSchema,
} from "./auth_schema";

const authService = new AuthService();

export const authController = {
  async login(
    request: FastifyRequest<{ Body: LoginBody }>,
    reply: FastifyReply,
  ) {
    try {
      const result = authBodySchema.safeParse(request.body);
      if (!result.success) {
        return reply.status(400).send({
          message: "Dados inválidos",
          errors: formatError(result),
        });
      }
      const email = result.data.email;
      const password = result.data.password;

      const { user, token } = await authService.login({ email, password });
      return reply.status(200).send({ user, token });
    } catch (error: any) {
      if (error.message === "Usuário não encontrado") {
        return reply.status(404).send({ message: "Usuário não encontrado" });
      }
      if (error.message === "Senha inválida") {
        return reply.status(401).send({ message: "Senha inválida" });
      }
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  },

  async logout(request: FastifyRequest, reply: FastifyReply) {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return reply.status(401).send({ message: "Token não encontrado" });
      }
      const token = authHeader.split(" ")[1];
      const result = await authService.logout(token);

      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  },

  async forgotPassword(
    request: FastifyRequest<{ Body: ForgotPasswordBody }>,
    reply: FastifyReply,
  ) {
    const result = forgotPasswordSchema.safeParse(request.body);
    if (!result.success) {
      return reply.status(400).send({
        message: "Dados inválidos",
        errors: formatError(result),
      });
    }
    const { email } = result.data;
    await authService.forgotPassword(email);
    return reply.send({ message: "Um link foi enviado para o e-mail" });
  },

  async resetPassword(
    request: FastifyRequest<{ Body: ResetPasswordBody }>,
    reply: FastifyReply,
  ) {
    const result = resetPasswordSchema.safeParse(request.body);
    if (!result.success) {
      return reply.status(400).send({
        message: "Dados inválidos",
        errors: formatError(result),
      });
    }

    const { token, newPassword } = result.data;

    try {
      await authService.resetPassword(token, newPassword);
      return reply.send({ message: "Senha atualizada com sucesso." });
    } catch (err) {
      return reply.code(400).send({ error: "Token inválido ou expirado" });
    }
  },
};

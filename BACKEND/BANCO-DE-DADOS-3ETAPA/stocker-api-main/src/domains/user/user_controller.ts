import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "./user_service";
import { formatError } from "../../shared/utils/errors/formatZodErrors";
import {
  CreateUserBody,
  createUserBodySchema,
  ParamsWithId,
  paramsWithIdSchema,
  UpdatePasswordBody,
  UpdateUserBody,
  updateUserPasswordSchema,
  UpdateUserRoleBody,
  updateUserRoleSchema,
  updateUserSchema,
} from "./user_schema";

const userService = new UserService();

// hello world

export const usersController = {
  async create(
    request: FastifyRequest<{ Body: CreateUserBody }>,
    reply: FastifyReply,
  ) {
    try {
      const result = createUserBodySchema.safeParse(request.body);

      if (!result.success) {
        return reply.status(400).send({
          message: "Dados inválidos",
          errors: formatError(result),
        });
      }
      const user = await userService.createUser(result.data);
      return reply.status(201).send(user);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  },

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await userService.findAll();
      return reply.status(200).send(users);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  },

  async findById(
    request: FastifyRequest<{ Params: ParamsWithId }>,
    reply: FastifyReply,
  ) {
    try {
      const result = paramsWithIdSchema.safeParse(request.params);
      if (!result.success) {
        return reply.status(400).send({
          message: "ID inválido",
          errors: formatError(result),
        });
      }
      const userId = result.data.id;
      const user = await userService.findById(userId);

      return reply.status(200).send(user);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  },
  async update(
    request: FastifyRequest<{ Params: ParamsWithId; Body: UpdateUserBody }>,
    reply: FastifyReply,
  ) {
    try {
      const paramsResult = paramsWithIdSchema.safeParse(request.params);

      if (!paramsResult.success) {
        return reply.status(400).send({
          message: "ID inválido",
          errors: formatError(paramsResult),
        });
      }

      const bodyResult = updateUserSchema.safeParse(request.body);

      if (!bodyResult.success) {
        return reply.status(400).send({
          message: "Dados inválidos",
          errors: formatError(bodyResult),
        });
      }

      const userId = paramsResult.data.id;
      const data = bodyResult.data;

      const user = await userService.update(userId, data);
      return reply.send(user);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  },

  async updateRole(
    request: FastifyRequest<{ Params: ParamsWithId; Body: UpdateUserRoleBody }>,
    reply: FastifyReply,
  ) {
    const paramsResult = paramsWithIdSchema.safeParse(request.params);

    if (!paramsResult.success) {
      return reply.status(400).send({
        message: "Id inválido",
      });
    }
    const bodyResult = updateUserRoleSchema.safeParse(request.body);
    if (!bodyResult.success) {
      return reply.status(400).send({
        message: "Dados inválidos",
        errors: formatError(bodyResult),
      });
    }

    const user = await userService.updateRole(
      paramsResult.data.id,
      bodyResult.data.role,
    );

    return reply.send(user);
  },

  async updatePassword(
    request: FastifyRequest<{ Params: ParamsWithId; Body: UpdatePasswordBody }>,
    reply: FastifyReply,
  ) {
    try {
      const paramsResult = paramsWithIdSchema.safeParse(request.params);
      if (!paramsResult.success) {
        return reply.status(400).send({
          message: "ID inválido",
          errors: formatError(paramsResult),
        });
      }

      const bodyResult = updateUserPasswordSchema.safeParse(request.body);

      if (!bodyResult.success) {
        return reply.status(400).send({
          message: "Dados inválidos",
          errors: formatError(bodyResult),
        });
      }

      const userId = paramsResult.data.id;
      const data = bodyResult.data;

      const user = await userService.updatePassword(userId, data);

      return reply.send(user);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  },

  async delete(
    request: FastifyRequest<{ Params: ParamsWithId }>,
    reply: FastifyReply,
  ) {
    try {
      const result = paramsWithIdSchema.safeParse(request.params);

      if (!result.success) {
        return reply.status(400).send({
          message: "ID inválido",
          errors: formatError(result),
        });
      }
      const userId = result.data.id;
      await userService.delete(userId);
      return reply.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  },
};

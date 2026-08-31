import { FastifyInstance } from "fastify";
import { usersController } from "./user_controller";
import { authenticate } from "../../shared/middlewares/authenticate";
import { authorize } from "@/shared/middlewares/authorization";
import { UserRole } from "@prisma/client";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/user", usersController.create);

  // Rotas protegidas que precisam de autenticação
  fastify.get("/user", {
    preHandler: authenticate,
    handler: usersController.findAll,
  });

  fastify.get("/user/:id", {
    preHandler: authenticate,
    handler: usersController.findById,
  });

  fastify.put("/user/:id", {
    preHandler: authenticate,
    handler: usersController.update,
  });

  fastify.put("/user/password/:id", {
    preHandler: authenticate,
    handler: usersController.updatePassword,
  });

  fastify.patch("/user/role/:id", {
    preHandler: [authenticate, authorize([UserRole.ADMIN])],
    handler: usersController.updateRole,
  });

  fastify.delete("/user/:id", {
    preHandler: authenticate,
    handler: usersController.delete,
  });
}

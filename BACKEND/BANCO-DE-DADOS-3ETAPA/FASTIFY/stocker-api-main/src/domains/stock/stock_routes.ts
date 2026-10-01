import type { FastifyInstance } from "fastify";
import { stockController } from "./stock_controller";
import { authenticate } from "../../shared/middlewares/authenticate";
import { authorize } from "@/shared/middlewares/authorization";
import { UserRole } from "@prisma/client";

export async function stockRoutes(fastify: FastifyInstance) {
  fastify.post("/stock/add/:productId", {
    preHandler: [
      authenticate,
      authorize([UserRole.ADMIN, UserRole.MANAGER, UserRole.OPERATOR]),
    ],
    handler: stockController.addProductStock,
  });

  fastify.post("/stock/remove/:productId", {
    preHandler: [
      authenticate,
      authorize([UserRole.ADMIN, UserRole.MANAGER, UserRole.OPERATOR]),
    ],
    handler: stockController.removeProductStock,
  });

  fastify.post("/stock/adjust/:productId", {
    preHandler: [authenticate, authorize([UserRole.ADMIN, UserRole.MANAGER])],
    handler: stockController.adjustStock,
  });

  fastify.get("/stock/low", {
    preHandler: [
      authenticate,
      authorize([
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.OPERATOR,
        UserRole.VIEWER,
      ]),
    ],
    handler: stockController.getLowStock,
  });

  fastify.get("/stock/movements/:productId", {
    preHandler: [
      authenticate,
      authorize([
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.OPERATOR,
        UserRole.VIEWER,
      ]),
    ],
    handler: stockController.getMovementsByProduct,
  });

  fastify.get("/stock/movements", {
    preHandler: [
      authenticate,
      authorize([
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.OPERATOR,
        UserRole.VIEWER,
      ]),
    ],
    handler: stockController.getAllMovements,
  });

  fastify.get("/stock/summary", {
    preHandler: [
      authenticate,
      authorize([
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.OPERATOR,
        UserRole.VIEWER,
      ]),
    ],
    handler: stockController.getSummary,
  });
}

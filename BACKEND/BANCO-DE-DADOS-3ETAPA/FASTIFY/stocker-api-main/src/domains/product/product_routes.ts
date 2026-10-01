import { FastifyInstance } from "fastify";
import { productController } from "./product_controller";
import { authenticate } from "../../shared/middlewares/authenticate";

export async function productRoutes(fastify: FastifyInstance) {
  fastify.post("/product", {
    preHandler: authenticate,
    handler: productController.create,
  });

  fastify.get("/product", {
    preHandler: authenticate,
    handler: productController.getAll,
  });

  fastify.get("/product/count", {
    preHandler: authenticate,
    handler: productController.getQuantity,
  });

  fastify.get("/product/:id", {
    preHandler: authenticate,
    handler: productController.getById,
  });

  fastify.get("/product/category/:category", {
    preHandler: authenticate,
    handler: productController.getByCategory,
  });

  fastify.get("/product/period/:startDate/:endDate", {
    preHandler: authenticate,
    handler: productController.getByPeriod,
  });

  fastify.put("/product/:id", {
    preHandler: authenticate,
    handler: productController.update,
  });

  fastify.delete("/product/:id", {
    preHandler: authenticate,
    handler: productController.delete,
  });
}

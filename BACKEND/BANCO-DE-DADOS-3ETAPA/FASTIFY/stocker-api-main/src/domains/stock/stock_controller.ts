import type { FastifyReply, FastifyRequest } from "fastify";
import { StockService } from "./stock_service";
import { formatError } from "../../shared/utils/errors/formatZodErrors";
import {
  stockQuantitySchema,
  stockAdjustmentSchema,
  stockProductIdParamsSchema,
  stockMovementFiltersSchema,
  type StockQuantityBody,
  type StockAdjustmentBody,
  type StockProductIdParams,
  type StockMovementFilters,
} from "./stock_schema";

const stockService = new StockService();

export const stockController = {
  async addProductStock(
    request: FastifyRequest<{
      Params: StockProductIdParams;
      Body: StockQuantityBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      const paramsResult = stockProductIdParamsSchema.safeParse(request.params);
      if (!paramsResult.success) {
        return reply.status(400).send({
          message: "ID inválido",
          errors: formatError(paramsResult),
        });
      }

      const bodyResult = stockQuantitySchema.safeParse(request.body);
      if (!bodyResult.success) {
        return reply.status(400).send({
          message: "Quantidade inválida",
          errors: formatError(bodyResult),
        });
      }

      if (!request.user) {
        return reply.status(401).send({
          message: "Usuário não autenticado",
        });
      }

      const { productId } = paramsResult.data;
      const { quantity, reason } = bodyResult.data;
      const userId = Number(request.user?.id);

      const product = await stockService.addStock(
        productId,
        quantity,
        userId,
        reason,
      );

      return reply
        .status(200)
        .send({ message: "Estoque adicionado com sucesso", product });
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(500).send({
          message: "Erro ao adicionar estoque",
          error: error.message,
        });
      }
      return reply.status(500).send({
        message: "Erro interno do servidor",
      });
    }
  },

  async removeProductStock(
    request: FastifyRequest<{
      Params: StockProductIdParams;
      Body: StockQuantityBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      const paramsResult = stockProductIdParamsSchema.safeParse(request.params);
      if (!paramsResult.success) {
        return reply.status(400).send({
          message: "ID inválido",
          errors: formatError(paramsResult),
        });
      }

      const bodyResult = stockQuantitySchema.safeParse(request.body);
      if (!bodyResult.success) {
        return reply.status(400).send({
          message: "Quantidade inválida",
          errors: formatError(bodyResult),
        });
      }

      if (!request.user) {
        return reply.status(401).send({
          message: "Usuário não autenticado",
        });
      }

      const { productId } = paramsResult.data;
      const { quantity, reason } = bodyResult.data;
      const userId = Number(request.user?.id);

      const product = await stockService.removeStock(
        productId,
        quantity,
        userId,
        reason,
      );

      return reply
        .status(200)
        .send({ message: "Estoque removido com sucesso", product });
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(500).send({
          message: "Erro ao remover estoque",
          error: error.message,
        });
      }
      return reply.status(500).send({
        message: "Erro interno do servidor",
      });
    }
  },

  async adjustStock(
    request: FastifyRequest<{
      Params: StockProductIdParams;
      Body: StockAdjustmentBody;
    }>,
    reply: FastifyReply,
  ) {
    try {
      const paramsResult = stockProductIdParamsSchema.safeParse(request.params);
      if (!paramsResult.success) {
        return reply.status(400).send({
          message: "Parâmetros inválidos",
          errors: formatError(paramsResult),
        });
      }
      const bodyResult = stockAdjustmentSchema.safeParse(request.body);
      if (!bodyResult.success) {
        return reply.status(400).send({
          message: "Dados Inválidos",
          errors: formatError(bodyResult),
        });
      }

      const { productId } = paramsResult.data;
      const { quantity, reason } = bodyResult.data;
      const userId = Number(request.user?.id);

      const product = await stockService.adjustStock(
        productId,
        quantity,
        userId,
        reason || "Ajuste manual de estoque",
      );

      return reply.status(200).send({
        message: "Estoque ajustado com sucesso",
        product,
      });
    } catch (error: any) {
      if (error.message === "Produto não encontrado") {
        return reply.status(404).send({ message: error.message });
      }
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  },

  async getLowStock(request: FastifyRequest, reply: FastifyReply) {
    try {
      const products = await stockService.findLowStockProducts();
      if (products.length === 0) {
        return reply
          .status(200)
          .send({ message: "Nenhum produto com estoque baixo encontrado" });
      }
      return reply
        .status(200)
        .send({ message: "Produtos com estoque baixo", products });
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(500).send({
          message: "Erro ao buscar produtos",
          error: error.message,
        });
      }
      return reply.status(500).send({
        message: "Erro interno do servidor",
      });
    }
  },

  async getMovementsByProduct(
    request: FastifyRequest<{
      Params: StockProductIdParams;
      Querystring: StockMovementFilters;
    }>,
    reply: FastifyReply,
  ) {
    try {
      const paramsResult = stockProductIdParamsSchema.safeParse(request.params);
      if (!paramsResult.success) {
        return reply.status(400).send({
          message: "Parâmetros inválidos",
          errors: formatError(paramsResult),
        });
      }
      const filtersResult = stockMovementFiltersSchema.safeParse(request.query);
      if (!filtersResult.success) {
        return reply.status(400).send({
          message: "Filtros inválidos",
          errors: formatError(filtersResult),
        });
      }
      const { productId } = paramsResult.data;
      const filters = filtersResult.data;

      const movements = await stockService.findMovementsByProduct(
        productId,
        filters,
      );
      return reply.status(200).send({
        message: "Movimentações do produto",
        movements,
      });
    } catch (error: any) {
      if (error.message === "Produto não encontrado") {
        return reply.status(404).send({
          message: error.message,
        });
      }
      return reply.status(500).send({ message: "Erro interno no servidor" });
    }
  },

  async getAllMovements(
    request: FastifyRequest<{ Querystring: StockMovementFilters }>,
    reply: FastifyReply,
  ) {
    try {
      const filtersResult = stockMovementFiltersSchema.safeParse(request.query);
      if (!filtersResult.success) {
        return reply.status(400).send({
          message: "Filtros inválidos",
          errors: formatError(filtersResult),
        });
      }

      const filters = Number(filtersResult.data);
      const movements = await stockService.findAllMovements(filters);

      return reply.status(200).send({
        message: "Todas as movimentações",
        movements,
      });
    } catch (error: any) {
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  },

  async getSummary(request: FastifyRequest, reply: FastifyReply) {
    try {
      const summary = await stockService.getStockSummary();
      return reply.status(200).send({
        message: "Resumo de estoque",
        summary,
      });
    } catch (error: any) {
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  },
};

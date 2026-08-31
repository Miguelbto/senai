import { prisma } from "../../shared/lib/prisma";
import type { Product, StockMovement } from "@prisma/client";

export class StockService {
  async addStock(
    productId: number,
    quantity: number,
    userId: number,
    reason?: string,
  ) {
    return await prisma.$transaction(async (tx) => {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new Error("Produto não encontrado");
      }
      await tx.stockMovement.create({
        data: {
          productId,
          quantity,
          type: "IN",
          userId,
          reason,
        },
      });
      return await tx.product.update({
        where: { id: productId },
        data: {
          stock: product.stock + quantity,
        },
      });
    });
  }

  async removeStock(
    productId: number,
    quantity: number,
    userId: number,
    reason?: string,
  ) {
    return await prisma.$transaction(async (tx) => {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new Error("Produto não encontrado");
      }

      if (product.stock < quantity) {
        throw new Error("Estoque insuficiente");
      }
      await tx.stockMovement.create({
        data: {
          productId,
          quantity,
          type: "OUT",
          userId,
          reason,
        },
      });
      return await tx.product.update({
        where: { id: productId },
        data: {
          stock: product.stock - quantity,
        },
      });
    });
  }

  async adjustStock(
    productId: number,
    newQuantity: number,
    userId: number,
    reason: string,
  ) {
    return await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: productId },
      });
      if (!product) {
        throw new Error("Produto não encontrado");
      }

      const difference = Math.abs(newQuantity - product.stock);

      await tx.stockMovement.create({
        data: {
          productId,
          quantity: difference,
          type: "ADJUSTMENT",
          userId,
          reason:
            reason ||
            `Ajuste de estoque de ${product.stock} para ${newQuantity}`,
        },
      });

      return await tx.product.update({
        where: { id: productId },
        data: {
          stock: newQuantity,
        },
      });
    });
  }
  async findLowStockProducts() {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        minStock: true,
        stock: true,
        category: true,
        imageUrl: true,
      },
    });

    return products.filter((product) => product.stock <= product.minStock);
  }

  async findMovementsByProduct(
    productId: number,
    filters?: { limit?: number; type?: string },
  ): Promise<StockMovement[]> {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new Error("Produto não encontrado");
    }

    return await prisma.stockMovement.findMany({
      where: {
        productId,
        type: filters?.type as any,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        product: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: filters?.limit || 50,
    });
  }

  async findAllMovements(
    productId: number,
    filters?: { limit?: number; type?: string },
  ): Promise<StockMovement[]> {
    return await prisma.stockMovement.findMany({
      where: {
        type: filters?.type as any,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        product: {
          select: { id: true, name: true, category: true, price: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: filters?.limit || 100,
    });
  }

  async getStockSummary() {
    const [totalProducts, products] = await Promise.all([
      prisma.product.count(),
      prisma.product.findMany({
        select: { stock: true, minStock: true, price: true },
      }),
    ]);

    const lowStockCount = products.filter((p) => p.stock <= p.minStock).length;

    const outOfStockCount = products.filter((p) => p.stock === 0).length;

    const totalValue = products.reduce((sum, p) => sum + p.stock * p.price, 0);

    return {
      totalProducts,
      lowStockCount,
      outOfStockCount,
      totalValue,
    };
  }
}

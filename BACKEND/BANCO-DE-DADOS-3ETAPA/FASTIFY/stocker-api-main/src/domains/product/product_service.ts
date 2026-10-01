import { prisma } from "../../shared/lib/prisma";

export class ProductService {
  async createProduct(data: {
    name: string;
    description: string;
    price: number;
    minStock?: number;
    stock: number;
    category: string;
    imageUrl: string;
    userId: number;
  }) {
    const existingProduct = await prisma.product.findUnique({
      where: {
        name: data.name,
      },
    });

    if (existingProduct) {
      throw new Error("Produto já existe");
    }

    return await prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          minStock: data.minStock,
          stock: data.stock,
          category: data.category,
          imageUrl: data.imageUrl,
          userId: data.userId,
        },

        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          minStock: true,
          stock: true,
          category: true,
          imageUrl: true,
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      await tx.stockMovement.create({
        data: {
          productId: product.id,
          quantity: data.stock,
          type: "INITIAL",
          userId: data.userId,
        },
      });

      return product;
    });
  }
  async updateProduct(
    id: number,
    data: {
      name?: string;
      description?: string;
      price?: number;
      minStock?: number;
      category?: string;
      imageUrl?: string;
    },
  ) {
    const productId = await prisma.product.findUnique({
      where: { id },
    });

    if (!productId) {
      throw new Error("Produto não encontrado");
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        minStock: data.minStock,
        category: data.category,
        imageUrl: data.imageUrl,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        minStock: true,
        category: true,
        imageUrl: true,
      },
    });
    return product;
  }

  async delete(id: number) {
    const productId = await prisma.product.findUnique({
      where: { id },
    });

    if (!productId) {
      throw new Error("Produto não encontrado");
    }

    await prisma.product.delete({
      where: { id },
    });
  }

  async findAll() {
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  }

  async findById(id: number) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        minStock: true,
        stock: true,
        category: true,
        imageUrl: true,
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    return product;
  }

  async countProducts() {
    const count = await prisma.product.count();
    return count;
  }

  async findByCategory(category: string) {
    const products = await prisma.product.findMany({
      where: {
        category: {
          contains: category,
          mode: "insensitive",
        },
      },

      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        minStock: true,
        category: true,
        imageUrl: true,
      },
    });

    if (category.length === 0) {
      throw new Error("Nenhum produto foi encontrado nessa categoria");
    }

    return products;
  }

  async findByPeriod(startDate: Date, endDate: Date) {
    const products = await prisma.product.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    return products;
  }
}

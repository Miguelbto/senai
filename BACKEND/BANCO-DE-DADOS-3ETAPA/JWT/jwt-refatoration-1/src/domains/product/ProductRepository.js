// ═══════════════════════════════════════════════════════════════════════════════
// src/domains/product/ProductRepository.js — Repositório de Produtos (Prisma)
// ═══════════════════════════════════════════════════════════════════════════════

import { prisma } from '../../shared/lib/prisma.js';
import { ProductModel } from './models/ProductModel.js';

class ProductRepository {

    async findAll() {
        const records = await prisma.produto.findMany({
            orderBy: { id: 'desc' },
        });
        return records.map(r => ProductModel.fromPrisma(r));
    }

    async findById(id) {
        const record = await prisma.produto.findUnique({
            where: { id: Number(id) },
        });
        return ProductModel.fromPrisma(record);
    }

    async create(productModel) {
        const record = await prisma.produto.create({
            data: productModel.toPrisma(),
        });
        return ProductModel.fromPrisma(record);
    }

    async update(id, productModel) {
        const record = await prisma.produto.update({
            where: { id: Number(id) },
            data: productModel.toPrisma(),
        });
        return ProductModel.fromPrisma(record);
    }

    async delete(id) {
        await prisma.produto.delete({
            where: { id: Number(id) },
        });
        return true;
    }
}

export default new ProductRepository();

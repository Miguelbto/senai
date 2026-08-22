// ═══════════════════════════════════════════════════════════════════════════════
// src/domains/order/OrderRepository.js — Repositório de Pedidos (Prisma)
// ═══════════════════════════════════════════════════════════════════════════════

import { prisma } from '../../shared/lib/prisma.js';
import { OrderModel } from './models/OrderModel.js';

class OrderRepository {

    async findAll() {
        const records = await prisma.pedido.findMany({
            orderBy: { criadoEm: 'desc' },
            include: {
                itens: {
                    include: { produto: true },
                },
            },
        });
        return records.map(r => OrderModel.fromPrisma(r));
    }

    async findById(id) {
        const record = await prisma.pedido.findUnique({
            where: { id: Number(id) },
            include: {
                itens: {
                    include: { produto: true },
                },
            },
        });
        return OrderModel.fromPrisma(record);
    }

    /**
     * Cria pedido + itens em uma transação.
     * @param {{ customer: string|null, status: string, total: number }} orderData
     * @param {{ productId: number, quantity: number, unitPrice: number }[]} items
     * @returns {number} ID do pedido criado
     */
    async create(orderData, items) {
        const result = await prisma.$transaction(async (tx) => {
            const pedido = await tx.pedido.create({
                data: {
                    cliente: orderData.customer || null,
                    status: orderData.status || 'pendente',
                    total: orderData.total,
                    itens: {
                        create: items.map(item => ({
                            produtoId: Number(item.productId),
                            quantidade: item.quantity,
                            precoUnitario: item.unitPrice,
                        })),
                    },
                },
            });
            return pedido.id;
        });
        return result;
    }

    async updateStatus(id, status) {
        const record = await prisma.pedido.update({
            where: { id: Number(id) },
            data: { status },
            include: {
                itens: {
                    include: { produto: true },
                },
            },
        });
        return OrderModel.fromPrisma(record);
    }

    async delete(id) {
        await prisma.pedido.delete({
            where: { id: Number(id) },
        });
        return true;
    }
}

export default new OrderRepository();

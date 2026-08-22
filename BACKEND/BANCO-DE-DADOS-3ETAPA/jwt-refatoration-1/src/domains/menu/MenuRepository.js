// ═══════════════════════════════════════════════════════════════════════════════
// src/domains/menu/MenuRepository.js — Repositório de Cardápios (Prisma)
// ═══════════════════════════════════════════════════════════════════════════════

import { prisma } from '../../shared/lib/prisma.js';
import { MenuModel } from './models/MenuModel.js';

class MenuRepository {

    async findAll() {
        const records = await prisma.cardapio.findMany({
            orderBy: { id: 'desc' },
            include: {
                produtos: {
                    include: { produto: true },
                },
            },
        });
        return records.map(r => MenuModel.fromPrisma(r));
    }

    async findById(id) {
        const record = await prisma.cardapio.findUnique({
            where: { id: Number(id) },
            include: {
                produtos: {
                    include: { produto: true },
                },
            },
        });
        return MenuModel.fromPrisma(record);
    }

    /**
     * Cria um cardápio e vincula os produtos em uma transação.
     * @param {MenuModel} menuModel
     * @param {number[]} productIds — IDs dos produtos a vincular
     * @returns {number} ID do cardápio criado
     */
    async create(menuModel, productIds) {
        const result = await prisma.$transaction(async (tx) => {
            const cardapio = await tx.cardapio.create({
                data: {
                    ...menuModel.toPrisma(),
                    produtos: {
                        create: productIds.map(produtoId => ({
                            produtoId: Number(produtoId),
                        })),
                    },
                },
            });
            return cardapio.id;
        });
        return result;
    }

    async update(id, menuModel) {
        const record = await prisma.cardapio.update({
            where: { id: Number(id) },
            data: menuModel.toPrisma(),
        });
        return MenuModel.fromPrisma(record);
    }

    async delete(id) {
        await prisma.cardapio.delete({
            where: { id: Number(id) },
        });
        return true;
    }
}

export default new MenuRepository();



import { ProductModel } from '../../product/models/ProductModel.js';

export class MenuModel {
    constructor({ id, name, description, available, products, createdAt, updatedAt }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.available = available;
        this.products = products || [];
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    /**
     * Converte um registro do Prisma (Cardapio) para MenuModel.
     * Inclui mapeamento dos produtos vinculados via CardapioProduto.
     */
    static fromPrisma(prismaData) {
        if (!prismaData) return null;

        // Prisma retorna: { ...cardapio, produtos: [{ produto: {...} }] }
        const products = (prismaData.produtos || []).map(cp => {
            // cp = CardapioProduto com include do Produto
            const produtoData = cp.produto || cp;
            return ProductModel.fromPrisma(produtoData);
        });

        return new MenuModel({
            id: prismaData.id,
            name: prismaData.nome,
            description: prismaData.descricao,
            available: prismaData.disponivel,
            products,
            createdAt: prismaData.criadoEm,
            updatedAt: prismaData.atualizadoEm,
        });
    }

    toPrisma() {
        const data = {};
        if (this.name !== undefined) data.nome = this.name;
        if (this.description !== undefined) data.descricao = this.description;
        if (this.available !== undefined) data.disponivel = this.available;
        return data;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            available: this.available,
            products: this.products,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}

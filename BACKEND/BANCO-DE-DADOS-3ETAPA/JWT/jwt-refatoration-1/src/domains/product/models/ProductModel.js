// ═══════════════════════════════════════════════════════════════════════════════
// src/domains/product/models/ProductModel.js — Classe de Domínio do Produto
// ═══════════════════════════════════════════════════════════════════════════════

export class ProductModel {
    constructor({ id, name, description, price, category, available, imageUrl, createdAt, updatedAt }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.available = available;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    /**
     * Converte um registro do Prisma (Produto) para ProductModel.
     */
    static fromPrisma(prismaData) {
        if (!prismaData) return null;

        return new ProductModel({
            id: prismaData.id,
            name: prismaData.nome,
            description: prismaData.descricao,
            price: Number(prismaData.preco),
            category: prismaData.categoria,
            available: prismaData.disponivel,
            imageUrl: prismaData.imagemUrl,
            createdAt: prismaData.criadoEm,
            updatedAt: prismaData.atualizadoEm,
        });
    }

    /**
     * Converte ProductModel para o formato que o Prisma espera.
     */
    toPrisma() {
        const data = {};
        if (this.name !== undefined) data.nome = this.name;
        if (this.description !== undefined) data.descricao = this.description;
        if (this.price !== undefined) data.preco = this.price;
        if (this.category !== undefined) data.categoria = this.category;
        if (this.available !== undefined) data.disponivel = this.available;
        if (this.imageUrl !== undefined) data.imagemUrl = this.imageUrl;
        return data;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            category: this.category,
            available: this.available,
            imageUrl: this.imageUrl,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}

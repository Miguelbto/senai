// ═══════════════════════════════════════════════════════════════════════════════
// src/domains/order/models/OrderModel.js — Classes de Domínio do Pedido
// ═══════════════════════════════════════════════════════════════════════════════

export class OrderItemModel {
    constructor({ id, orderId, productId, productName, productDescription, quantity, unitPrice }) {
        this.id = id;
        this.orderId = orderId;
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

    static fromPrisma(prismaData) {
        if (!prismaData) return null;

        return new OrderItemModel({
            id: prismaData.id,
            orderId: prismaData.pedidoId,
            productId: prismaData.produtoId,
            productName: prismaData.produto?.nome || null,
            productDescription: prismaData.produto?.descricao || null,
            quantity: prismaData.quantidade,
            unitPrice: Number(prismaData.precoUnitario),
        });
    }

    toJSON() {
        return {
            id: this.id,
            orderId: this.orderId,
            productId: this.productId,
            productName: this.productName,
            productDescription: this.productDescription,
            quantity: this.quantity,
            unitPrice: this.unitPrice,
        };
    }
}

export class OrderModel {
    constructor({ id, customer, status, total, items, createdAt, updatedAt }) {
        this.id = id;
        this.customer = customer;
        this.status = status;
        this.total = total;
        this.items = items || [];
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromPrisma(prismaData) {
        if (!prismaData) return null;

        const items = (prismaData.itens || []).map(item => OrderItemModel.fromPrisma(item));

        return new OrderModel({
            id: prismaData.id,
            customer: prismaData.cliente,
            status: prismaData.status,
            total: Number(prismaData.total),
            items,
            createdAt: prismaData.criadoEm,
            updatedAt: prismaData.atualizadoEm,
        });
    }

    toJSON() {
        return {
            id: this.id,
            customer: this.customer,
            status: this.status,
            total: this.total,
            items: this.items,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}

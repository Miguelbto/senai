// ═══════════════════════════════════════════════════════════════════════════════
// src/domains/order/OrderService.js — Serviço de Pedidos
// ═══════════════════════════════════════════════════════════════════════════════

import OrderRepository from './OrderRepository.js';
import ProductRepository from '../product/ProductRepository.js';

class OrderService {

    async createOrder(orderData) {
        const { customer, items } = orderData;

        if (!items || items.length === 0) {
            const error = new Error('O pedido deve conter ao menos um item.');
            error.statusCode = 400;
            throw error;
        }

        let totalCalculated = 0;
        const completeItems = [];

        for (const item of items) {
            if (!item.productId || !item.quantity || item.quantity <= 0) {
                const error = new Error('Cada item deve ter productId e quantity maior que zero.');
                error.statusCode = 400;
                throw error;
            }

            const product = await ProductRepository.findById(item.productId);
            if (!product) {
                const error = new Error(`Produto com ID ${item.productId} não encontrado.`);
                error.statusCode = 404;
                throw error;
            }

            if (!product.available) {
                const error = new Error(`O produto "${product.name}" está indisponível para pedidos.`);
                error.statusCode = 400;
                throw error;
            }

            const subtotal = product.price * item.quantity;
            totalCalculated += subtotal;

            completeItems.push({
                productId: product.id,
                quantity: item.quantity,
                unitPrice: product.price,
            });
        }

        const newOrder = {
            customer: customer || null,
            status: 'pendente',
            total: totalCalculated,
        };

        const orderId = await OrderRepository.create(newOrder, completeItems);
        return await OrderRepository.findById(orderId);
    }

    async listOrders() {
        return await OrderRepository.findAll();
    }

    async getOrderById(id) {
        const order = await OrderRepository.findById(id);
        if (!order) {
            const error = new Error('Pedido não encontrado.');
            error.statusCode = 404;
            throw error;
        }
        return order;
    }

    async updateStatus(id, newStatus) {
        const validStatuses = ['pendente', 'preparo', 'pronto', 'entregue'];
        if (!validStatuses.includes(newStatus)) {
            const error = new Error(`Status inválido. Permitidos: ${validStatuses.join(', ')}`);
            error.statusCode = 400;
            throw error;
        }

        const existingOrder = await OrderRepository.findById(id);
        if (!existingOrder) {
            const error = new Error('Pedido não encontrado.');
            error.statusCode = 404;
            throw error;
        }

        return await OrderRepository.updateStatus(id, newStatus);
    }

    async deleteOrder(id) {
        const existingOrder = await OrderRepository.findById(id);
        if (!existingOrder) {
            const error = new Error('Pedido não encontrado.');
            error.statusCode = 404;
            throw error;
        }

        await OrderRepository.delete(id);
    }
}

export default new OrderService();

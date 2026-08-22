import OrderService from './OrderService.js';

class OrderController {
    async create(req, res, next) {
        try {
            const order = await OrderService.createOrder(req.body);
            res.status(201).json({
                mensagem: 'Pedido criado com sucesso',
                order,
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const orders = await OrderService.listOrders();
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const order = await OrderService.getOrderById(req.params.id);
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }

    async updateStatus(req, res, next) {
        try {
            const { status } = req.body;
            if (!status) {
                const err = new Error('O campo status é obrigatório.');
                err.statusCode = 400;
                throw err;
            }
            const updatedOrder = await OrderService.updateStatus(req.params.id, status);
            res.status(200).json({
                mensagem: 'Status atualizado com sucesso',
                order: updatedOrder,
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            await OrderService.deleteOrder(req.params.id);
            res.status(200).json({ mensagem: 'Pedido excluído com sucesso' });
        } catch (error) {
            next(error);
        }
    }
}

export default new OrderController();

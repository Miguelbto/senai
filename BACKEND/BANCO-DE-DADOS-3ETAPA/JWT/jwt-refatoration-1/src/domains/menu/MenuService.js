// ═══════════════════════════════════════════════════════════════════════════════
// src/domains/menu/MenuService.js — Serviço de Cardápios
// ═══════════════════════════════════════════════════════════════════════════════

import MenuRepository from './MenuRepository.js';
import ProductRepository from '../product/ProductRepository.js';
import { MenuModel } from './models/MenuModel.js';

class MenuService {

    async listMenus() {
        const menus = await MenuRepository.findAll();
        return {
            success: true,
            data: menus,
            total: menus.length,
        };
    }

    async findMenuById(id) {
        if (!id || isNaN(id)) {
            const error = new Error('ID inválido');
            error.statusCode = 400;
            throw error;
        }

        const menu = await MenuRepository.findById(id);
        if (!menu) {
            const error = new Error('Cardápio não encontrado');
            error.statusCode = 404;
            throw error;
        }

        return {
            success: true,
            data: menu,
        };
    }

    async createMenu(data) {
        const { nome, descricao, disponivel, produtos } = data;

        if (!nome) {
            const error = new Error('O nome do cardápio é obrigatório');
            error.statusCode = 400;
            throw error;
        }

        if (!produtos || !Array.isArray(produtos) || produtos.length === 0) {
            const error = new Error('O cardápio deve conter pelo menos um produto vinculado no formato de array de IDs (ex: [1, 2, 3])');
            error.statusCode = 400;
            throw error;
        }

        // Valida se todos os produtos existem (sem duplicados)
        const uniqueProductIds = [...new Set(produtos)];
        for (const productId of uniqueProductIds) {
            const product = await ProductRepository.findById(productId);
            if (!product) {
                const error = new Error(`Produto com ID ${productId} não encontrado. Cadastro de cardápio cancelado.`);
                error.statusCode = 404;
                throw error;
            }
        }

        const menuModel = new MenuModel({
            name: nome.trim(),
            description: descricao ? descricao.trim() : null,
            available: disponivel ?? true,
        });

        const id = await MenuRepository.create(menuModel, uniqueProductIds);

        return {
            success: true,
            message: 'Cardápio cadastrado com sucesso',
            id,
        };
    }

    async deleteMenu(id) {
        if (!id || isNaN(id)) {
            const error = new Error('ID inválido');
            error.statusCode = 400;
            throw error;
        }

        const menu = await MenuRepository.findById(id);
        if (!menu) {
            const error = new Error('Cardápio não encontrado');
            error.statusCode = 404;
            throw error;
        }

        await MenuRepository.delete(id);

        return {
            success: true,
            message: 'Cardápio apagado com sucesso',
        };
    }
}

export default new MenuService();

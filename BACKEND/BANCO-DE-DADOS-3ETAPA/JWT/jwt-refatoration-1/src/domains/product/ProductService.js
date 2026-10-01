// ═══════════════════════════════════════════════════════════════════════════════
// src/domains/product/ProductService.js — Serviço de Produtos
// ─────────────────────────────────────────────────────────────────────────────
// Trabalha com ProductModel e ProductRepository.
// Não importa Prisma nem conhece estrutura do banco.
// ═══════════════════════════════════════════════════════════════════════════════

import ProductRepository from './ProductRepository.js';
import { ProductModel } from './models/ProductModel.js';
import fs from 'fs/promises';
import path from 'path';

class ProductService {

    async listProducts() {
        const products = await ProductRepository.findAll();
        return {
            success: true,
            data: products,
            total: products.length,
        };
    }

    async findProductById(id) {
        if (!id || isNaN(id)) {
            const error = new Error('ID inválido');
            error.statusCode = 400;
            throw error;
        }

        const product = await ProductRepository.findById(id);
        if (!product) {
            const error = new Error('Produto não encontrado');
            error.statusCode = 404;
            throw error;
        }

        return {
            success: true,
            data: product,
        };
    }

    async createProduct(data, file) {
        const { nome, descricao, preco, categoria, disponivel } = data;

        // Validação defensiva
        if (!nome?.trim() || !descricao?.trim() || preco === undefined) {
            const error = new Error('Nome, descrição e preço devem ser preenchidos');
            error.statusCode = 400;
            throw error;
        }

        const numericPrice = Number(String(preco).replace(',', '.'));
        if (isNaN(numericPrice) || numericPrice <= 0) {
            const error = new Error('Preço deve ser um número positivo');
            error.statusCode = 400;
            throw error;
        }

        const productModel = new ProductModel({
            name: nome.trim(),
            description: descricao.trim(),
            price: numericPrice,
            category: categoria || null,
            available: String(disponivel) === 'false' ? false : true,
            imageUrl: file ? `uploads/products/${file.filename}` : null,
        });

        const created = await ProductRepository.create(productModel);

        return {
            success: true,
            message: 'Produto cadastrado com sucesso',
            data: created,
        };
    }

    async updateProduct(id, data, file) {
        if (!id || isNaN(id)) {
            const error = new Error('ID inválido');
            error.statusCode = 400;
            throw error;
        }

        const existingProduct = await ProductRepository.findById(id);
        if (!existingProduct) {
            const error = new Error('Produto não encontrado');
            error.statusCode = 404;
            throw error;
        }

        const { nome, preco, descricao, categoria, disponivel } = data;

        // Constrói modelo parcial para update
        const updateData = {};
        if (nome !== undefined) updateData.name = nome.trim();
        if (descricao !== undefined) updateData.description = descricao.trim();

        if (preco !== undefined) {
            const numericPrice = Number(String(preco).replace(',', '.'));
            if (isNaN(numericPrice) || numericPrice <= 0) {
                const error = new Error('Preço deve ser um número positivo');
                error.statusCode = 400;
                throw error;
            }
            updateData.price = numericPrice;
        }

        if (categoria !== undefined) updateData.category = categoria;
        if (disponivel !== undefined) updateData.available = String(disponivel) !== 'false';

        if (file) {
            // Remove imagem antiga do disco
            if (existingProduct.imageUrl) {
                const oldPath = path.join(process.cwd(), existingProduct.imageUrl);
                await fs.unlink(oldPath).catch(() => {});
            }
            updateData.imageUrl = `uploads/products/${file.filename}`;
        }

        if (Object.keys(updateData).length === 0 && !file) {
            const error = new Error('Nenhum dado válido enviado para atualização');
            error.statusCode = 400;
            throw error;
        }

        const partialModel = new ProductModel(updateData);
        const updated = await ProductRepository.update(id, partialModel);

        return {
            success: true,
            message: 'Produto atualizado com sucesso',
            data: updated,
        };
    }

    async deleteProduct(id) {
        if (!id || isNaN(id)) {
            const error = new Error('ID inválido');
            error.statusCode = 400;
            throw error;
        }

        const existingProduct = await ProductRepository.findById(id);
        if (!existingProduct) {
            const error = new Error('Produto não encontrado');
            error.statusCode = 404;
            throw error;
        }

        // Remove imagem do disco
        if (existingProduct.imageUrl) {
            const filePath = path.join(process.cwd(), existingProduct.imageUrl);
            await fs.unlink(filePath).catch(() => {});
        }

        await ProductRepository.delete(id);

        return {
            success: true,
            message: 'Produto apagado com sucesso',
        };
    }
}

export default new ProductService();
import ProductService from './ProductService.js';

class ProductController {
    async list(req, res, next) {
        try {

            const resultado = await ProductService.listProducts()
            res.json(resultado)

        } catch (erro) {
            next(error);
        }

    }


    async findById(req, res, next) {
        try {
            const result = await ProductService.findProductById(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const result = await ProductService.createProduct(req.body, req.file);
            console.log("✅ Produto cadastrado com sucesso:", result);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const result = await ProductService.updateProduct(req.params.id, req.body, req.file);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const result = await ProductService.deleteProduct(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();
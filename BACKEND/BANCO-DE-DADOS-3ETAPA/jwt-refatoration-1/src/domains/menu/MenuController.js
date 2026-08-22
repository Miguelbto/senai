import MenuService from './MenuService.js';

class MenuController {
    async list(req, res, next) {
        try {
            const result = await MenuService.listMenus();
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async findById(req, res, next) {
        try {
            const result = await MenuService.findMenuById(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const result = await MenuService.createMenu(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const result = await MenuService.deleteMenu(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new MenuController();

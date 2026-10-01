import { Router } from 'express';
import MenuController from './MenuController.js';

const router = Router();

router.get('/', MenuController.list);
router.get('/:id', MenuController.findById);
router.post('/', MenuController.create);
router.delete('/:id', MenuController.delete);

export default router;

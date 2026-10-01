import { Router } from 'express';
import OrderController from './OrderController.js';

const router = Router();

router.post('/', OrderController.create);
router.get('/', OrderController.getAll);
router.get('/:id', OrderController.getById);
router.patch('/:id/status', OrderController.updateStatus);
router.delete('/:id', OrderController.delete);

export default router;

import { Router } from 'express';
import UserController from './UserController.js';
import { verifyToken, verifyAdmin } from '../../shared/middlewares/auth.js';

const router = Router();

router.post('/user', UserController.createUser);

export default router;

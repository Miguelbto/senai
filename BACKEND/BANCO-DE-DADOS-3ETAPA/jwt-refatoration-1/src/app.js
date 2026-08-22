import express from 'express';
import cors from 'cors';


import authRoutes from './domains/auth/authRoutes.js';
import menuRoutes from './domains/menu/menuRoutes.js';
import orderRoutes from './domains/order/orderRoutes.js';
import productRoutes from './domains/product/productRoutes.js';
import userRoutes from './domains/users/userRoutes.js';
import errorMiddleware from './shared/middlewares/errorMiddleware.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/menus', menuRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

// Error middleware should be the last one
app.use(errorMiddleware);

export default app;

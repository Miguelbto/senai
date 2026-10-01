// ═══════════════════════════════════════════════════════════════════════════════
// src/domains/users/UserService.js — Serviço de Usuários
// ─────────────────────────────────────────────────────────────────────────────
// Trabalha APENAS com UserModel e UserRepository.
// Não importa jsonwebtoken, bcrypt ou Prisma diretamente.
// ═══════════════════════════════════════════════════════════════════════════════

import bcrypt from 'bcrypt';
import UserRepository from './UserRepository.js';
import { UserModel } from './models/UserModel.js';

const SALT_ROUNDS = 10;

class UserService {

    async createUser({ name, email, password, role }) {
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            const error = new Error('Email already registered');
            error.statusCode = 409;
            throw error;
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
        const assignedRole = role === 'admin' ? 'admin' : 'client';

        const userModel = new UserModel({
            name,
            email,
            password: passwordHash,
            role: assignedRole,
        });

        const createdUser = await UserRepository.create(userModel);
        return createdUser.toSafeJSON();
    }

    async findByEmail(email) {
        if (!email) {
            const error = new Error('Invalid email');
            error.statusCode = 400;
            throw error;
        }

        const user = await UserRepository.findByEmail(email);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        return user.toSafeJSON();
    }

    async findById(id) {
        const user = await UserRepository.findById(id);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        return user.toSafeJSON();
    }
}

export default new UserService();
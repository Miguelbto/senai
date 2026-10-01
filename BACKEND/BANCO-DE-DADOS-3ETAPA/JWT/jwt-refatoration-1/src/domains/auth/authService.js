// ═══════════════════════════════════════════════════════════════════════════════
// src/domains/auth/authService.js — Serviço de Autenticação
// ─────────────────────────────────────────────────────────────────────────────
// Usa shared/lib/jwt.js para gerar/verificar tokens.
// Usa UserRepository para persistência.
// Trabalha com UserModel como classe de domínio.
// ═══════════════════════════════════════════════════════════════════════════════

import bcrypt from 'bcrypt';
import UserRepository from '../users/UserRepository.js';
import { UserModel } from '../users/models/UserModel.js';
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from '../../shared/lib/jwt.js';

const SALT_ROUNDS = 10;

class AuthService {

    async register({ name, email, password, role }) {
        // Verifica se email já existe
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            const error = new Error('Email already registered');
            error.statusCode = 409;
            throw error;
        }

        // Valida e atribui papel
        const validRoles = ['client', 'admin'];
        const assignedRole = validRoles.includes(role) ? role : 'client';

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Cria o modelo de domínio e persiste
        const userModel = new UserModel({
            name,
            email,
            password: hashedPassword,
            role: assignedRole,
        });

        const createdUser = await UserRepository.create(userModel);
        return createdUser.toSafeJSON();
    }

    async login({ email, password }) {
        // Busca usuário pelo email
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        // Verifica senha
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        // Gera tokens via módulo centralizado
        const accessToken = generateAccessToken({ id: user.id, role: user.role });
        const refreshToken = generateRefreshToken({ id: user.id });

        // Salva refresh token no banco
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await UserRepository.saveRefreshToken(user.id, refreshToken, expiresAt);

        return {
            user: user.toSafeJSON(),
            accessToken,
            refreshToken,
        };
    }

    async refresh(receivedRefreshToken) {
        // Busca o refresh token no banco
        const tokenRecord = await UserRepository.findRefreshToken(receivedRefreshToken);
        if (!tokenRecord) {
            const error = new Error('Invalid refresh token');
            error.statusCode = 401;
            throw error;
        }

        // Verifica se expirou
        if (new Date(tokenRecord.expiresAt) < new Date()) {
            await UserRepository.removeRefreshToken(receivedRefreshToken);
            const error = new Error('Expired refresh token');
            error.statusCode = 401;
            throw error;
        }

        // Valida a assinatura do token
        const payload = verifyRefreshToken(receivedRefreshToken);

        // Gera novo access token
        const newAccessToken = generateAccessToken({
            id: payload.id,
            role: tokenRecord.user.role,
        });

        return { accessToken: newAccessToken };
    }

    async logout(refreshToken) {
        await UserRepository.removeRefreshToken(refreshToken);
    }
}

export default new AuthService();
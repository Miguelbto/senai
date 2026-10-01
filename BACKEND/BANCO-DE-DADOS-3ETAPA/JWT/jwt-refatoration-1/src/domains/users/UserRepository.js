// ═══════════════════════════════════════════════════════════════════════════════
// src/domains/users/UserRepository.js — Repositório de Usuários (Prisma)
// ─────────────────────────────────────────────────────────────────────────────
// ÚNICA camada que importa o PrismaClient. Todos os métodos retornam
// instâncias de UserModel, nunca objetos raw do Prisma.
// ═══════════════════════════════════════════════════════════════════════════════

import { prisma } from '../../shared/lib/prisma.js';
import { UserModel } from './models/UserModel.js';

class UserRepository {

    async findByEmail(email) {
        const record = await prisma.usuario.findUnique({
            where: { email },
        });
        return UserModel.fromPrisma(record);
    }

    async findById(id) {
        const record = await prisma.usuario.findUnique({
            where: { id: Number(id) },
        });
        return UserModel.fromPrisma(record);
    }

    async create(userModel) {
        const record = await prisma.usuario.create({
            data: userModel.toPrisma(),
        });
        return UserModel.fromPrisma(record);
    }

    // ── Refresh Token ────────────────────────────────────────────────────

    async saveRefreshToken(userId, token, expiresAt) {
        await prisma.refreshToken.create({
            data: {
                usuarioId: Number(userId),
                token,
                expiraEm: expiresAt,
            },
        });
    }

    async findRefreshToken(token) {
        const record = await prisma.refreshToken.findFirst({
            where: { token },
            include: { usuario: true },
        });

        if (!record) return null;

        return {
            token: record.token,
            expiresAt: record.expiraEm,
            user: UserModel.fromPrisma(record.usuario),
        };
    }

    async removeRefreshToken(token) {
        // deleteMany porque findFirst não garante unique
        await prisma.refreshToken.deleteMany({
            where: { token },
        });
    }

    async removeAllRefreshTokens(userId) {
        await prisma.refreshToken.deleteMany({
            where: { usuarioId: Number(userId) },
        });
    }
}

export default new UserRepository();

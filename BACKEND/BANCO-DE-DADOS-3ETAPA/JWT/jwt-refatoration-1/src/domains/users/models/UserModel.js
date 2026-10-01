// ═══════════════════════════════════════════════════════════════════════════════
// src/domains/users/models/UserModel.js — Classe de Domínio do Usuário
// ─────────────────────────────────────────────────────────────────────────────
// Esta classe é a BARREIRA entre o Prisma e as camadas superiores.
// Controller e Service trabalham APENAS com UserModel, nunca com tipos Prisma.
// ═══════════════════════════════════════════════════════════════════════════════

export class UserModel {
    constructor({ id, name, email, password, role, createdAt, updatedAt }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    /**
     * Converte um registro do Prisma (campos pt-BR) para UserModel (campos en).
     * @param {object} prismaData — registro retornado pelo prisma.usuario.*
     * @returns {UserModel|null}
     */
    static fromPrisma(prismaData) {
        if (!prismaData) return null;

        return new UserModel({
            id: prismaData.id,
            name: prismaData.nome,
            email: prismaData.email,
            password: prismaData.senha,
            role: prismaData.papel,
            createdAt: prismaData.criadoEm,
            updatedAt: prismaData.atualizadoEm,
        });
    }

    /**
     * Converte UserModel para o formato que o Prisma espera (campos pt-BR).
     * Exclui campos auto-gerenciados (id, criadoEm, atualizadoEm).
     * @returns {object}
     */
    toPrisma() {
        return {
            nome: this.name,
            email: this.email,
            senha: this.password,
            papel: this.role,
        };
    }

    /**
     * Retorna o UserModel sem o campo de senha — seguro para respostas HTTP.
     * @returns {object}
     */
    toSafeJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
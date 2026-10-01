// ═══════════════════════════════════════════════════════════════════════════════
// src/shared/lib/jwt.js — Módulo centralizado de JWT
// ─────────────────────────────────────────────────────
// Toda geração e verificação de tokens acontece AQUI.
// Nenhum Service ou Controller deve importar 'jsonwebtoken' diretamente.
// ═══════════════════════════════════════════════════════════════════════════════

import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRES = process.env.JWT_EXPIRES_IN || '1d';
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES_IN;

// ── Access Token ─────────────────────────────────────────────────────────────

/**
 * Gera um access token com os dados do payload.
 * @param {{ id: number, role: string }} payload
 * @returns {string} JWT assinado
 */
export function generateAccessToken(payload) {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
}

/**
 * Verifica e decodifica um access token.
 * @param {string} token
 * @returns {object} payload decodificado
 * @throws {JsonWebTokenError | TokenExpiredError}
 */
export function verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_SECRET);
}

// ── Refresh Token ────────────────────────────────────────────────────────────

/**
 * Gera um refresh token (payload mínimo — apenas id).
 * @param {{ id: number }} payload
 * @returns {string} JWT assinado
 */
export function generateRefreshToken(payload) {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
}

/**
 * Verifica e decodifica um refresh token.
 * @param {string} token
 * @returns {object} payload decodificado
 * @throws {JsonWebTokenError | TokenExpiredError}
 */
export function verifyRefreshToken(token) {
    return jwt.verify(token, REFRESH_SECRET);
}

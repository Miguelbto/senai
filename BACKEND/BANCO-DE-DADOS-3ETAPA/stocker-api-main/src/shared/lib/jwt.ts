// src/lib/jwt.ts
import { UserRole } from "@prisma/client";
import jwt from "jsonwebtoken";

// Certifique-se de que JWT_SECRET está definido no ambiente
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error(
    "AVISO: JWT_SECRET não está definido no ambiente. A aplicação não funcionará corretamente.",
  );
}
const JWT_EXPIRES_IN = "1d";

export function signToken(payload: { id: number; role: UserRole }): string {
  return jwt.sign(payload, JWT_SECRET!, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function signResetToken(email: string) {
  return jwt.sign({ email }, JWT_SECRET!, { expiresIn: "15m" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET!);
  } catch (err) {
    throw new Error("Token inválido");
  }
}

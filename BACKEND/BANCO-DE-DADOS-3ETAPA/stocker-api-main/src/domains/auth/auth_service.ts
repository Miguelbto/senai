import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../../shared/lib/prisma";
import { signResetToken, signToken } from "../../shared/lib/jwt";
import { sendResetEmail } from "../../shared/lib/mailer";

export class AuthService {
  async login(data: { email: string; password: string }) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error("Senha inválida");
    }

    const token = signToken({ id: user.id, role: user.role });
    return { user, token };
  }

  async logout(token: string) {
    await prisma.invalidToken.create({
      data: {
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
    return { message: "Logout realizado com sucesso" };
  }

  async forgotPassword(email: string) {
    const userEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userEmail) return;

    const token = signResetToken(email);

    await sendResetEmail(email, token);
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const { email } = jwt.verify(token, process.env.JWT_SECRET!) as {
        email: string;
      };
      const hashed = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { email },
        data: { password: hashed },
      });
    } catch (error) {
      throw new Error("Token inválido ou expirado");
    }
  }
}

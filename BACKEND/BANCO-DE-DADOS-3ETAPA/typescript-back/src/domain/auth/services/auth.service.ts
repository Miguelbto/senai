import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from '../../../shared/lib/prisma.js'
import { signResetToken, signToken } from '../../../shared/lib/jwt.js'
import { sendResetEmail } from '../../../shared/lib/mailer.js'
import { email } from 'zod';

export class AuthService {
    async login(data: { email: string, password: string }) {
        const user = await prisma.usuario.findUnique({
            where: {
                email: data.email,
            },
        })

        if(!user) {
            throw new Error("Usuario não encontrado")
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.senha)

        if (!isPasswordValid) {
            throw new Error("Credencias inválidas")
        }

        const token = signToken({ id: user.id, role: user.papel })
        return { user, token }
    }

    async logout(token: string) {
        await prisma.invalidToken.create({
            data: {
                token,
            },
        })
        return { message: "Logout realizado com sucesso!"}
    }

    async forgotPassword(email: string) {
        const userEmail = await prisma.usuario.findFirst({
            where: {
                email: email,
            },
        })

        if (!userEmail) return

        const token = signResetToken(email)

        await sendResetEmail(email, token)
    }

    async resetPassword(token: string, newPassword: string) {
        try {
            const { email } = jwt.verify(token, process.env.JWT_SECRET!) as {
                email: string
            }

            const hashed = await bcrypt.hash(newPassword, 10)

            await prisma.usuario.update({
                where: { email },
                data: { senha: hashed },
            })
        } catch (error) {
            throw new Error("Token inválido ou expirado")
        }
    }

}
import { FastifyReply, FastifyRequest } from 'fastify'
import { verifyToken } from '../lib/jwt.js'
import { prisma } from '../lib/prisma.js'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    try {
        const authheader = request.headers.authorization
        if (!authheader || !authheader.startsWith("Bearer")) {
            return reply.status(401).send({ message: "Token não encontrado" })
        }

        const token = authheader.split(" ")[1]

        const invalidToken = await prisma.invalidToken.findFirst({
            where: {
                token,
            }
        })

        if (invalidToken) {
            return reply.status(401).send({ message: "Token inválido ou expirado " })
        }

        const decoded = verifyToken(token)

        if (typeof decoded === 'string') {
            return reply.status(401).send({ message: 'Token inválido' })
        }

        if (!decoded.id) {
            return reply.status(401).send({ message: "Token inválido" })
        }

        request.user = { id: decoded.id, role: decoded.role }

    } catch (error) {

        if (error instanceof Error) {
            return reply.status(401).send({
                message: "Erro de autentificação",
                error: error.message,
            })
        }
        return reply.status(401).send({ message: "Erro de autentificação" })

    }
}
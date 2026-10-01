import { UserRole } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

export function authorize(roles: UserRole[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const userRole = request.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      return reply.status(403).send({ message: "Acesso Negado" });
    }
  };
}

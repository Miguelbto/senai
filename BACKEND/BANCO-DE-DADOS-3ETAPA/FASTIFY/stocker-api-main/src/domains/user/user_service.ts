import { compare, hash } from "bcryptjs";
import { prisma } from "../../shared/lib/prisma";
import { UserRole } from "@prisma/client";

export class UserService {
  async createUser(data: {
    name: string;
    email: string;
    password: string;
    imageUrl?: string;
    role?: UserRole;
  }) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new Error("Usuário já existe");
    }

    const hashedPassword = await hash(data.password, 10);

    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        imageUrl: data.imageUrl,
        password: hashedPassword,
        role: data.role,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        imageUrl: true,
        role: true,
        password: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  }

  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        imageUrl: true,
        password: false,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  async update(
    id: number,
    data: {
      name?: string;
      email?: string;
      imageUrl?: string;
    },
  ) {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        email: data.email,
        imageUrl: data.imageUrl,
      },
    });

    return user;
  }

  async updateRole(id: number, role: UserRole) {
    const user = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    });
    return user;
  }

  async updatePassword(
    id: number,
    data: {
      currentPassword: string;
      newPassword: string;
    },
  ) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await compare(data.currentPassword, user.password);

    if (!isPasswordValid) {
      throw new Error("Senha atual incorreta");
    }

    const hashedPassword = await hash(data.newPassword, 10);

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashedPassword,
        updatedAt: new Date(),
      },

      select: {
        id: true,
        name: true,
        email: true,
        updatedAt: true,
      },
    });
    return updatedUser;
  }

  async delete(id: number) {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return user;
  }
}

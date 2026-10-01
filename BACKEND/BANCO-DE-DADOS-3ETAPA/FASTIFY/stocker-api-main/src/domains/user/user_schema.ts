import { UserRole } from "@prisma/client";
import { z } from "zod";

const paramsWithIdSchema = z.object({
  id: z.string().transform((value) => {
    const parsedId = parseInt(value);
    if (isNaN(parsedId)) {
      throw new Error("ID inválido");
    }
    return parsedId;
  }),
});

const createUserBodySchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email(),
  imageUrl: z.string().optional(),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
  role: z.nativeEnum(UserRole).optional(),
});

const updateUserSchema = z
  .object({
    name: z.string().min(1, "O nome é obrigatório").optional(),
    email: z.string().email().optional(),
    imageUrl: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualização",
  });

const updateUserRoleSchema = z.object({
  role: z.nativeEnum(UserRole),
});

const updateUserPasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "A senha atual deve conter no mínimo 6 caracteres"),
  newPassword: z
    .string()
    .min(6, "A nova senha deve conter no mínimo 6 caracteres"),
});

// Extraindo os tipos dos schemas para substituir as interfaces
type ParamsWithId = z.infer<typeof paramsWithIdSchema>;
type CreateUserBody = z.infer<typeof createUserBodySchema>;
type UpdateUserBody = z.infer<typeof updateUserSchema>;
type UpdatePasswordBody = z.infer<typeof updateUserPasswordSchema>;
type UpdateUserRoleBody = z.infer<typeof updateUserRoleSchema>;

export {
  paramsWithIdSchema,
  createUserBodySchema,
  updateUserSchema,
  updateUserPasswordSchema,
  updateUserRoleSchema,
  ParamsWithId,
  CreateUserBody,
  UpdateUserBody,
  UpdatePasswordBody,
  UpdateUserRoleBody,
};

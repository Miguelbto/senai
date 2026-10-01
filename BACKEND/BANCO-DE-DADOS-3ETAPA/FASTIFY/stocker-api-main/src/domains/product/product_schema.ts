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

const invalidQuantitySchema = z.object({
  quantity: z
    .number()
    .min(1, { message: "A quantidade deve ser maior que zero" }),
});

const categoryParamsSchema = z.object({
  category: z.string().min(1, "A categoria é obrigatória").toLowerCase(),
});

const createProductBodySchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  price: z.number().positive("O preço deve ser um número positivo"),
  minStock: z
    .number()
    .int()
    .min(1, "O estoque mínimo deve ser maior que zero")
    .nonnegative("O estoque não deve ter um valor negativo")
    .optional(),
  stock: z
    .number()
    .int()
    .nonnegative("O estoque deve ser um número inteiro não negativo"),
  category: z
    .string()
    .transform((val) => (val.trim() === "" ? "Sem Categoria" : val))
    .optional()
    .default("Sem Categoria"),
  imageUrl: z.string().optional().default(""),
});

const updateProductBodySchema = z
  .object({
    name: z.string().min(1, "O nome é obrigatório").optional(),
    description: z.string().min(1, "A descrição é obrigatória").optional(),
    price: z
      .number()
      .positive("O preço deve ser um número positivo")
      .optional(),
    minStock: z
      .number()
      .int()
      .min(1, "O estoque mínimo deve ser maior que zero")
      .nonnegative("O estoque não deve ter um valor negativo")
      .optional(),
    category: z.string().min(1, "A categoria é obrigatória").optional(),
    imageUrl: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser fornecido para atualização",
  });

type InvalidQuantity = z.infer<typeof invalidQuantitySchema>;
type ParamsWithId = z.infer<typeof paramsWithIdSchema>;
type CategoryParams = z.infer<typeof categoryParamsSchema>;
type CreateProductBody = z.infer<typeof createProductBodySchema>;
type UpdateProductBody = z.infer<typeof updateProductBodySchema>;

export {
  paramsWithIdSchema,
  categoryParamsSchema,
  createProductBodySchema,
  updateProductBodySchema,
  invalidQuantitySchema,
  type InvalidQuantity,
  type ParamsWithId,
  type CategoryParams,
  type CreateProductBody,
  type UpdateProductBody,
};

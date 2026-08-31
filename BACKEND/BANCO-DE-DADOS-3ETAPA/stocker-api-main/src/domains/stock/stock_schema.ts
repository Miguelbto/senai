import z from "zod";

const stockQuantitySchema = z.object({
  quantity: z.number().int().min(1, "A quantidade deve ser maior que zero"),
  reason: z.string().optional(),
});

const stockAdjustmentSchema = z.object({
  quantity: z
    .number()
    .int()
    .min(0, "A quantidade deve ser maior ou igual a zero"),
  reason: z.string().optional(),
});

const stockProductIdParamsSchema = z.object({
  productId: z.string().transform((value) => {
    const parsedId = parseInt(value, 10);
    if (isNaN(parsedId)) throw new Error("Id do produto inválido");
    return parsedId;
  }),
});

const stockMovementFiltersSchema = z.object({
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
  type: z.enum(["IN", "OUT", "INITIAL", "ADJUSTMENT"]).optional(),
});

type StockQuantityBody = z.infer<typeof stockQuantitySchema>;
type StockAdjustmentBody = z.infer<typeof stockAdjustmentSchema>;
type StockProductIdParams = z.infer<typeof stockProductIdParamsSchema>;
type StockMovementFilters = z.infer<typeof stockMovementFiltersSchema>;

export {
  stockQuantitySchema,
  stockAdjustmentSchema,
  stockProductIdParamsSchema,
  stockMovementFiltersSchema,
  type StockQuantityBody,
  type StockAdjustmentBody,
  type StockProductIdParams,
  type StockMovementFilters,
};

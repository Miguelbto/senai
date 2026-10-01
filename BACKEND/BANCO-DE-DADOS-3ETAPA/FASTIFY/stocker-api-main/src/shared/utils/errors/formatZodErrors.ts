import { ZodError } from "zod";

export function formatError(result: { success: false; error: ZodError }) {
  return result.error.format();
}

import { z, ZodError } from 'zod'

export function formatError(result: { success: false; error: ZodError }) {
  return z.treeifyError(result.error)
}
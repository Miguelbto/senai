import { randomUUID } from 'node:crypto'
import type { IdGenerator } from '@shared/application/id-generator'

/* Adaptador de produção: UUID v4, igual ao `crypto.randomUUID()` do legado */

export class UuidIdGenerator implements IdGenerator {
    next(): string {
        return randomUUID()
    }
}
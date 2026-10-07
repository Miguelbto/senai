import type { Clock } from '../application/clock'

// Adaptador de pprodução: devolve a hora real do sistema
export class SystemClock implements Clock {
    now(): Date {
        return new Date()
    }
}
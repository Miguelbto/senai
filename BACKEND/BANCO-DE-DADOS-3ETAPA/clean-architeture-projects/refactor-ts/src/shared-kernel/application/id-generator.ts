/**
 * PORTA: "me dê um identificador novo".
 *
 * No legado: `crypto.randomUUID()` direto na rota. Com esta porta, os testes
 * podem usar ids previsíveis ('id-1', 'id-2'...) em vez de UUIDs aleatórios.
 */

export interface IdGenerator {
    next(): string
}
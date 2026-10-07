/**
 * PORTA: "que horas são agora?"
 *
 * No legado há `new Date().toISOString()` espalhado em toda rota. Isso torna
 * impossível testar "o pedido foi pago às 10:00", porque o relógio real nunca
 * para. Com esta porta, o caso de uso pede a hora ao Clock:
 *   - em produção: SystemClock devolve a hora real;
 *   - em testes: FixedClock devolve a hora que o teste quiser.
 *
 * Esta é uma PORTA: um contrato (interface) definido do lado de quem USA
 * (a camada de Aplicação). Quem IMPLEMENTA fica na Infraestrutura.
 */
export interface Clock {
    now(): Date
}
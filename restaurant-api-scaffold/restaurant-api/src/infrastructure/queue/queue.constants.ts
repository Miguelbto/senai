/**
 * Nomes de fila centralizados. Cada bounded context que precisar de uma
 * fila nova adiciona sua constante aqui — evita strings mágicas
 * duplicadas entre o módulo que agenda o job (ex.: Reservation) e o
 * módulo que processa (o Processor correspondente).
 */
export const QUEUE_NAMES = {
  RESERVATION_NO_SHOW: 'reservation-no-show',
  // Próximas filas entram aqui conforme as fases avançam, ex.:
  // CASH_CLOSING_REPORT: 'cash-closing-report',
} as const;

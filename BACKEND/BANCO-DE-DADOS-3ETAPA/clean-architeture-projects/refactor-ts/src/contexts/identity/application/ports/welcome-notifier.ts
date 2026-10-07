/**
 * PORTA: "avisar o usuário que ele foi cadastrado".
 *
 * Substitui o `console.log('[EMAIL FAKE] ...')` do legado. Hoje o adaptador
 * continua sendo um console.log; amanhã pode ser SendGrid, SES ou uma fila, e
 * nenhum caso de uso muda.
 *
 * O nome do método descreve a INTENÇÃO de negócio ("usuário registrado"), e não a
 * técnica ("sendEmail"). Assim o adaptador decide como avisar (e-mail, SMS...).
 */

export interface WelcomeNotifier {
    userRegistered(data: { name: string, email: string }): Promise<void>
}
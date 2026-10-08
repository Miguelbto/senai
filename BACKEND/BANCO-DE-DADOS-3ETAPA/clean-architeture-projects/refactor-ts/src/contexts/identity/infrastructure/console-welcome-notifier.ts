import type { WelcomeNotifier } from '../application/ports/welcome-notifier'

/**
 * ADAPTADOR de notificação: continua sendo um console.log, IGUAL ao legado
 * (mesmo texto, para os testes de caracterização).
 *
 * Mas agora é um adaptador legítimo: amanhã você cria `SendgridWelcomeNotifier`,
 * troca UMA linha no composition root, e nenhum caso de uso percebe.
 */

export class ConsoleWelcomeNotifier implements WelcomeNotifier {
    async userRegistered(data: { name: string; email: string }): Promise<void> {
        console.log('[EMAIL FAKE] Bem vindo, ' + data.name + '! Enviado para ' + data.email)
    }
}
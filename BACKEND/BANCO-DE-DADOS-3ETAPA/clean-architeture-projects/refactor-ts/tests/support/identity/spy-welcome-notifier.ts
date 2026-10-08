import type { WelcomeNotifier } from '../../../src/contexts/identity/application/ports/welcome-notifier'

/** "Espião": não envia nada, só ANOTA o que lhe pediram, para o teste conferir. */
export class SpyWelcomeNotifier implements WelcomeNotifier {
    readonly sent: { name: string; email: string }[] = []

    async userRegistered(data: { name: string; email: string }): Promise<void> {
        this.sent.push(data)
    }
}

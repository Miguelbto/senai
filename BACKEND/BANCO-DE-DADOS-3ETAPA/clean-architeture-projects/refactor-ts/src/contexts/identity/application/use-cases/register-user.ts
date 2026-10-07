import type { Clock } from '../../../../shared-kernel/application/clock'
import type { IdGenerator } from '../../../../shared-kernel/application/id-generator'
import { Email } from '../../domain/email'
import { EmailAlreadyRegisteredError } from '../../domain/errors'
import { PlainPassword } from '../../domain/plain-password'
import { User } from '../../domain/user'
import { UserName } from '../../domain/user-name'
import type { RegisterUserInput, RegisterUserOutput } from '../dto/register-user.dto'
import type { PasswordHasher } from '../ports/password-hasher'
import type { UserRepository } from '../ports/user-repository'
import type { WelcomeNotifier } from '../ports/welcome-notifier'

/**
 * ============================================================
 *  Caso de uso: Cadastrar usuário
 * ============================================================
 * Um caso de uso ORQUESTRA: pede coisas às portas e ao domínio, na ordem certa.
 * Ele NÃO decide regra de negócio (isso é dos Value Objects/entidade) e NÃO sabe
 * o que é SQL, Fastify ou sha256.
 *
 * Roteiro mental do guia:
 *   validar entrada → carregar dados → chamar domínio → salvar → notificar → devolver
 *
 * INJEÇÃO DE DEPENDÊNCIA: tudo que o caso de uso precisa vem pelo CONSTRUTOR, como
 * INTERFACE. Em produção chegam os adaptadores reais; em teste, dublês em memória.
 */

export class RegisterUser {
    constructor(
        private readonly users: UserRepository,
        private readonly hasher: PasswordHasher,
        private readonly notifier: WelcomeNotifier,
        private readonly ids: IdGenerator,
        private readonly clock: Clock,
    ) {}

    async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
        // 1. VALIDAR. A ORDEM importa: é a ordem do legado (nome → e-mail → senha).
        //    Se tudo estiver inválido, quem aparece é 'nome invalido', como antes.
        //    Cada `create` lança um DomainError se a regra for violada.
        const name = UserName.create(input.name)
        const email = Email.create(input.email)
        const password = PlainPassword.create(input.password)

        // 2. REGRA QUE PRECISA DO MUNDO EXTERNO: e-mail único. Por isso é do caso de
        //    uso (precisa do repositório) e não de um Value Object.
        if (await this.users.existsByEmail(email)) {
            throw new EmailAlreadyRegisteredError()
        }

        // 3. CHAMAR O DOMÍNIO. O hash é gerado pela infraestrutura (via porta).
        const passwordHash = await this.hasher.hash(password)
        const user = User.register({
            id: this.ids.next(),
            name,
            email,
            passwordHash,
            isVip: input.isVip,
            now: this.clock.now()
        })

        // 4. SALVAR
        await this.users.save(user)

        // 5. NOTIFICAR (depois de gravar: se a gravação falhar, ninguém é avisado de nada).
        //    QUIRK PRESERVADO: o legado loga o e-mail como foi DIGITADO ('Miguel@X.com'),
        //    e não o normalizado. O teste de caracterização cobra isso; por isso passamos
        //    `input.email` e não `email.value`. Decisão para o DECISOES.md.
        await this.notifier.userRegistered({ name: input.name, email: input.email })

        // 6. DEVOLVER um DTO (nunca a entidade).
        return {
            id: user.id,
            name: user.name.value,
            email: user.email.value,
            isVip: user.isVip,
        }

    }
}
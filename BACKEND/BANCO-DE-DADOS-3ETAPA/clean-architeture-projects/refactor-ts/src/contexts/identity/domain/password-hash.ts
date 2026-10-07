/**
 * Value Object: senha JÁ PROTEGIDA (resultado do hash).
 *
 * POR QUE DOIS TIPOS (PlainPassword × PasswordHash) EM VEZ DE `string`?
 *   No legado, `password` e `hash` são ambos `string`: nada impede de gravar a
 *   senha em texto puro no banco por engano. Com tipos separados, o compilador
 *   BARRA esse erro: a entidade User exige um PasswordHash, e um PlainPassword
 *   simplesmente não encaixa (veja o teste com @ts-expect-error).
 *
 * Este VO NÃO sabe qual algoritmo gerou o hash (sha256, scrypt...). Isso é com a
 * infraestrutura. Aqui ele é só um "valor opaco e protegido".
 */

export class PasswordHash {
    private constructor(readonly value: string) {}

    /**
   * `fromHashed` = "este texto JÁ é um hash". Quem chama assume o compromisso:
   * o hasher (ao proteger uma senha) ou o mapper (ao ler do banco).
   */

    static fromHashed(value: string): PasswordHash {
        if (!value) {
            // Hash vazio NÃO é erro do usuário: é bug ou dado corrompido.
            // Por isso lançamos um Error comum (→ HTTP 500) e não um DomainError (→ 400).
            throw new Error('PasswordHash nao pode ser vazio')
        }

        return new PasswordHash(value)
    }

    toString(): string {
        return '[HASH]'
    }
}
import DataBase from 'better-sqlite3'
import type { UnitOfWork } from '../application/unit-of-work'

/**
 * Adaptador do Unit of Work para SQLite (better-sqlite3).
 *
 * POR QUE NÃO USAR `db.transaction(fn)`?
 *   O `db.transaction` do better-sqlite3 só aceita função SÍNCRONA, e os
 *   nossos casos de uso serão `async`. Então controlamos a transação "na mão":
 *
 *       BEGIN  →  executa o trabalho  →  COMMIT   (deu certo)
 *                                     →  ROLLBACK (deu erro)
 *
 * ⚠️ LIMITAÇÃO CONHECIDA (anote no DECISOES.md):
 *   Entre o BEGIN e o COMMIT existe `await work()`. Se dentro dele houver I/O
 *   REAL (rede, timer), o Node pode atender OUTRA requisição na mesma conexão
 *   e ela entraria sem querer na nossa transação. Enquanto todos os
 *   adaptadores forem síncronos por baixo (better-sqlite3 é), isso não ocorre.
 */

export class SqliteUnitOfWork implements UnitOfWork {
    constructor (private readonly db: DataBase.Database) {}

    async run<T>(work: () => Promise<T>): Promise<T> {
        // Já estamos dentro de uma transação? Então este bloco APENAS PARTICIPA dela.
        // (Ex.: um caso de uso chama outro, e os dois usam o uow.) Quem abriu a
        // transação é quem faz o COMMIT/ROLLBACK. Se o interno falhar, o erro
        // sobe até o externo, que desfaz tudo.
        if (this.db.inTransaction) {
            return work()
        }

        // IMMEDIATE = já reserva o direito de escrita (evita erro de "banco ocupado" no meio).
        this.db.exec('BEGIN IMMEDIATE')
        try {
            const result = await work()
            this.db.exec('COMMIT')
            return result
        } catch (error) {
            // Só desfaz se ainda houver transação aberta (proteção contra erro duplo)
            if (this.db.inTransaction) {
                this.db.exec('ROLLBACK')
            }

            throw error //relança o erro original, sem esconder o motivo da falha
        }
    }
}
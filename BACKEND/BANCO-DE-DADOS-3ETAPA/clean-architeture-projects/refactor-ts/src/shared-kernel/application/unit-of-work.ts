/**
 * PORTA: "estas operações acontecem TODAS ou NENHUMA" (atomicidade).
 *
 * No legado, criar pedido + baixar estoque usava `db.transaction(...)` do
 * SQLite. A camada de Aplicação não pode conhecer SQLite, então ela só diz
 * QUAL bloco precisa ser atômico:
 *
 *     await uow.run(async () => {
 *       await products.reserveStock(items)
 *       await orders.save(order)
 *     })
 *
 * Se algo dentro do bloco lançar erro, NADA do que foi gravado fica.
 * (Padrão conhecido como "Unit of Work".)
 */

export interface UnitOfWork {
    run<T>(work: () => Promise<T>): Promise<T>
}
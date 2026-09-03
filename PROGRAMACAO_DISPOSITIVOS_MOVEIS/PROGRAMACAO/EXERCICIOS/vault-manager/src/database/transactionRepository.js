import { getDbConnection } from "./init";

//CREATE: cadastra uma nova trasnsação
export async function addTransaction(descricao, valor, tipo, categoria, data) {
    const db = await getDbConnection()
    const result = await db.runAsync(`
        INSERT INTO transacoes (descricao, valor, tipo, categoria, data) VALUES(?, ?, ?, ?, ?)`, [descricao, valor, tipo, categoria, data])
        return result.lastInsertRowId
}

export async function getTransactions(tipoFiltro = 'Todos') {
    const db = await getDbConnection()

    if(tipoFiltro === 'Receitas' || tipoFiltro === 'receita') {
        return await db.getAllAsync(
            "SELECT * FROM transacoes WHERE tipo = 'receita' ORDER BY data DESC, id DESC;" 
        )
    }

    if(tipoFiltro === 'Despesas' || tipoFiltro === 'despesa'){
        return await db.getAllAsync(
            "SELECT * FROM transacoes WHERE tipo = 'despesa' ORDER BY data DESC, id DESC"
        )
    }

    return await db.getAllAsync(
        'SELECT * FROM transacoes ORDER BY data DESC, id DESC;'
    )

}



    //READ totais: calcula o saldo total, soma receitas e soma despesas
export async function getTotals() {
    const db = await getDbConnection()

    const resReceitas = await db.getFirstAsync(
        "SELECT SUM(valor) as total FROM transacoes WHERE tipo = 'receita';"
    )
    const resDespesas = await db.getFirstAsync(
    "SELECT SUM(valor) as total FROM transacoes WHERE tipo = 'despesa';"
  );

  const receitas = resReceitas?.total || 0
  const despesas = resDespesas?.total || 0
  const saldo = receitas - despesas

  return { saldo, receitas, despesas }
}

export async function updateTransaction(id, descricao, valor, tipo, categoria, data) {
    const db = await getDbConnection()
    await db.runAsync(
        'UPDATE transacoes SET descricao = ?, valor = ?, tipo = ?, categoria = ?, data = ? WHERE id = ?;',
    [descricao, valor, tipo, categoria, data, id]
    )
}

export async function deleteTransaction(id) {
    const db = await getDbConnection()
    await db.runAsync(
        "DELETE FROM transacoes WHERE id = ?", [id]
    )
}
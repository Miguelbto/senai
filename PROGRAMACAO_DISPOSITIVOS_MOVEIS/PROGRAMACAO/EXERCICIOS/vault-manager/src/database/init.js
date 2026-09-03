import * as SQLite from 'expo-sqlite'

let dbInstance = null

//Retorna a instância de conexão com o banco
export async function getDbConnection() {
    if(!dbInstance) {
        dbInstance = SQLite.openDatabaseAsync('financas.db')
    }
    return dbInstance
}

export async function initDatabase() {
    const db = await getDbConnection()
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS transacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      valor REAL NOT NULL,
      tipo TEXT NOT NULL,
      categoria TEXT NOT NULL,
      data TEXT NOT NULL
    );
    `)

    await seedDatabase(db)
}


async function seedDatabase(db) {
    const result = await db.getFirstAsync('SELECT COUNT(*) as total FROM transacoes')

    if (result.total === 0) {
        await db.runAsync(`INSERT INTO transacoes (descricao, valor, tipo, categoria, data) VALUES ('Salário Mensal', 4500.00, 'receita', 'Renda', '2026-08-01'),
      ('Supermercado', 150.00, 'despesa', 'Alimentação', '2026-08-25'),
      ('Gasolina', 80.00, 'despesa', 'Transporte', '2026-08-28');`)

        console.log('Banco de dados populada com sucesso!')
    }
}
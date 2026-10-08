import type Database from 'better-sqlite3'

/**
 * Cria a tabela `users`. É o MESMO esquema do legado (mesmos nomes de coluna),
 * porque o banco existente não pode mudar durante a refatoração.
 *
 * `IF NOT EXISTS` torna a função segura de chamar várias vezes: o server.ts
 * legado também cria esta tabela, e as duas convivem até a Fase 8.
 *
 * Cada contexto cuida do SEU esquema (só as tabelas dele). Esta é a fronteira de
 * dados que mencionamos no mapa de contextos.
 */

export function createidentitySchema(db: Database.Database): void {
    db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      is_vip INTEGER DEFAULT 0,
      created_at TEXT
    );
  `)
}
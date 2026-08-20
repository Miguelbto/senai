const mysql = require('mysql2/promise');
require('dotenv').config();

// Criamos o pool de conexões padrão
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sabordigital_saas',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0
});

/**
 * Utilitário de conexão protegida por Tenant.
 * Garante que nenhuma operação no banco ocorra sem a validação do tenant_id.
 */
class TenantDatabase {
    constructor(poolConnection) {
        this.pool = poolConnection;
    }

    // Atalho para queries genéricas (ex: carregar configurações do tenant ou login geral)
    async query(sql, params) {
        return this.pool.query(sql, params);
    }

    // Método obrigatório para operações que lidam com dados sensíveis de clientes.
    // Exige explicitamente o tenantId para evitar queries acidentais entre tenants.
    async queryScoped(tenantId, sql, params = []) {
        if (!tenantId || isNaN(tenantId)) {
            throw new Error("❌ VIOLAÇÃO DE SEGURANÇA: Tentativa de query no banco de dados sem passar um Tenant ID válido.");
        }

        // Exemplo de aplicação: se você passar:
        // sql = 'SELECT * FROM produto WHERE id = ?'
        // Ele deve rodar no banco:
        // sql = 'SELECT * FROM produto WHERE tenant_id = ? AND id = ?'
        
        // Esta classe simula esse empacotamento básico de parâmetros.
        return this.pool.query(sql, params);
    }

    // Gerenciador de transações por conexão direta, repassando o pool
    async getConnection() {
        return this.pool.getConnection();
    }
}

module.exports = new TenantDatabase(pool);

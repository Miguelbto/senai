const db = require('../../shared/database/tenant-db');

class ProductsRepository {
    
    // Lista os produtos de forma isolada, apenas do restaurante especificado
    async listarProdutos(tenantId) {
        const query = 'SELECT * FROM produto WHERE tenant_id = ?';
        const [rows] = await db.query(query, [tenantId]);
        return rows;
    }

    // Busca um produto específico, validando se ele realmente pertence ao restaurante logado
    async buscarProdutoPorId(tenantId, id) {
        const query = 'SELECT * FROM produto WHERE tenant_id = ? AND id = ?';
        const [rows] = await db.query(query, [tenantId, id]);
        return rows[0]; // undefined se não for do tenant ou não existir
    } 

    async cadastrarProduto(tenantId, dadosDoProduto) {
        // Forçamos a inserção do tenant_id vindo do controller/middleware
        const novoProduto = {
            ...dadosDoProduto,
            tenant_id: tenantId
        };

        const query = 'INSERT INTO produto SET ?';
        const [resultado] = await db.query(query, [novoProduto]);
        return resultado.insertId;
    }

    async atualizarProduto(tenantId, id, dadosDoProduto) {
        const campos = [];
        const valores = [];

        for (const [key, value] of Object.entries(dadosDoProduto)) {
            // Garantimos que o tenant_id nunca seja sobrescrito/alterado acidentalmente via update
            if (key !== 'tenant_id') {
                campos.push(`${key} = ?`);
                valores.push(value);
            }
        }

        if (campos.length === 0) return 0;

        // Adiciona as chaves de controle (tenant_id e id) ao final dos parâmetros
        valores.push(tenantId);
        valores.push(id);

        // A query de update é restrita ao tenant_id
        const query = `UPDATE produto SET ${campos.join(', ')} WHERE tenant_id = ? AND id = ?`;
        const [resultado] = await db.query(query, valores);
        
        return resultado.affectedRows;
    }

    async apagarProduto(tenantId, id) {
        const query = 'DELETE FROM produto WHERE tenant_id = ? AND id = ?';
        const [resultado] = await db.query(query, [tenantId, id]);
        return resultado.affectedRows > 0;
    }
}

module.exports = new ProductsRepository();

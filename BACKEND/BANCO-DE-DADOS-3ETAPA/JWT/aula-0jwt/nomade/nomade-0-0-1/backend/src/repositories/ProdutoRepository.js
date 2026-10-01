const pool = require('../config/database');

class ProdutoRepository {

    async findAtivos() {
        const [rows] = await pool.query(
            `SELECT *
             FROM produto
             WHERE ativo = 1 OR ativo = TRUE
             ORDER BY codigo_produto DESC`
        );
        return rows;
    }

    async findDesativados() {
        const [rows] = await pool.query(
            `SELECT *
             FROM produto
             WHERE ativo = 0 OR ativo = FALSE
             ORDER BY codigo_produto DESC`
        );
        return rows;
    }
    

    async findById(id) {
        const [rows] = await pool.query(
            `SELECT *
             FROM produto
             WHERE codigo_produto = ?`,
            [id]
        );

        return rows[0];
    }

    async create(produtoData) {

        const {
            nome_produto,
            descricao,
            fornecedor,
            quantidade,
            etiqueta,
            lote,
            data_entrada,
            data_validade,
            valor,
            peso,
            fk_funcionario_cargo_id,
            ativo
        } = produtoData;

        const [result] = await pool.query(
            `INSERT INTO produto
            (
                nome_produto,
                descricao,
                fornecedor,
                quantidade,
                etiqueta,
                lote,
                data_entrada,
                data_validade,
                valor,
                peso,
                fk_funcionario_cargo_id,
                ativo
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                nome_produto,
                descricao,
                fornecedor,
                quantidade,
                etiqueta,
                lote,
                data_entrada,
                data_validade,
                valor,
                peso,
                fk_funcionario_cargo_id,
                ativo
            ]
        );

        return result.insertId;
    }

    async update(id, produtoData) {

        const fields = [];
        const values = [];

        for (const [key, value] of Object.entries(produtoData)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }

        if (fields.length === 0) {
            return null;
        }

        values.push(id);

        const query = `
            UPDATE produto
            SET ${fields.join(', ')}
            WHERE codigo_produto = ?
        `;

        const [result] = await pool.query(query, values);

        return result.affectedRows;
    }

}

module.exports = new ProdutoRepository();

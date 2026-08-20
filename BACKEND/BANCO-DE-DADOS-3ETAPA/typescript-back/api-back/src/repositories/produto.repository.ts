import { pool } from "../config/database"
import { ResultSetHeader, RowDataPacket  } from "mysql2"

// Interface do que existe no banco 
export interface Produto {
    id: number, 
    nome: string,
    preco: number,
    estoque: number,
}

// Tipo pra criação: sem o "id" (autoIncrement) e sem campos que o banco preenche sozinho
export type ProdutoInput = Omit<Produto, "id">

//Tipo pra  atualização: todos os campos opcionais (patch parcial)
export type ProdutoUpdateInput = Partial<ProdutoInput>

class ProdutoRepository {

    async listarProdutos(): Promise<Produto[]> {
        const [listarProdutos] = await pool.query<RowDataPacket[]>(
            "SELECT * FROM produto"
        )

        return listarProdutos as Produto[]
    }

    async buscarProdutoPorId(id: number): Promise<Produto | undefined>  {
        const [mostrarProduto] = await pool.query<RowDataPacket[]>(
            "SELECT * FROM produto WHERE id = ?", [id]
        )
    }
}
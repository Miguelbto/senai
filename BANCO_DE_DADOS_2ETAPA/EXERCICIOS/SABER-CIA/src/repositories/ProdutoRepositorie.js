//const pool = require("../config/database.js")
//const ProdutoRepository = require('../repositories/ProdutoRepositorie.js') 

 const pool = require("../config/database.js") // Comentado para o teste

// Banco de dados simulado na memória do Node
const produtosSimulados = [
    {
        id: 1,
        nome: "Produto Teste Antigo",
        descricao: "Descrição antiga",
        preco: 10.00,
        categoria: "Testes",
        disponivel: true,
        imagem_url: "" // Começa sem imagem para testarmos o primeiro upload
    }
];

class ProdutoRepository {

    async listarProdutos () {
        return produtosSimulados;
    }

    async buscarProdutoPorId (id) {
        // Encontra o produto no nosso array simulado
        return produtosSimulados.find(p => p.id === Number(id));
    } 
    
    async cadastrarProduto (dadosDoProduto) {
        const novoId = produtosSimulados.length + 1;
        const produtoCompleto = { id: novoId, ...dadosDoProduto };
        produtosSimulados.push(produtoCompleto);
        
        console.log("=== BANCO SIMULADO (CADASTRO) ===", produtosSimulados);
        return novoId;
    }

    async atualizarProduto (id, dadosDoProduto){
        const index = produtosSimulados.findIndex(p => p.id === Number(id));
        if (index === -1) return 0;

        // Atualiza os dados simulados
        produtosSimulados[index] = { ...produtosSimulados[index], ...dadosDoProduto };
        
        console.log("=== BANCO SIMULADO (ATUALIZAÇÃO) ===", produtosSimulados);
        return 1; // 1 linha afetada
    }

    async apagarProduto (id) {
        const index = produtosSimulados.findIndex(p => p.id === Number(id));
        if (index !== -1) {
            produtosSimulados.splice(index, 1);
        }
        console.log("=== BANCO SIMULADO (DELEÇÃO) ===", produtosSimulados);
        return true;
    }
}

module.exports = new ProdutoRepository()

/*
class ProdutoRepository {

    async listarProdutos () {
        // AJUSTE: Adicionado [ ] para pegar apenas as linhas de registros
        const [listaProdutos] = await pool.query('SELECT * FROM produto')
        return listaProdutos
    }

    async buscarProdutoPorId (id) {
        // AJUSTE: Adicionado [ ] para extrair o resultado puro da query
        const [mostrarProduto] = await pool.query('SELECT * FROM produto WHERE id = ?', [id])
        return mostrarProduto[0] // Retorna o objeto do produto ou undefined
    } 
    
    async cadastrarProduto (dadosDoProduto) {
        const [resultadoCadastroDeProduto] = await pool.query('INSERT INTO produto SET ?', [dadosDoProduto])
        return resultadoCadastroDeProduto.insertId
    }

    async atualizarProduto (id, dadosDoProduto){
        const camposProduto = []
        const dadosProduto = []

        for (const [key, value] of Object.entries(dadosDoProduto)){
            camposProduto.push(`${key} = ?`)
            dadosProduto.push(value)
        }

        if(camposProduto.length === 0) return null 

        dadosProduto.push(id)

        const query = `UPDATE produto SET ${camposProduto.join(',')} WHERE id = ?`

        const [resultado] = await pool.query(query, dadosProduto)
        return resultado.affectedRows
    }

    async apagarProduto (id) {
        await pool.query('DELETE FROM produto WHERE id = ?', [id])
        return true
    }
}
    */

module.exports = new ProdutoRepository()



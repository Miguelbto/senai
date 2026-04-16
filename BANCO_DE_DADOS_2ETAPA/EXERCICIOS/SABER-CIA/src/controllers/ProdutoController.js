const filmeModel = require('./filmeModel')

async function obterProduto(req,res){
     try {
        const produto = await queryAsync('SELECT * FROM produto ')
        res.json({
            sucesso: true,
            dados: produto,
            total: produto.length,
        })
        
    } catch (erro) {
        console.error('Erro ao listar produtos:', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao listar produtos',
            erro: erro.mensage
        })
    }
}

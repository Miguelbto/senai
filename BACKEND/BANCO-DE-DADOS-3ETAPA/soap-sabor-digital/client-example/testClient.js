/**
 * Cliente de exemplo. Mostra como consumir uma API SOAP a partir do próprio
 * WSDL, usando a lib `soap` — bem diferente de um cliente REST, onde você
 * mesmo monta a URL e o corpo JSON.
 *
 * Em SOAP, o cliente lê o WSDL (soap.createClientAsync), e a lib gera
 * automaticamente um "objeto proxy" com um método por operação
 * (ex: client.ListarProdutosAsync(...)). Ela cuida de montar o envelope XML,
 * mandar o SOAPAction certo e desserializar a resposta de volta pra objeto JS.
 *
 * Rode o servidor primeiro (npm start) e depois:
 *   npm run client:exemplo
 */
const soap = require('soap');

const BASE_URL = process.env.SOAP_BASE_URL || 'http://localhost:3000';

async function testarProduto() {
    console.log('\n=== ProdutoService ===');
    const client = await soap.createClientAsync(`${BASE_URL}/produtoService?wsdl`);

    // 1. Listar produtos
    const [listaResp] = await client.ListarProdutosAsync({});
    console.log(`Produtos cadastrados: ${listaResp.total}`);

    // 2. Cadastrar um produto novo
    const [cadastroResp] = await client.CadastrarProdutoAsync({
        nome: 'Torta de Limão',
        descricao: 'Torta gelada de limão com merengue',
        preco: 18.5,
        categoria: 'Doce'
    });
    console.log('Produto cadastrado:', cadastroResp);

    // 3. Buscar o produto recém-criado
    const [buscaResp] = await client.BuscarProdutoPorIdAsync({ id: cadastroResp.id });
    console.log('Produto encontrado:', buscaResp.produto);

    return cadastroResp.id;
}

async function testarCardapio(produtoId) {
    console.log('\n=== CardapioService ===');
    const client = await soap.createClientAsync(`${BASE_URL}/cardapioService?wsdl`);

    const [resp] = await client.CadastrarCardapioAsync({
        nome: 'Cardápio de Sobremesas',
        descricao: 'Doces da casa',
        produtoIds: { id: [produtoId] }
    });
    console.log('Cardápio cadastrado:', resp);
}

async function testarPedido() {
    console.log('\n=== PedidoService ===');
    const client = await soap.createClientAsync(`${BASE_URL}/pedidoService?wsdl`);

    const [resp] = await client.CriarPedidoAsync({
        cliente: 'Cliente de Teste',
        itens: {
            item: [
                { produtoId: 1, quantidade: 1 }
            ]
        }
    });
    console.log('Pedido criado:', resp.pedido);
}

async function testarUsuario() {
    console.log('\n=== UsuarioService ===');
    const client = await soap.createClientAsync(`${BASE_URL}/usuarioService?wsdl`);

    try {
        const [loginResp] = await client.LoginAsync({
            email: 'joao@teste.com',
            senha: 'senha123'
        });
        console.log('Login OK, token:', loginResp.token.slice(0, 20) + '...');
    } catch (erro) {
        // Erros de negócio (ex: credenciais inválidas) chegam aqui como
        // SOAP Fault. O node-soap expõe isso em erro.root.Envelope.Body.Fault
        console.log('Falha no login (esperado se o usuário ainda não existe):', erro.message);
    }
}

async function main() {
    try {
        const produtoId = await testarProduto();
        await testarCardapio(produtoId);
        await testarPedido();
        await testarUsuario();
    } catch (erro) {
        console.error('Erro ao chamar o serviço SOAP:', erro.message);
    }
}

main();

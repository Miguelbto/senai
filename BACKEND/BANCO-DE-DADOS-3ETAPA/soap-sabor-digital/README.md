# Sabor Digital — versão SOAP (para aprender)

Este projeto é a API REST original do **Sabor Digital** (Express + MySQL)
reestruturada para **SOAP**, mantendo a mesma lógica de negócio e o mesmo
banco de dados. A ideia é você comparar lado a lado como a mesma regra de
negócio muda de "roupa" quando o protocolo muda.

## O que mudou e o que não mudou

| Camada | REST original | Versão SOAP |
|---|---|---|
| Banco de dados | MySQL (`database.sql`) | **Igual**, sem nenhuma alteração |
| `repositories/` | Query SQL pura | **Igual**, reaproveitado sem alteração |
| `services/` | Lança `{status, mensagem}` | Lança `Error` simples (o SOAP converte pra Fault) |
| Contrato da API | Rotas Express (`GET /produtos`, `POST /pedidos`...) | **WSDL** (`src/wsdl/*.wsdl`) |
| Formato de dados | JSON | XML (envelope SOAP) |
| "Controller" | `Controller` chamando `res.json()` | *binding* (`src/soap/*.js`) que devolve um objeto JS, o `node-soap` serializa pra XML |
| Erros | `res.status(400).json({erro})` | `<soap:Fault>` gerado automaticamente pelo `node-soap` quando o `service` lança um `Error` |
| Upload de imagem (multer) | Suportado (multipart/form-data) | **Removido** — SOAP não tem um jeito nativo de anexo binário simples; o campo `imagem` agora é só uma `string` (uma URL, por exemplo) |

## Por que SOAP é diferente do REST (resumo rápido)

- **REST** não tem um contrato formal obrigatório: você "adivinha" os campos
  lendo a documentação ou o código.
- **SOAP** exige um **WSDL** (Web Services Description Language) — um XML
  que descreve, de forma rígida e tipada, quais operações existem, quais
  parâmetros cada uma recebe e o que ela devolve. É um contrato que o
  cliente pode ler e usar para gerar código automaticamente.
- Toda mensagem SOAP (indo ou vindo) é um **envelope XML** com uma estrutura
  fixa: `<soap:Envelope><soap:Body>...conteúdo...</soap:Body></soap:Envelope>`.
- Erros não usam status HTTP (200, 404, 500) para indicar o que aconteceu —
  eles usam um `<soap:Fault>` dentro do próprio corpo XML, mesmo que o HTTP
  retorne 500.
- Enquanto o REST usa vários **verbos HTTP** (GET, POST, PUT, DELETE) sobre
  vários **recursos** (`/produtos/1`), o SOAP normalmente usa só **POST**
  para tudo, e quem diferencia a ação é o **nome da operação** dentro do XML
  (`ListarProdutos`, `CadastrarProduto`, etc.) e o cabeçalho `SOAPAction`.

## Estrutura do projeto

```
soap-sabor-digital/
├── database.sql                  # mesmo schema/seed do projeto original
├── package.json
├── .env.example
├── src/
│   ├── server.js                 # sobe o express + monta os 4 serviços SOAP
│   ├── config/database.js        # pool MySQL (igual ao original)
│   ├── repositories/              # acesso a dados (igual ao original)
│   ├── services/                  # regra de negócio (adaptada pra SOAP)
│   ├── wsdl/                       # contratos: o "coração" do SOAP
│   │   ├── produto.wsdl
│   │   ├── cardapio.wsdl
│   │   ├── pedido.wsdl
│   │   └── usuario.wsdl
│   └── soap/                       # implementação de cada operação do WSDL
│       ├── produtoService.js
│       ├── cardapioService.js
│       ├── pedidoService.js
│       └── usuarioService.js
└── client-example/
    └── testClient.js             # cliente SOAP de exemplo (usa a lib `soap`)
```

Cada domínio (Produto, Cardápio, Pedido, Usuário) virou um **serviço SOAP
independente**, com seu próprio WSDL e seu próprio endpoint HTTP — assim
como no REST original cada um tinha suas próprias rotas.

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Copie `.env.example` para `.env` e ajuste as credenciais do MySQL:
   ```bash
   cp .env.example .env
   ```

3. Crie o banco (se ainda não tiver):
   ```bash
   mysql -u root -p < database.sql
   ```

4. Suba o servidor:
   ```bash
   npm start
   ```

   Você verá os 4 WSDLs disponíveis, por exemplo:
   ```
   http://localhost:3000/produtoService?wsdl
   http://localhost:3000/cardapioService?wsdl
   http://localhost:3000/pedidoService?wsdl
   http://localhost:3000/usuarioService?wsdl
   ```

   Abrir essas URLs no navegador mostra o contrato (WSDL) de cada serviço —
   é o "Swagger" do mundo SOAP, só que sempre nesse formato.

5. Rode o cliente de exemplo (em outro terminal, com o servidor no ar):
   ```bash
   npm run client:exemplo
   ```

## Testando manualmente com `curl`

SOAP quase sempre usa `POST` com `Content-Type: text/xml`, e o corpo é um
envelope XML. Exemplo pedindo a lista de produtos:

```bash
curl -X POST http://localhost:3000/produtoService \
  -H "Content-Type: text/xml; charset=utf-8" \
  -H "SOAPAction: http://sabordigital.com/produto/ListarProdutos" \
  -d '<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://sabordigital.com/produto">
  <soap:Body>
    <tns:ListarProdutosRequest/>
  </soap:Body>
</soap:Envelope>'
```

Cadastrando um pedido com dois itens:

```bash
curl -X POST http://localhost:3000/pedidoService \
  -H "Content-Type: text/xml; charset=utf-8" \
  -d '<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://sabordigital.com/pedido">
  <soap:Body>
    <tns:CriarPedidoRequest>
      <cliente>Maria Silva</cliente>
      <itens>
        <item><produtoId>1</produtoId><quantidade>2</quantidade></item>
        <item><produtoId>4</produtoId><quantidade>1</quantidade></item>
      </itens>
    </tns:CriarPedidoRequest>
  </soap:Body>
</soap:Envelope>'
```

Se você mandar uma senha errada no `Login`, a resposta não vem com status
`401` e um JSON de erro — vem um XML assim:

```xml
<soap:Fault>
  <soap:Code>
    <soap:Value>SOAP-ENV:Server</soap:Value>
    <soap:Subcode><soap:Value>InternalServerError</soap:Value></soap:Subcode>
  </soap:Code>
  <soap:Reason>
    <soap:Text>Error: Credenciais inválidas</soap:Text>
  </soap:Reason>
</soap:Fault>
```

## Operações disponíveis por serviço

**ProdutoService** (`/produtoService`): `ListarProdutos`, `BuscarProdutoPorId`,
`CadastrarProduto`, `AtualizarProduto`, `DeletarProduto`

**CardapioService** (`/cardapioService`): `ListarCardapios`,
`BuscarCardapioPorId`, `CadastrarCardapio`, `DeletarCardapio`

**PedidoService** (`/pedidoService`): `CriarPedido`, `ListarPedidos`,
`ObterPedidoPorId`, `AtualizarStatusPedido`, `ExcluirPedido`

**UsuarioService** (`/usuarioService`): `RegistrarUsuario`, `Login`

## Próximos passos para você estudar

- Abra um dos arquivos em `src/wsdl/` e tente identificar as 4 partes de
  todo WSDL: `types` (os dados), `message` (input/output de cada operação),
  `portType` (a "interface", só com nomes de operação) e `binding` +
  `service` (como isso tudo vira HTTP de verdade).
- Compare `src/soap/produtoService.js` com o `ProdutoController.js` do
  projeto REST original — a lógica de negócio é praticamente a mesma, só a
  "casca" que troca.
- Tente adicionar uma operação nova (ex: `ListarProdutosPorCategoria`): você
  vai precisar (1) descrever a operação no WSDL, (2) implementar a função
  correspondente no binding, e (3) reaproveitar ou criar o método no
  repository/service.

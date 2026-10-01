# 📘 Tutorial Definitivo: Implementando Swagger / OpenAPI

Este tutorial tem como objetivo guiar você passo a passo na implementação de uma documentação interativa para a sua API utilizando o padrão **OpenAPI** através da ferramenta **Swagger**. 

Mesmo que você tenha perdido a explicação ao vivo, seguindo estes passos você entenderá não apenas *como* fazer, mas *por que* cada peça se encaixa nesse quebra-cabeça.

---

## 🧐 1. O que é Swagger e OpenAPI?

Antes, usávamos um arquivo `.md` (Markdown) para escrever manualmente quais eram as rotas da nossa API (ex: `/produtos`). Isso dava muito trabalho e ficava desatualizado rápido.

O **OpenAPI** é um padrão global (um formato de regras) de como descrever APIs de forma que humanos e máquinas entendam.
O **Swagger** é um conjunto de ferramentas que pega essas regras e transforma numa interface gráfica bonita no navegador, onde você pode não só ler sobre as rotas, mas **testá-las** apertando botões.

---

## 📦 2. As Bibliotecas Utilizadas

Para automatizar o nosso trabalho no Node.js com Express, não vamos escrever o contrato OpenAPI na mão. Vamos usar duas bibliotecas mágicas:

1. **`swagger-autogen`**: Ele funciona como um "robozinho" que lê os seus arquivos de rotas (`routes.js`), descobre todos os seus endpoints (`GET`, `POST`), e gera automaticamente o arquivo de regras no padrão OpenAPI (o arquivo `swagger_output.json`).
2. **`swagger-ui-express`**: É a biblioteca que pega esse arquivo gerado `.json` e desenha a página web bonita do Swagger dentro do nosso próprio servidor Express.

---

## 🚀 3. Passo a Passo da Implementação

### Passo 1: Instalação
No terminal do seu projeto, certifique-se de que o servidor está parado e rode o seguinte comando:
```bash
npm install swagger-ui-express swagger-autogen
```

### Passo 2: O Robô Gerador (`src/swagger.js`)
Precisamos criar um arquivo de configuração para ensinar ao `swagger-autogen` como ele deve agir.

Crie um arquivo chamado **`swagger.js`** dentro da pasta **`src/`** e adicione o seguinte código:

```javascript
// 1. Importamos a biblioteca e já a executamos chamando ()
const swaggerAutogen = require('swagger-autogen')();

// 2. Definimos as informações básicas da nossa API
const doc = {
    info: {
        title: 'Sabor Digital API',
        description: 'Documentação automática da API Sabor Digital utilizando Swagger Autogen',
        version: '1.0.0'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    
    // 3. (Muito Importante) Configuramos que nossa API usa Token JWT
    // Isso fará o botão de "Cadeado" (Authorize) aparecer na tela!
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    }
};

// 4. Onde o arquivo JSON mágico será salvo?
const outputFile = './swagger_output.json';

// 5. Qual arquivo o robô deve ler para encontrar nossas rotas?
// Ele vai ler o index.js de rotas, que por sua vez importa todas as outras!
const endpointsFiles = ['./src/routes/index.js']; 

// 6. Finalmente, mandamos o robô trabalhar!
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log("Documentação do Swagger gerada com sucesso!");
});
```

### Passo 3: Gerando o Contrato
Sempre que você criar uma rota nova ou rodar a aplicação pela primeira vez, você precisa gerar/atualizar o arquivo JSON. 
No terminal, rode:
```bash
node src/swagger.js
```
*Se der certo, você verá a mensagem de sucesso e um arquivo gigante chamado `swagger_output.json` vai aparecer na raiz do seu projeto.*

### Passo 4: Ligando a Tela Visual (`src/app.js`)
A documentação já existe em formato JSON, mas os humanos gostam de telas bonitas. Vamos pedir para o Express criar uma página web para nós.

Abra o arquivo **`src/app.js`** e faça 3 alterações simples:

1. Importe o visualizador do swagger.
2. Importe o JSON que você gerou no passo 3.
3. Crie a rota `/api-docs` para mostrar a tela.

Veja como o `app.js` deve ficar:

```javascript
const express = require('express');
const cors = require('cors');
const path = require('path');

// [1] e [2] Importações do Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

const app = express();
const routes = require('./routes'); 

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

// Rota normal da API
app.use('/', routes);

// [3] Criando a rota mágica da Documentação
// Sempre que alguém acessar localhost:3000/api-docs, o swagger vai desenhar a tela baseada no seu JSON
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
```

---

## 🎯 4. Como Testar e Usar?

1. Rode o seu servidor normalmente com `node --watch src/server.js`.
2. Abra o navegador de internet e acesse: **`http://localhost:3000/api-docs`**.
3. **Magia!** Você verá todas as suas rotas organizadas por categoria (Produtos, Auth, Pedidos).

### E como eu testo rotas protegidas pelo Token JWT?
Lembra que configuramos o JWT no `swagger.js`?
1. Na tela do Swagger, abra a rota `POST /auth/login` e preencha o email e senha do admin.
2. Clique no botão azul **Execute**.
3. Na caixa preta de reposta, copie aquele código gigante (o Token JWT).
4. Suba até o topo da tela do Swagger e clique no botão verde escuro **Authorize** (que tem um desenho de cadeado).
5. Cole o token ali dentro e clique em "Authorize".
6. Pronto! Agora todas as requisições que você fizer clicando em "Execute" pelo Swagger já enviarão o token escondido no cabeçalho automaticamente!

---
*Parabéns! Sua API agora tem um nível de documentação profissional padrão de mercado!*

# Apostila Completa: O Guia Definitivo do Deploy

Bem-vindo ao mundo da produção! Até agora, sua API viveu apenas no seu computador (o famoso `localhost`). O **Deploy** é o processo mágico (e às vezes assustador) de pegar o seu código e publicá-lo em um servidor na internet, permitindo que qualquer pessoa no planeta acesse a sua aplicação.

Nesta apostila, vamos desmistificar a infraestrutura, entender os tipos de hospedagem, e realizar o deploy prático de uma API Node.js utilizando o **Render**.

---

## 1. O Que é Deploy?
Deploy (Implantação) não é apenas copiar arquivos. É o processo completo de:
1. **Build**: Preparar o código (instalar dependências, compilar se necessário).
2. **Configuração**: Injetar as variáveis de ambiente (senhas, portas, chaves).
3. **Release**: Colocar o software em execução em um ambiente estável.
4. **Monitoramento**: Garantir que ele continue rodando e gravar os logs de erro.

O lema do desenvolvedor Júnior é *"Na minha máquina funciona"*. O desenvolvedor Sênior garante que *"Funcione em qualquer lugar"*.

---

## 2. Tipos de Nuvem e Hospedagem
Quando falamos de "subir para a nuvem", existem várias camadas de abstração. É importante conhecer a sopa de letrinhas:

### On-Premise (Servidor Próprio)
Você compra a máquina física, liga na tomada da sua empresa, instala o Linux, configura a rede, a segurança e roda o código. 
- **Vantagem**: Controle total e segurança física dos dados.
- **Desvantagem**: Altíssimo custo de manutenção e risco de falhas de hardware.

### IaaS (Infrastructure as a Service)
*Exemplos: AWS EC2, Google Compute Engine, DigitalOcean Droplets.*
Você aluga um "computador virtual" vazio na nuvem. Você precisa acessar via terminal (SSH), instalar o Node.js, instalar o banco de dados e gerenciar a segurança.
- **Vantagem**: Muita flexibilidade e controle.
- **Desvantagem**: Requer fortes conhecimentos em DevOps e Linux.

### PaaS (Platform as a Service)
*Exemplos: **Render**, Heroku, Railway.*
Você apenas entrega o seu código (via GitHub) para a plataforma. A plataforma identifica que é Node.js, instala tudo sozinha e devolve um link pronto.
- **Vantagem**: Muito rápido, fácil e focado no código. Ideal para APIs e startups.
- **Desvantagem**: Menos controle sobre o sistema operacional subjacente.

### Serverless (Sem Servidor)
*Exemplos: AWS Lambda, Vercel Functions, Cloudflare Workers.*
Você hospeda pequenas funções de código isoladas que só rodam (e só cobram) quando recebem uma requisição.

---

## 3. Os 6 Pilares do Deploy Profissional

Antes de enviar uma API para a produção, precisamos tirar a roupa de "projeto de estudante" e vestir a armadura de "Engenharia de Software". Um deploy de nível avançado (Pleno/Sênior) exige domínio sobre 6 pilares fundamentais. Abaixo, vamos mergulhar em cada um deles com exemplos práticos.

### Pilar 1: Preparação e Empacotamento (Build & Secrets)
Antes do código sair da sua máquina, ele precisa estar encapsulado de uma forma que seja **100% previsível** no servidor.
*   **Gestão de Dependências:** Nunca confie apenas no `package.json`. O arquivo `package-lock.json` é o que garante que a versão exata da biblioteca instalada na sua máquina seja a mesma instalada na nuvem (evitando que uma atualização inesperada quebre seu app).
*   **Gestão de Segredos (Secrets):** Códigos com chaves de API, senhas de banco de dados ou a chave do `JWT_SECRET` NUNCA devem ir para o GitHub. Eles ficam isolados no arquivo `.env` (ignorado pelo git) e são configurados diretamente no painel do servidor de produção.
*   **Containerização:** No auge do profissionalismo, usamos **Docker**. O Docker cria uma "caixa" (container) contendo seu código, o Node.js na versão certa e o sistema operacional. Se essa caixa roda no seu computador, ela roda exatamente igual no computador da Google, da AWS ou da Microsoft.

### Pilar 2: Infraestrutura e Hospedagem
Onde seu código vai morar? A escolha do tipo de nuvem afeta o seu bolso e as suas dores de cabeça.
*   **IaaS (Infrastructure as a Service):** Você aluga a "máquina nua" (Ex: *AWS EC2, DigitalOcean*). Você acessa uma tela preta via SSH, instala o Linux, o Node.js, e cuida do Firewall. Exige muito conhecimento de Redes/DevOps.
*   **PaaS (Platform as a Service):** Você só manda o código. A plataforma (Ex: *Render, Heroku, Vercel*) cuida do resto automaticamente. Custa mais caro em larga escala, mas economiza milhares de horas de configuração.
*   **Serverless:** Pequenas "funções" de código que sobem em milissegundos apenas quando alguém acessa o site (Ex: *AWS Lambda*). Excelente para escalabilidade infinita com custo inicial zero.
*   **Orquestração:** Se o seu sistema for gigante, como a Netflix, você não tem apenas 1 container, você tem 500. Você usa o **Kubernetes** para ser o maestro dessa orquestra, subindo e matando containers conforme o número de usuários ativos aumenta ou diminui.

### Pilar 3: Banco de Dados em Produção (DBaaS)
O banco de dados SQLite salvo na pasta do projeto não serve para produção. Sempre que o servidor reiniciar, os arquivos locais podem ser apagados.
*   **DBaaS (Database as a Service):** Usamos bancos alugados na nuvem (Ex: *MongoDB Atlas, Supabase, Amazon RDS*). Eles garantem armazenamento em discos redundantes e backups noturnos.
*   **Migrations:** Se você adicionar uma nova tabela de `Vendas` no seu código hoje, como o banco de dados que já está rodando na nuvem vai saber disso? Nós usamos *Migrations* para que, assim que a API ligue no servidor, ela rode comandos automáticos para criar as tabelas necessárias.
*   **Seeders:** São scripts que injetam os dados básicos no banco "virgem". Exemplo: Criar automaticamente o usuário `admin@sistema.com` logo no primeiro deploy.

### Pilar 4: Rede, DNS e Segurança
Colocar o site no ar pelo IP (ex: `192.168.1.100`) não passa confiança.
*   **Domínio e DNS:** Você compra o nome `sabordigital.com.br` e o DNS atua como a agenda telefônica, direcionando quem digita esse nome para o IP do seu servidor.
*   **HTTPS (SSL/TLS):** O cadeado verde do navegador. Ele criptografa a comunicação. Sem isso, se o usuário mandar a senha no login, um hacker na mesma rede wi-fi pode interceptar o texto limpo.
*   **Load Balancer & Proxy Reverso:** Ferramentas como o **Nginx**. Ele fica na porta do servidor organizando a fila. Se chegarem 10.000 requisições de uma vez, ele distribui a carga entre 3 servidores diferentes.
*   **WAF (Web Application Firewall) & Rate Limiting:** Evita ataques de negação de serviço (DDoS) bloqueando IPs que fazem muitas requisições por segundo.

### Pilar 5: A Cultura CI / CD (Automação de Entregas)
Ninguém mais envia arquivos para a nuvem usando programas de FTP ou pendrives.
*   **CI (Integração Contínua):** Você configurou um teste que verifica se o login funciona. Ao dar o `git push`, o servidor do GitHub roda esse teste sozinho. Se falhar, o botão de merge fica vermelho e o erro é bloqueado antes de ir para o ar.
*   **CD (Entrega Contínua):** O teste passou? A automação pega esse código aprovado, avisa o servidor (Render), que faz o download, derruba a API velha e liga a API nova sozinho.
*   **Deploy Avançado:** Como atualizar o app do banco Itaú ao meio dia sem os usuários sentirem? Usa-se o **Blue/Green Deployment**: A empresa liga o sistema novo em um servidor "Verde" (invisível) e mantém os usuários no velho "Azul". Quando o Verde estiver 100% testado, eles apenas "viram a chave" do tráfego. Zero queda.

### Pilar 6: Observabilidade (O Pós-Deploy)
O sistema está rodando e você foi dormir. E se cair às 3 da manhã?
*   **Logs Centralizados:** Os `console.log` de erro não podem se perder. Eles devem ser enviados para plataformas como *Datadog* ou *Elasticsearch* para você conseguir pesquisar por erros ("Mostre todos os erros de carrinho vazio hoje").
*   **APM (Application Performance Monitoring):** Mostra gráficos dizendo: "A rota de buscar produtos está demorando 5 segundos" ou "Sua máquina atingiu 99% de memória RAM".
*   **Health Checks e Alertas:** Um robô "pinga" sua API a cada minuto na rota `/health`. Se a API não responder com Status 200 (OK), ele dispara um e-mail urgente ou uma notificação no celular da equipe de plantão (o temido *PagerDuty* da madrugada).

> **Aviso para a nossa Aula:** Fique tranquilo! Você não precisa dominar todos os 6 pilares hoje. Na nossa prática com o **Render**, a própria plataforma vai automatizar grande parte disso (Pilar 2, Pilar 4 e Pilar 5) para focarmos apenas no essencial.

---

## 4. A Cultura CI / CD (A Mágica da Automação)
Na infraestrutura moderna, ninguém envia arquivos manualmente para o servidor (via pendrive ou arrastando pastas). Nós utilizamos uma prática chamada **CI/CD** para automatizar esse fluxo de trabalho.

- **CI (Continuous Integration - Integração Contínua):** 
  É a fase de garantir que o código novo é saudável. Sempre que você envia o código para o GitHub, sistemas automatizados podem rodar para tentar "quebrar" seu projeto (rodar testes, verificar formatação). Se algo estiver errado, o "sinal vermelho" acende e o código não avança.

- **CD (Continuous Deployment / Delivery - Implantação Contínua):**
  Se o código passou pelo CI (sinal verde), o CD entra em ação. Ele pega o seu repositório atualizado do GitHub, conecta com o servidor de produção, derruba o serviço antigo e substitui pelo código novo sozinho, em poucos segundos.

> **Resumo Prático:** Codar -> `git commit` -> `git push` -> A mágica acontece -> Site atualizado!

---

## 5. O Nosso Escolhido: Render

O **Render** (render.com) se tornou a principal escolha moderna de PaaS gratuito após o fim do plano gratuito do Heroku. 

### Por que o Render?
- 🔗 Integração nativa com o GitHub. Você dá o `git push` e ele atualiza o servidor sozinho (Continuous Deployment).
- 🆓 Possui camada gratuita ("Free Tier") perfeita para estudos e portfólios.
- 🐘 Oferece Banco de Dados PostgreSQL gerenciado gratuito.
- 🔒 Fornece certificados SSL (HTTPS) automáticos.

### Atenção ao Plano Gratuito!
Servidores gratuitos no Render entram em estado de **"Spin Down"** (adormecem) após 15 minutos sem receber acessos. 
Quando a API dorme, a primeira requisição que ela receber pode demorar até **50 segundos** para responder (enquanto a máquina "acorda"). Isso é normal!

---

## 6. Passo a Passo do Deploy (Mão na Massa)

### Passo 1: Preparando o `package.json`
O Render precisa saber como ligar sua aplicação. Certifique-se de que o seu `package.json` possui um script de "start" limpo (sem nodemon ou watch):
```json
"scripts": {
  "start": "node src/server.js",
  "dev": "node --watch src/server.js"
}
```

### Passo 2: A Porta Dinâmica
Na nuvem, você não pode forçar a porta 3000. O Render vai te informar qual porta usar através de uma variável de ambiente. Atualize o seu `server.js`:
```javascript
// Jeito certo de definir a porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
```

### Passo 3: O Banco de Dados MySQL na Nuvem (Aiven)
Como estamos usando MySQL bruto e o Render só fornece PostgreSQL gratuitamente, adotaremos uma **arquitetura de nuvem híbrida** (muito comum em empresas reais). Vamos hospedar o código no Render e o banco de dados no Aiven.

1. Acesse [aiven.io](https://aiven.io) e crie uma conta.
2. Clique em *Create Service*, escolha o **MySQL** e selecione o plano "Hobbyist" (Free).
3. Copie as credenciais fornecidas (Host, Porta, User, Password).
4. Usando o **DBeaver**, **MySQL Workbench** ou a extensão de banco do **VS Code**, conecte-se a esse banco remoto usando os dados copiados.
5. Abra o seu `database.sql` e execute-o para criar as tabelas. *(Atenção: Não rode comandos `CREATE DATABASE` ou `USE`, comece direto no `CREATE TABLE`!)*

### Passo 4: Conectando no Render
1. Acesse [render.com](https://render.com) e crie uma conta usando o seu **GitHub**.
2. No painel (Dashboard), clique em **New** e escolha **Web Service**.
3. Escolha a opção *Build and deploy from a Git repository*.
4. Conecte o repositório da sua API (ex: `BACK_END_4`).
5. Se a sua API não está na raiz do repositório (como é o nosso caso agora no Sabor Digital), preencha o campo **Root Directory** com o nome da pasta (ex: `projetos/sabor_digital`).

### Passo 5: Configurando o Build e Start
O Render vai perguntar como ele constrói e como ele roda sua aplicação:
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### Passo 6: As Variáveis de Ambiente e a Conexão Mágica
Role a página até a seção **Environment Variables** e clique em *Add Environment Variable*.
É aqui que o Render e o Aiven conversam! Copie as variáveis do seu `.env` local, mas substitua os valores do banco de dados pelos valores fornecidos pelo Aiven. Exemplo:
- Key: `DB_HOST` | Value: `mysql-xxxx-aiven.aivencloud.com`
- Key: `DB_USER` | Value: `avnadmin`
- Key: `DB_PASSWORD` | Value: `sua_senha_do_aiven`
- Key: `DB_PORT` | Value: `26002`

### Passo 7: Deploy!
Clique em **Create Web Service**.
Uma tela preta mostrará os logs do Linux. Se no final aparecer a mensagem `Your service is live 🎉`, parabéns! A sua API no Render já está se conectando com sucesso ao seu MySQL no Aiven.

---

> *"O deploy não é o fim do desenvolvimento, é o começo da vida do seu software."*

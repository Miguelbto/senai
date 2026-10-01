# Guia de Mentoria: do Monolito Legado à Clean Architecture

> Miguel, este é o seu roteiro. Eu não vou te entregar o código refatorado, porque o aprendizado está justamente em tomar as decisões. O que eu entrego aqui é o mapa: o que olhar, em que ordem, que perguntas fazer e como saber que você acertou.

O arquivo `src/server.ts` é uma "Mini Loja" (usuários, produtos, pedidos, pagamento, envio, cancelamento e um relatório). Ele **funciona**, e isso é importante: refatorar é melhorar a estrutura **sem mudar o comportamento**.

---

## 0. Como usar este guia

- Faça as fases **na ordem**. Cada fase termina com um **checkpoint**: só avance quando ele estiver verde.
- Faça **um commit por passo pequeno**. Se algo quebrar, você volta um passo em vez de se perder.
- Anote dúvidas e decisões num arquivo `DECISOES.md` (ex.: "por que o cupom ficou no domínio?"). Isso vale ouro numa entrevista.
- Não tente fazer tudo de uma vez. A tentação de "reescrever do zero" é o erro número 1. Você vai **mover** código, não reescrever.

---

## 1. Os três conceitos que sustentam tudo

1. **Regra da Dependência**: dependências de código apontam sempre **para dentro**. Infraestrutura conhece Aplicação, Aplicação conhece Domínio, Domínio não conhece ninguém.
2. **Domínio** = regras de negócio puras. Nada de Fastify, SQL, `console.log`, `crypto`, `Date.now()` espalhado. Se você consegue testar sem subir nada, está certo.
3. **Inversão de Dependência**: quando a Aplicação precisa salvar algo ou enviar e-mail, ela define **o que precisa** (um contrato/interface, chamado de *porta*) e a Infraestrutura **implementa** (o *adaptador*).

Pergunta-guia para qualquer trecho de código: **"isto é regra do negócio, orquestração de um caso de uso, ou detalhe técnico?"**

---

## 2. Fase 0: Preparação e rede de segurança

### Passo 0.1. Ponha o projeto para rodar

1. Siga as instruções do comentário no topo do `server.ts`.
2. Suba o servidor e faça chamadas manuais (Insomnia, Postman, Bruno ou `curl`) para **todos** os endpoints.
3. Commit inicial: "chore: monolito legado funcionando".

### Passo 0.2. Escreva testes de caracterização

Você ainda não sabe todas as regras de cor, então primeiro **congele o comportamento atual**. Testes de caracterização não dizem "o que deveria acontecer", dizem "o que acontece hoje".

1. Escolha um test runner (o `node:test` nativo, Vitest ou Jest).
2. Use a função de injeção de requisições do próprio Fastify (leia a seção de testes da documentação) para testar **sem abrir porta de rede**.
3. Para isso funcionar, você vai precisar de uma mudança mínima e segura: separar "construir o app" de "ouvir na porta" e fazer o banco ser configurável (banco em memória nos testes). Faça isso **ainda no arquivo único**.
4. Cubra no mínimo os fluxos abaixo, anotando status HTTP e corpo:
   - cadastro válido, e-mail duplicado, e-mail/senha/nome inválidos;
   - produto válido e inválido; listagem; exclusão com e sem pedido pendente;
   - pedido: feliz, sem itens, quantidade 11, estoque insuficiente, produto inativo, cada cupom, cupom VIP para não-VIP, frete grátis pelo valor, pedido abaixo do mínimo;
   - pagamento: PIX, cartão à vista, cartão em 7x, cartão recusado, pedido já pago;
   - envio e cancelamento em cada status possível;
   - relatório de vendas.

**Checkpoint 0**: todos os testes passam contra o monolito. Este conjunto será seu "detector de mentiras" nas próximas fases: ele precisa continuar verde até o fim.

---

## 3. Fase 1: Diagnóstico (leia como um investigador)

### Passo 1.1. Caça aos *code smells*

Leia o arquivo inteiro e liste, por escrito, tudo que te incomoda. Dicas do que procurar:

- funções gigantes que fazem validação, regra, banco e resposta ao mesmo tempo;
- tipo `any` espalhado (o que isso esconde?);
- SQL dentro de handler HTTP;
- números mágicos (0.1, 0.95, 1990, 20000, 1000, 10...) e textos mágicos ('PENDING', 'PIX', 'PROMO10'...);
- segredo *hardcoded* e algoritmo de hash questionável;
- `console.log` fingindo ser e-mail e gateway de pagamento;
- dinheiro: onde é centavo, onde é reais? Onde há risco de arredondamento?
- código duplicado (busca do usuário, busca do pedido, verificação de status);
- mensagens de erro misturadas com códigos HTTP;
- decisões de negócio tomadas por quem não deveria (o handler decidindo a regra de parcelamento, por exemplo).

### Passo 1.2. Inventário de regras de negócio

Crie uma tabela (em papel ou planilha) com as colunas: **Regra | Onde está hoje | Camada de destino**. Extraia as regras lendo o código. Como pista, procure por estes grupos:

- **Usuário**: o que torna um nome, e-mail e senha aceitáveis; unicidade do e-mail; o que é cliente VIP.
- **Produto**: o que torna preço e estoque válidos; o que significa "desativar"; quando é proibido desativar.
- **Pedido (criação)**: limites por item, disponibilidade, estoque, cálculo de subtotal, regras de cada cupom, regra de frete, valor mínimo.
- **Pedido (ciclo de vida)**: quais estados existem e **quais transições são permitidas** (desenhe um diagrama de estados no papel!).
- **Pagamento**: como cada método altera o valor, limites de parcelas, o que acontece quando o pagamento é recusado.
- **Cancelamento**: o que muda no estoque, quando há estorno.
- **Relatório**: o que conta como faturamento.

### Passo 1.3. Classifique cada linha da tabela

Para cada regra, decida: é **Domínio** (verdade do negócio), **Aplicação** (sequência de passos de um caso de uso) ou **Infraestrutura** (banco, HTTP, e-mail, gateway, hash)? Discuta os casos duvidosos no seu `DECISOES.md`. Exemplo de dúvida legítima: "validar formato de e-mail é regra de negócio ou de entrada de dados?" (não existe resposta única, existe resposta **justificada**).

### Passo 1.4. Liste os casos de uso

Um caso de uso é algo que um usuário/sistema quer fazer: "Cadastrar usuário", "Criar pedido", "Pagar pedido"... Liste todos a partir dos endpoints. Serão as suas classes/funções da camada de Aplicação.

**Checkpoint 1**: você tem a tabela de regras classificada, o diagrama de estados do pedido e a lista de casos de uso.

---

## 4. Fase 2: Isolando o Domínio

**Meta**: uma pasta `domain/` que compila e é testável **sem instalar Fastify nem better-sqlite3**. Se um `import` de pacote externo aparecer ali, algo está errado.

### Passo 2.1. Estrutura e regras de ouro

- Crie a pasta de domínio e configure (se quiser rigor) uma verificação que proíba imports de fora dela.
- Nada de `Date.now()` ou `Math.random()` escondido em regra de negócio: o que for não-determinístico entra por parâmetro (quem decide "agora" é quem chama).
- O domínio não conhece JSON, status HTTP, nomes de colunas, nem `snake_case` do banco.

### Passo 2.2. Objetos de valor (Value Objects)

Identifique conceitos que hoje são "tipos primitivos soltos" e dê a eles identidade e validação próprias:

- **Dinheiro**: resolva de uma vez a confusão centavos vs. reais. Decida a representação interna, como somar, multiplicar por percentual e arredondar. Escreva testes para arredondamento.
- **E-mail**: validação na criação; normalização (caixa baixa).
- **Senha**: atenção! A regra "mínimo 6 caracteres" é do domínio; o **hash** é infraestrutura (fase 4). Pense em como representar "senha em texto" e "senha já protegida" sem misturar.
- **Identificadores**: decida se vale criar tipos para IDs ou se string basta (e justifique).
- **Status do pedido** e **método de pagamento**: substitua os textos mágicos por um conjunto fechado de valores.

Cada Value Object deve ser **imutável** e impossível de existir em estado inválido.

### Passo 2.3. Entidades

Crie as entidades com comportamento, não apenas dados:

- **Usuário**, **Produto** e **Pedido** (com seus **itens**).
- O Pedido é o mais rico: ele guarda seu estado e **é o único que sabe** como mudar de estado. As operações de pagar, enviar e cancelar viram comportamentos da entidade, que rejeitam transições inválidas seguindo o seu diagrama.
- O Produto sabe se tem estoque para uma quantidade e sabe baixar/devolver estoque.
- Decida o que é construir uma entidade **nova** e o que é **reidratar** uma já existente vinda do banco (dica: são dois caminhos de criação diferentes, e só o primeiro valida regras de "criação").

Pergunta-desafio: o Pedido deve conter objetos Produto, ou só o **ID** do produto e o preço no momento da compra? Pense em por que o legado guarda `unit_price` no item.

### Passo 2.4. Serviços de domínio

Algumas regras não pertencem a uma única entidade. Candidatos:

- **Cálculo de preço do pedido** (subtotal, cupom, frete, total, valor mínimo);
- **Política de cupons**: hoje é um `if/else` encadeado. Pense em como adicionar um cupom novo sem mexer no código antigo (princípio aberto/fechado; pesquise o padrão *Strategy*);
- **Política de pagamento** (desconto PIX, juros do parcelamento).

### Passo 2.5. Erros de domínio

Crie erros próprios e expressivos (ex.: estoque insuficiente, transição inválida, cupom não permitido). **Nenhum deles conhece HTTP.** Quem traduz "erro de domínio" em "status 409" será a camada de interface (fase 5). Crie uma hierarquia simples que permita diferenciar categorias (validação, não encontrado, conflito, proibido).

### Passo 2.6. Teste o domínio em isolamento

Escreva testes unitários rápidos (sem banco, sem rede) para: Dinheiro, E-mail, cada transição de estado válida e inválida, cada cupom, frete, parcelamento. Eles devem rodar em milissegundos.

**Checkpoint 2**: a pasta `domain/` tem testes verdes, nenhum import externo, e o `server.ts` **ainda funciona** e seus testes de caracterização continuam verdes. Dica de estratégia: você pode começar a fazer o monolito *chamar* o domínio novo aos poucos, endpoint por endpoint, em vez de trocar tudo no final.

---

## 5. Fase 3: Camada de Aplicação (Casos de Uso)

**Meta**: cada caso de uso é uma unidade que **orquestra**: busca o que precisa, chama o domínio, persiste, notifica. Ela não decide regra de negócio e não sabe nada de SQL ou Fastify.

### Passo 3.1. Defina as portas (contratos)

Para tudo que a Aplicação precisa do mundo externo, escreva **apenas o contrato**, sem implementar:

- repositórios de Usuário, Produto e Pedido (pense nas operações de que os casos de uso *realmente* precisam, não num CRUD genérico);
- serviço de hash de senha;
- gateway de pagamento;
- notificador (substitui os `console.log` de e-mail);
- gerador de IDs, gerador de código de rastreio e relógio (sim, o "agora" vira dependência, o que facilita testar);
- controle de transação (veja o Passo 3.4).

Pergunta: **onde** ficam os arquivos das portas? (Resposta correta: do lado de quem as *usa*, isto é, dentro da Aplicação. Pesquise por que isso é a "inversão" da dependência.)

### Passo 3.2. Defina entradas e saídas dos casos de uso

Crie tipos simples de entrada (DTOs de input) e saída (output) para cada caso de uso. Eles não devem expor entidades de domínio nem formatos de banco. Decida quem converte centavos em reais para a resposta (dica: não é o domínio).

### Passo 3.3. Implemente um caso de uso por vez

Ordem sugerida, da mais simples à mais complexa:

1. Cadastrar usuário e Consultar usuário;
2. Cadastrar produto, Listar produtos, Desativar produto;
3. Consultar pedido;
4. **Criar pedido** (o mais rico: usuário, itens, estoque, cupom, frete, persistência, notificação);
5. Pagar pedido;
6. Enviar pedido;
7. Cancelar pedido;
8. Relatório de vendas (pense se isso é um caso de uso de *consulta* e se merece um tratamento diferente das operações de escrita, noção de CQRS, só para você conhecer o termo).

Para cada um, o roteiro mental é: **validar entrada → carregar dados via portas → chamar domínio → salvar via portas → notificar → devolver saída**.

### Passo 3.4. Transações

No legado, criar pedido e baixar estoque acontecem numa transação do SQLite. Na Aplicação você não pode usar a API do banco. Pense em como expressar "estas operações são atômicas" como um contrato (pesquise *Unit of Work*) e onde o caso de uso delimita o início e o fim.

### Passo 3.5. Teste a Aplicação com dublês

Escreva implementações falsas em memória das portas (*fakes*) e teste cada caso de uso: caminho feliz, cada erro, e verificação de efeitos (o estoque foi baixado? o e-mail foi "enviado"? o pagamento recusado deixou o pedido intacto?).

**Checkpoint 3**: todos os casos de uso têm testes com fakes, sem banco real e sem Fastify. A pasta de aplicação só importa Domínio e suas próprias portas.

---

## 6. Fase 4: Infraestrutura (banco e serviços)

**Meta**: implementar as portas com tecnologia real. Aqui, e somente aqui, aparecem `better-sqlite3`, `crypto` e a criação de tabelas.

### Passo 4.1. Banco de dados

1. Mova a criação do esquema para um módulo de infraestrutura próprio (pense em migrações simples no futuro).
2. Implemente cada repositório. O ponto central é o **mapeamento**: linha do banco (`snake_case`, inteiros como booleanos) ⇄ entidade de domínio. Crie funções/objetos de mapeamento dedicados, com testes.
3. Implemente a transação/unidade de trabalho.
4. Teste com **banco em memória** (testes de integração): salvar, buscar, atualizar, dados inexistentes.

### Passo 4.2. Serviços técnicos

- **Hash de senha**: aproveite para corrigir o ponto fraco do legado. Pesquise o que é *salt* por usuário e por que algoritmos como bcrypt, scrypt ou argon2 são preferidos a um hash rápido com segredo fixo. O segredo não pode ficar no código.
- **Gateway de pagamento fake** e **notificador por console**: são adaptadores legítimos! Mantenha o comportamento, mas em classes próprias. Note como, no futuro, trocar por um provedor real não tocaria em nenhum caso de uso.
- **Relógio, gerador de ID e de rastreio**: adaptadores simples.

### Passo 4.3. Configuração

Retire valores soltos (porta, nome do arquivo do banco, segredos) para variáveis de ambiente lidas em **um único ponto**. Decida qual camada pode ler `process.env` (dica: a mais externa).

**Checkpoint 4**: testes de integração dos repositórios verdes; nenhuma string SQL fora da pasta de infraestrutura.

---

## 7. Fase 5: Interface HTTP e Composition Root

### Passo 5.1. Controladores/rotas finos

Cada rota deve: extrair dados da requisição → chamar **um** caso de uso → montar a resposta. Se a rota tem um `if` de regra de negócio, ela está gorda demais.

### Passo 5.2. Validação de entrada com os recursos do Fastify

Estude o sistema de *schemas* do Fastify (validação declarativa de corpo, parâmetros e resposta). Decida a divisão de responsabilidades: o schema valida **forma** (campo existe, é número); o domínio valida **significado** (preço positivo, e-mail válido). Descubra o que muda nas mensagens de erro em relação ao legado e decida se aceita a mudança ou se a adapta (cuidado: seus testes de caracterização vão te avisar).

### Passo 5.3. Tradutor de erros

Use o tratamento central de erros do Fastify para converter a hierarquia de erros de domínio/aplicação em status HTTP e corpo padronizado. Um único lugar, uma tabela de conversão. Pergunta-desafio: o que fazer com erros inesperados (não de domínio)? Eles devem vazar detalhes para o cliente?

### Passo 5.4. Plugins e organização das rotas

Organize as rotas por módulo (usuários, produtos, pedidos, relatórios) usando o mecanismo de plugins do Fastify, que é a forma idiomática do framework.

### Passo 5.5. Composition Root

Crie **um único lugar** (o ponto de entrada) onde você instancia os adaptadores concretos, injeta nos casos de uso e injeta os casos de uso nas rotas. É o único lugar do sistema que conhece todas as camadas. Decida se vai fazer injeção manual (recomendado para aprender) ou usar um contêiner; só considere contêiner depois de sentir a dor da manual.

### Passo 5.6. Sepulte o monolito

Quando todos os endpoints vierem da nova estrutura e os testes de caracterização passarem, apague o `server.ts` antigo. Esse commit é o mais satisfatório do projeto.

**Checkpoint 5**: a suíte de caracterização original passa **sem alterações nas expectativas** (ou com diferenças que você justificou no `DECISOES.md`).

---

## 8. Estrutura-alvo (referência, não regra)

```
src/
  domain/            (entidades, value objects, serviços de domínio, erros)
  application/       (casos de uso, DTOs, portas/interfaces)
  infrastructure/    (banco, repositórios, hash, gateway, notificador, config)
  interface/http/    (rotas Fastify, schemas, error handler)
  main.ts            (composition root)
tests/
  unit/ (domain, application)   integration/ (repositórios)   e2e/ (caracterização HTTP)
```

Seus nomes e agrupamentos podem variar (por camada ou por módulo de negócio). Escolha um e justifique. Não existe estrutura "certa", existe estrutura **consistente**.

---

## 9. Checklist final de qualidade

- [ ] O Domínio não importa nada de fora dele.
- [ ] A Aplicação só importa Domínio (e suas próprias portas).
- [ ] Nenhum `any` sobrou (ligue `strict: true` no `tsconfig` e resolva os erros).
- [ ] Nenhum número/texto mágico de regra de negócio fora de uma constante nomeada.
- [ ] Nenhuma rota tem regra de negócio.
- [ ] Nenhum SQL fora da infraestrutura.
- [ ] Cada caso de uso é testável sem banco e sem HTTP.
- [ ] Você consegue trocar o SQLite por outro banco mexendo **só** na infraestrutura e no composition root. (Teste mental: quais arquivos mudariam?)
- [ ] O `DECISOES.md` explica as escolhas difíceis.

## 10. Erros comuns (fique atento)

1. **Anemic Domain Model**: entidades só com campos e getters, enquanto a regra fica nos casos de uso. A regra tem que morar no domínio.
2. **Vazamento de infraestrutura**: a entidade carregando nomes de coluna ou anotações de ORM.
3. **Interface para tudo**: crie portas só onde existe fronteira real com o mundo externo.
4. **Refatorar e mudar comportamento no mesmo commit**: separe. Primeiro mova, depois melhore.
5. **Pular os testes**: sem eles você não está refatorando, está torcendo.

## 11. Desafios extras (depois de terminar)

- Adicionar um cupom novo sem alterar código existente (prova do aberto/fechado).
- Trocar o notificador por um que grava em arquivo, mexendo só na infraestrutura.
- Adicionar o método de pagamento "boleto" e ver quantas camadas são afetadas.
- Transformar o relatório numa consulta otimizada separada das entidades.
- Implementar autenticação e ver onde ela se encaixa na arquitetura.
- Publicar o repositório no GitHub com um README explicando as camadas: ótimo item de portfólio, principalmente para processos seletivos de estágio.

---

## 12. Fontes para estudar (e de onde tirar referências de código)

**Conceito**

- Robert C. Martin, *Clean Architecture* (livro) e o artigo original "The Clean Architecture" no blog.cleancoder.com.
- Alistair Cockburn, "Hexagonal Architecture" (alistair.cockburn.us): a origem de portas e adaptadores.
- Martin Fowler, *Refactoring* (livro) e o catálogo em refactoring.com / martinfowler.com.
- Michael Feathers, *Working Effectively with Legacy Code*: a bíblia dos testes de caracterização.
- Eric Evans, *Domain-Driven Design*, e Vaughn Vernon, *Implementing Domain-Driven Design* (entidades, value objects, serviços de domínio).
- refactoring.guru: catálogo de *code smells* e padrões (Strategy, Repository, etc.) em linguagem acessível.

**Prática com TypeScript / Node**

- khalilstemmler.com: artigos sobre DDD e Clean Architecture em TypeScript.
- Documentação oficial do Fastify (fastify.dev): plugins, validação por schema, tratamento de erros e testes com injeção de requisição.
- Documentação do Node.js (`node:test`), Vitest ou Jest para testes.
- Documentação do better-sqlite3 (GitHub) e da OWASP sobre armazenamento de senhas.
- Busque no GitHub por "clean architecture typescript fastify" e "node clean architecture" para **comparar** soluções depois de fazer a sua. Regra do mentor: primeiro tente sozinho, depois compare, nunca o contrário.

---

Quando terminar cada fase, me traga o que você fez (estrutura de pastas, dúvidas, trechos que ficaram estranhos) e eu reviso com você como um code review de verdade. Bom trabalho, Miguel!
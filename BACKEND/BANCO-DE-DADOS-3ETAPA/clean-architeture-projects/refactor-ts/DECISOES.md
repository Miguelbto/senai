

Diagnostico corrigido · MD
Diagnóstico da Mini Loja (versão revisada pelo mentor)
Legenda: ✅ estava certo · ✏️ ajustei · ➕ acrescentei · ❌ saiu/mudou de camada

1. Code smells
✅ O script do banco (criação das tabelas) roda dentro do arquivo da aplicação, no momento do import.
✅ Não há rota raiz nem organização por módulos/plugins.
✅ req e reply são any: nenhuma tipagem de entrada ou saída.
✅ Os dados extraídos do corpo não têm o tipo validado.
✏️ O e-mail só confere se existe @ e .. Use uma validação mais robusta (regex razoável ou biblioteca) dentro de um value object Email. Atenção: o regex "perfeito" não existe; o objetivo é rejeitar o óbvio. A confirmação de verdade seria um e-mail de verificação (melhoria futura).
✏️ A validação do nome é frágil: qualquer valor sem .length passa, porque undefined < 2 é false. Um número (qualquer um, não só "com mais de dois dígitos") e um array com 2+ elementos são aceitos. O risco real é integridade de dados. XSS não se aplica aqui: a API devolve JSON, e XSS acontece quando alguém renderiza HTML sem escapar (defesa no front-end/saída).
✅ SQL espalhado e acoplado: trocar de banco significa caçar script por script.
✏️ (junção dos antigos 8 e 12) Efeitos colaterais feitos com console.log: e-mails de boas-vindas, pedido criado, pagamento, envio, cancelamento, e o gateway de pagamento. Isso vira uma porta Notificador (e uma de gateway) com adaptadores.
✅ As respostas são montadas "na mão" em cada rota, sem schema de resposta.
✏️ Dinheiro. Guardar centavos inteiros é a prática correta; o ×100 e o /100 em si não são o erro. Os problemas reais são: (a) a conversão float→centavos no cadastro (0.004 passa em price > 0 e vira 0 centavos); (b) arredondamentos de percentuais (desconto, PIX, juros) sem política única, espalhados nas rotas; (c) a conversão para reais repetida em cada resposta. A solução é um value object Dinheiro com uma política de arredondamento só.
✏️ Textos e números mágicos: cupons, status, métodos de pagamento e também 0.1, 0.2, 0.95, 1.03, 1990, 20000, 1000, 10, 6 e 12.
✏️ O gateway de pagamento é um if dentro da rota. A solução é uma porta que fala a linguagem do seu domínio, com um adaptador (a camada anticorrupção, ACL) que traduz para o provedor externo. Trocar o provedor passa a ser trocar o adaptador.
➕ O hash de senha usa SHA-256 (rápido) com um segredo fixo no código. Use um algoritmo lento (bcrypt, scrypt ou argon2) com salt por usuário.
➕ O isVip é aceito do corpo da requisição: qualquer pessoa se cadastra como VIP e usa o cupom VIP20. É uma falha de segurança.
➕ No pagamento, o total do pedido é sobrescrito pelo valor pago. Perde-se o total original, e o relatório soma o valor pós-desconto/juros.
➕ Math.random() (código de rastreio) e new Date() espalhados: código não determinístico, difícil de testar.
➕ Consultas repetidas (usuário, pedido), status como texto solto e nenhum tratamento de erro centralizado (cada rota monta código HTTP e mensagem).
2. Classificação por camada
2.1 Usuários
Domínio

Nome é texto com no mínimo 2 caracteres; e-mail válido (normalizado em minúsculas); senha com no mínimo 6 caracteres. A senha em texto puro nunca é persistida.
✏️ A unicidade do e-mail é regra de negócio, mas só dá para verificar consultando dados. Ela é declarada aqui e aplicada no caso de uso, via porta do repositório. O UNIQUE do banco é a última defesa (infra).
O usuário pode ser VIP. ⚠️ O legado aceita isVip do cliente; "VIP falso por padrão" é uma melhoria (ver seção 3).
Aplicação: casos de uso

CadastrarUsuario (valida, checa unicidade, faz o hash, gera id, salva, notifica)
BuscarUsuario
Aplicação: portas (contratos)

✏️ RepositorioDeUsuarios (salvar, buscar por id, buscar por e-mail)
❌ hashPasswordUsecase não é caso de uso: é a porta GeradorDeHash
GeradorDeId, Relogio, Notificador (compartilhadas por vários módulos)
Infraestrutura

Repositório SQLite de usuários (com o mapeamento linha ⇄ entidade)
Adaptador de hash (algoritmo lento + salt por usuário)
Adaptador de notificação (console, por enquanto)
Rotas POST /users e GET /users/:id (✏️ não é /users solto)
Segredos e configuração via variáveis de ambiente
2.2 Produtos
Domínio

Nome não vazio (após trim); preço maior que zero; estoque inteiro maior ou igual a zero.
❌ Removi a regra "preço ≥ 0": contradizia a anterior, e o legado exige > 0.
O produto está ativo ou inativo; produto inativo não pode ser vendido.
Comportamentos: saber se tem estoque para N unidades, baixar estoque, devolver estoque, desativar.
✏️ "Reestabelecer estoque ao cancelar" é comportamento do produto, mas quem dispara e orquestra é o caso de uso CancelarPedido (aplicação).
✏️ "Não desativar produto com pedido pendente" é regra, aplicada no caso de uso (precisa consultar pedidos).
Aplicação: casos de uso

CadastrarProduto, ListarProdutosAtivos, DesativarProduto
❌ SoftDeleteProduto e desativarProduto eram a mesma coisa: ficou um só
Melhoria futura: BuscarProduto (não existe no legado)
Aplicação: portas

RepositorioDeProdutos (salvar, buscar por id, listar ativos)
RepositorioDePedidos.existePendenteComProduto(produtoId): consulta enxuta, no repositório de pedidos (decisão sua, ótima)
Infraestrutura

Repositório SQLite de produtos (um só, com várias operações; o "delete" é uma desativação)
Rotas POST /products, GET /products, DELETE /products/:id
2.3 Pedidos
Domínio: pedido e itens

Pedido tem usuário vinculado e pelo menos 1 item.
Cada item: quantidade inteira, maior que zero e no máximo 10; guarda o id do produto e o preço no momento da compra.
Produto precisa estar ativo e ter estoque maior ou igual à quantidade.
Domínio: preço (serviços de domínio)

Subtotal = soma dos itens.
Cupons (maiúsculas ou minúsculas): PROMO10 = 10%; VIP20 = 20%, só para VIP; FRETEGRATIS = frete zero. Cupom desconhecido é erro.
Frete = R$ 19,90, exceto se (subtotal − desconto) ≥ R$ 200,00 ou cupom FRETEGRATIS.
Total = subtotal − desconto + frete. Mínimo de R$ 10,00 no total final.
Domínio: pagamento

Métodos: PIX ou cartão.
PIX: desconto de 5%.
✏️ Cartão: 1 a 12 parcelas; somente acima de 6 parcelas há 3% de juros (não 3% em todo cartão).
❌ "Cartão que começa com 0000 é recusado" não é regra de negócio: é o comportamento do gateway fake. Vai para a infraestrutura (adaptador).
Domínio: ciclo de vida

Estados: PENDING, PAID, SHIPPED, CANCELED.
Pagar: só de PENDING. Enviar: só de PAID. Cancelar: de PENDING ou PAID (nunca de SHIPPED nem de CANCELED).
Cancelar devolve o estoque; se estava PAID, há estorno.
✏️ A mudança de status é comportamento do Pedido (você tinha chamado de "status do produto").
Aplicação: casos de uso

CriarPedido, ConsultarPedido, PagarPedido, EnviarPedido, CancelarPedido, RelatorioDeVendas
❌ Saíram da aplicação: calcularSubtotal/Desconto/Total e cupomUsecase (viraram domínio); userExistsUsecase e itemExistUsecase (são passos do caso de uso); gatewayPagamentoUsecase (é uma porta); statusPedidoPagamento (é domínio); rastreamentoPedido (é uma porta de geração de código).
Aplicação: portas

RepositorioDePedidos, RepositorioDeProdutos, RepositorioDeUsuarios
GatewayDePagamento (cobrar, estornar), Notificador, GeradorDeCodigoDeRastreio, GeradorDeId, Relogio
UnidadeDeTrabalho (transação)
Infraestrutura

Repositório SQLite de pedidos (com itens), com mapeamento e transações (criar pedido e cancelar)
Adaptador do gateway (fake: recusa cartão iniciado em 0000, loga estorno) e do notificador
Rotas POST /orders, GET /orders/:id, POST /orders/:id/pay, /ship e /cancel
Schemas de entrada e saída (forma: tipo, presença); o significado (quantidade > 0 e inteira) fica no domínio
2.4 Relatório (✏️ no seu documento estava repetido como "USERS")
Domínio

Faturamento = soma dos pedidos PAID e SHIPPED.
Aplicação

RelatorioDeVendas (consulta; não altera nada)
Infraestrutura

Rota GET /reports/sales (✏️ estava /reposts)
Consulta agregada no repositório
3. Lista de "Melhorias" (NÃO fazer durante a refatoração)
Refatorar = manter o comportamento. Estas mudanças entram depois do checkpoint final, uma por commit, atualizando os testes de propósito:

isVip deixar de ser aceito do corpo da requisição (padrão false).
Recusar nome que não seja texto.
Recusar preço menor que 1 centavo.
Hash de senha seguro (atenção: senhas antigas deixam de funcionar).
Preservar o total original do pedido e registrar o valor pago à parte.
Caso de uso BuscarProduto.
Rever o mínimo de R$ 10: hoje o frete de R$ 19,90 o torna quase inalcançável sem o cupom FRETEGRATIS.
4. Pendências para fechar a Fase 1
 Diagrama de estados do pedido (PENDING, PAID, SHIPPED, CANCELED e as transições permitidas).
 Criar o DECISOES.md com: (a) por que o Pedido referencia produtos pelo id + preço congelado; (b) por que a consulta de "pedido pendente com este produto" mora no repositório de pedidos; (c) onde fica a validação do número do cartão (forma vs. regra).




📁 MEU-PROJETO
├── 📁 src
│   ├── 📁 shared-kernel
│   │   ├── 📁 domain
│   │   │   ├── 📄 money.ts
│   │   │   └── 📄 domain-error.ts
│   │   ├── 📁 application
│   │   │   ├── 📄 clock.ts
│   │   │   ├── 📄 id-generator.ts
│   │   │   └── 📄 unit-of-work.ts
│   │   └── 📁 infrastructure
│   │       ├── 📄 system-clock.ts
│   │       ├── 📄 uuid-generator.ts
│   │       └── 📄 sqlite-unit-of-work.ts
│   │
│   ├── 📁 contexts
│   │   ├── 📁 identity
│   │   │   ├── 📁 domain
│   │   │   │   ├── 📄 user.ts
│   │   │   │   ├── 📄 email.ts
│   │   │   │   ├── 📄 plain-password.ts
│   │   │   │   ├── 📄 password-hash.ts
│   │   │   │   └── 📄 errors.ts
│   │   │   ├── 📁 application
│   │   │   │   ├── 📁 ports
│   │   │   │   ├── 📁 use-cases
│   │   │   │   └── 📁 dto
│   │   │   ├── 📁 infrastructure
│   │   │   │   ├── 📄 sqlite-user-repository.ts
│   │   │   │   ├── 📄 user-mapper.ts
│   │   │   │   └── 📄 scrypt-password-hasher.ts
│   │   │   ├── 📁 interface
│   │   │   │   └── 📁 http
│   │   │   │       ├── 📄 user-routes.ts
│   │   │   │       └── 📄 user-schemas.ts
│   │   │   └── 📄 public-api.ts
│   │   │
│   │   ├── 📁 catalog
│   │   │   ├── 📁 domain
│   │   │   ├── 📁 application
│   │   │   ├── 📁 infrastructure
│   │   │   ├── 📁 interface
│   │   │   │   └── 📁 http
│   │   │   └── 📄 public-api.ts
│   │   │
│   │   ├── 📁 ordering
│   │   │   ├── 📁 domain
│   │   │   │   ├── 📁 services
│   │   │   │   └── 📁 coupons
│   │   │   ├── 📁 application
│   │   │   ├── 📁 infrastructure
│   │   │   ├── 📁 interface
│   │   │   │   └── 📁 http
│   │   │   └── 📄 public-api.ts
│   │   │
│   │   ├── 📁 payment
│   │   │   ├── 📁 domain
│   │   │   ├── 📁 application
│   │   │   ├── 📁 infrastructure
│   │   │   ├── 📁 interface
│   │   │   │   └── 📁 http
│   │   │   └── 📄 public-api.ts
│   │   │
│   │   └── 📁 reporting
│   │       ├── 📁 application
│   │       ├── 📁 infrastructure
│   │       ├── 📁 interface
│   │       │   └── 📁 http
│   │       └── 📄 public-api.ts
│   │
│   ├── 📁 app
│   │   ├── 📄 build-app.ts
│   │   ├── 📄 composition-root.ts
│   │   ├── 📄 error-handler.ts
│   │   └── 📄 config.ts
│   │
│   └── 📄 main.ts
│
├── 📁 tests
│   ├── 📁 unit
│   │   ├── 📁 identity
│   │   ├── 📁 catalog
│   │   └── 📁 ordering
│   ├── 📁 integration
│   │   ├── 📁 identity
│   │   └── 📁 ordering
│   └── 📁 e2e
├── 📄 package.json
└── 📄 tsconfig.json
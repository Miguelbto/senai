Markdown
# 📱 Guia de Implementação: Gerenciador Financeiro Mobile

Documentação técnica e checklist de desenvolvimento do aplicativo mobile para controle de finanças pessoais, construído com **React Native**, **Expo** e **SQLite**.

---

## 🎯 1. Escopo e Requisitos do Projeto

* **Interface Mobile:** Duas telas com navegação por abas e formulário modal.
* **Persistência Real:** Utilização do `expo-sqlite` para armazenamento local resiliente.
* **CRUD Completo:**
  * **C (Create):** Cadastro de novas transações via Modal.
  * **R (Read):** Listagem e relatórios de receitas/despesas no Dashboard e no Histórico.
  * **U (Update):** Edição dos dados de uma transação cadastrada.
  * **D (Delete):** Remoção de movimentações com confirmação de segurança.

---

## 🛠️ 2. Dependências e Configuração do Ambiente

### Pré-requisitos
* Node.js LTS instalado.
* VS Code.
* Aplicativo **Expo Go** instalado no celular.

### Comandos de Inicialização

```bash
# 1. Criar o projeto Expo
npx create-expo-app@latest gerenciador-financas
cd gerenciador-financas

# 2. Instalar todas as dependências do projeto
npx expo install expo-sqlite @react-native-picker/picker @react-native-community/datetimepicker react-native-screens react-native-safe-area-context && npm install @react-navigation/native @react-navigation/bottom-tabs
📂 3. Arquitetura de Pastas
Plaintext
gerenciador-financas/
├── src/
│   ├── database/
│   │   ├── init.js                     # Inicialização da tabela SQLite
│   │   └── transactionRepository.js    # Consultas SQL isoladas (CRUD)
│   ├── components/
│   │   ├── SummaryCards.js             # Bloco dos 3 cards (Saldo, Receitas, Despesas)
│   │   ├── TransactionItem.js          # Card individual da lista com botões de ação
│   │   └── TransactionModal.js         # Modal com o formulário de cadastro/edição
│   ├── screens/
│   │   ├── DashboardScreen.js          # Tela 1: Visão geral e atalhos
│   │   └── HistoryScreen.js            # Tela 2: Filtros e lista completa
│   └── navigation/
│       └── AppNavigator.js             # Configuração da Bottom Tab Navigation
├── App.js                              # Ponto de entrada da aplicação
└── package.json
📋 4. Checklist Detalhado de Implementação
Etapa 1: Camada de Dados (src/database/)
[X] init.js:

[X] Criar função de inicialização que abre a conexão com o banco financas.db.

[X] Executar query CREATE TABLE IF NOT EXISTS transacoes com as colunas: id, descricao, valor, tipo ('receita'/'despesa'), categoria, e data.

[X] transactionRepository.js:

[X] Implementar addTransactionDB(descricao, valor, tipo, categoria, data).

[X] Implementar getTransactionsDB(tipoFiltro).

[X] Implementar getTotalsDB() (Retorna a soma de receitas, despesas e saldo).

[X] Implementar updateTransactionDB(id, descricao, valor, tipo, categoria, data).

[X] Implementar deleteTransactionDB(id).

Etapa 2: Componentes Reutilizáveis (src/components/)
[X] SummaryCards.js:

[X] Renderizar card principal de Saldo Total (Destaque visual).

[X] Renderizar sub-cards de Receitas (Verde) e Despesas (Vermelho).

[ ] Receber valores dinâmicos via props.

[ ] TransactionItem.js:

[ ] Exibir ícone condicional por categoria/tipo.

[ ] Exibir descrição, categoria, data e valor (Verde para receita, Vermelho para despesa).

[ ] Adicionar botão de Editar (✏️) acionando callback onEdit.

[ ] Adicionar botão de Excluir (🗑️) acionando callback onDelete.

[ ] TransactionModal.js:

[ ] Criar estrutura base do Modal do React Native.

[ ] Adicionar seletor alternável entre Receita e Despesa.

[ ] Criar inputs: Valor (keyboardType="numeric"), Descrição e Data.

[ ] Integrar o @react-native-picker/picker para escolha da Categoria.

[ ] Ajustar formulário para reaproveitamento (Modo Criação vs Modo Edição).

Etapa 3: Navegação (src/navigation/)
[ ] AppNavigator.js:

[ ] Configurar createBottomTabNavigator.

[ ] Mapear as telas DashboardScreen e HistoryScreen.

[ ] Adicionar ícones estilizados na barra de navegação inferior usando @expo/vector-icons.

Etapa 4: Telas Principais (src/screens/)
[ ] DashboardScreen.js:

[ ] Chamar init.js no useEffect para carregar o banco na inicialização.

[ ] Carregar saldos agregados (getTotalsDB) e exibir no SummaryCards.

[ ] Renderizar resumo com as 3 últimas movimentações.

[ ] Adicionar botão flutuante FAB (+) no canto inferior para abrir o TransactionModal.

[ ] HistoryScreen.js:

[ ] Adicionar barra de filtros no topo: [ Todos ], [ Receitas ], [ Despesas ].

[ ] Renderizar FlatList alimentada por getTransactionsDB(filtro).

[ ] Conectar os botões de ação do TransactionItem:

[ ] Editar: Abre o modal preenchido.

[ ] Excluir: Exibe Alert.alert de confirmação antes de disparar o DELETE.

📝 5. Justificativa Técnica (Para Defesa Acadêmica)
"Escolhemos o SQLite (expo-sqlite) em vez do AsyncStorage porque o aplicativo lida com dados estruturados e exige operações matemáticas agregadas (soma de receitas e despesas). O SQLite permite realizar esses cálculos diretamente na camada de banco de dados nativa via consultas SQL (SELECT SUM(valor)...), garantindo alto desempenho e menor consumo de memória, sem a necessidade de carregar e processar grandes arrays JSON em memória como exigiria o AsyncStorage."
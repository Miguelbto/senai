# Exercicio de Fixacao — Navegacao com React Navigation

**Disciplina:** Programacao para Dispositivos Moveis (PPDM)
**Tema:** Navegacao e **Hooks**
**Entrega:** Apresentacao rapida para o professor ao final da aula

---

## Contexto

Voce recebeu um projeto React Native com o tema **Games** pre-definido e 4 telas genericas sem estilizacao. Sua tarefa e:

1. Implementar a navegacao entre as telas usando React Navigation
2. Implementar hooks (`useState` e `useEffect`) nas telas indicadas
3. Substituir os dados pelos jogos que voce escolheu e estilizar o app com identidade visual propria

Voce pode usar inteligencia artificial para auxiliar na estilizacao. Leia o arquivo `BOAS_PRATICAS_IA.md` antes de comecar.

---

## Passo 1 — Instalar as dependencias

```
npm install
```

As dependencias do React Navigation ja estao no `package.json`. Basta rodar o comando acima.

---

## Passo 2 — Implementar a navegacao

O app usa dois tipos de navegacao combinados:

- **Bottom Tab Navigator** — as abas principais (Jogos, Lista, Perfil)
- **Stack Navigator** — a navegacao entre a lista de jogos e o detalhe de um jogo

A navegacao esta dividida em arquivos separados dentro de `src/navigation/`:

- `index.js` — exporta o `AppNavigator`, componente que centraliza toda a navegacao (nao editar)
- `StackNavigator.js` — navegacao em pilha entre a lista de jogos e o detalhe
- `TabNavigator.js` — navegacao por abas com as telas principais

**No `App.js`**, complete os comentarios `TODO` para montar a arvore de componentes:
`SafeAreaProvider` > `NavigationContainer` > `AppNavigator`

**No `StackNavigator.js` e `TabNavigator.js`**, registre as telas:

- Use `<Stack.Screen>` ou `<Tab.Screen>` dentro do navigator correspondente
- Cada Screen precisa de um `name` e um `component`
- Os `TODO` em cada arquivo indicam quais telas registrar

Consulte os exemplos de sala para ver o padrao exato.

---

## Passo 3 — Implementar hooks (useState e useEffect)

Com a navegacao funcionando, implemente os hooks nas telas:

### Na HomeScreen

- Importe `useState` e `useEffect` do React no topo do arquivo
- Declare um estado para guardar o texto digitado na busca, iniciando com string vazia
- Declare um estado para os jogos que aparecem na lista, iniciando com todos os jogos
- Adicione um `useEffect` que depende do estado de busca e atualiza os jogos filtrados sempre que o usuario digitar
- Ligue o `TextInput` ao estado de busca usando as props `value` e `onChangeText`
- Troque o `data` da `FlatList` para usar o estado de jogos filtrados

Os comentarios no arquivo mostram o padrao exato a seguir para cada etapa.

### Na DetalheScreen

- Importe `useState` do React no topo do arquivo
- Declare um estado booleano iniciando como `false` para controlar se o jogo foi salvo
- No botao, adicione um `onPress` que alterna o estado usando a forma funcional do setter
- Use o estado para decidir qual texto mostrar no botao e qual estilo aplicar

Os comentarios no arquivo mostram o padrao exato a seguir para cada etapa.

### Na ListaScreen

A tela ja possui `FlatList` configurada com dados de exemplo. Voce deve:

- Criar o componente `CardJogo` em `src/components/CardJogo.js` (veja o Passo 5)
- Usar `<CardJogo>` no `renderItem` passando as props `titulo`, `genero`, `plataforma` e `nota`

O comentario no `renderItem` ja mostra exatamente como usar o componente apos cria-lo. Os dados de exemplo ja estao no estado inicial para voce visualizar o resultado.

---

## Passo 4 — Adaptar os dados ao tema

Em cada tela, substitua os dados pelos jogos que voce escolheu. Os comentarios `// TODO` indicam exatamente onde fazer cada mudanca.

Garanta que a navegacao da `HomeScreen` para a `DetalheScreen` passe os dados do jogo via `route.params`. Os dados chegam na `DetalheScreen` automaticamente e ja estao sendo lidos com `route?.params`.

---

## Passo 5 — Organizar componentes

A pasta `src/components/` ja tem um exemplo de componente reutilizavel (`BotaoAcao.js`).

Crie o componente `CardJogo` em `src/components/CardJogo.js`. Ele deve receber as props `titulo`, `genero`, `plataforma` e `nota` e exibi-las de forma visual.

Depois, exporte-o no `index.js` seguindo o mesmo padrao do `BotaoAcao`.

---

## Passo 6 — Estilizar

Aplique uma identidade visual consistente em todas as telas. Use o arquivo `BOAS_PRATICAS_IA.md` para aprender a usar IA de forma eficiente nessa etapa.

---

## Estrutura esperada ao final

```
src/
  components/
    BotaoAcao.js
    CardJogo.js
    index.js
  navigation/
    index.js
    StackNavigator.js
    TabNavigator.js
  screens/
    HomeScreen.js
    DetalheScreen.js
    ListaScreen.js
    PerfilScreen.js
```

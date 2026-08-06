# Learning React Native

Repositorio educativo de React Native, criado para ensinar os fundamentos da plataforma de forma progressiva e pratica. Os modulos seguem uma ordem didatica, partindo do basico (JSX) ate conceitos mais avancados (hooks).

Ideal para quem esta comecando com React Native e quer aprender atraves de exemplos comentados e exercicios guiados.

## Stack

- React 19.1.0 / React Native 0.81.5 / Expo 54
- JavaScript puro (sem TypeScript)
- New Architecture habilitada

## Pre-requisitos

- [Node.js](https://nodejs.org/) (versao 18 ou superior)
- [Expo Go](https://expo.dev/go) instalado no celular (Android ou iOS)

## Instalacao e execucao

```bash
npm install
npm start
```

Escaneie o QR Code exibido no terminal com o app Expo Go.

## Como usar os exemplos

Cada arquivo e um componente independente. Para visualizar, troque o import no `src/App.js`:

```js
import MeuExemplo from "./01_jsx/estrutura_jsx";

export default function App() {
  return <MeuExemplo />;
}
```

Nao ha navegacao entre telas — basta alterar o import para explorar cada topico.

## Estrutura do projeto

```
src/
  App.js                              -- Componente raiz (altere o import aqui)
  index.js                            -- Registro do app no Expo

  01_jsx/                             -- Fundamentos do JSX
    estrutura_jsx.js                  -- Elemento raiz, Fragment, auto-fechamento
    expressoes_jsx.js                 -- Variaveis, funcoes e operacoes no JSX
    condicionais.js                   -- Ternario, && e variavel JSX
    listas_map.js                     -- .map(), key e .filter()
    exercicios_resolvidos/            -- Exercicios com gabarito

  02_componentes_basicos/             -- Componentes nativos do React Native
    view/                             -- View, Flexbox, padding, margin, bordas
    text/                             -- Text, estilos de texto, aninhamento
    image/                            -- Image, resizeMode, imagem circular
    text_input/                       -- TextInput, keyboardType, formulario
    scroll_view/                      -- ScrollView, horizontal, contentContainerStyle
    flatlist/                         -- FlatList, renderItem, grid, lista vazia
    stylesheet/                       -- StyleSheet.create, combinacao, posicionamento
    touchable_opacity/                -- TouchableOpacity, onPress, botoes
    exercicios/                       -- Exercicios de layout e estilizacao

  03_props/                           -- Props e comunicacao entre componentes
    aula.js                           -- Aula principal sobre props
    exercicios/                       -- Exercicios praticos

  04_react_hooks/                     -- Hooks do React
    useState_example.js               -- Estado com useState
```

## Metodologia

Cada modulo segue o padrao:

1. **Exemplos comentados** -- arquivos com etapas numeradas ("ETAPA 1", "ETAPA 2") explicando cada conceito
2. **Scaffolds** -- templates base com placeholder `{/* VAMOS CONSTRUIR AQUI */}` para construir em aula
3. **Exercicios** -- desafios praticos com marcadores `TODO` para os alunos completarem

## Licenca

Uso educacional.

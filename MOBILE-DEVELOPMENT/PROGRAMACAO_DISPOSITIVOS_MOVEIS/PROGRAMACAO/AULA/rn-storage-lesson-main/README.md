# rn-storage-lesson

Repositório de apoio para aula técnica sobre **persistência de dados em React Native**.

## Objetivo da aula

O projeto começa como um app de **lista de tarefas simples**, com o estado gerenciado apenas em memória via `useState`. Ou seja, no ponto de partida:

- As tarefas cadastradas **somem ao recarregar o app** — não há nenhum tipo de persistência ainda.
- O foco inicial é fixar os conceitos de estado, listas (`FlatList`) e componentização antes de introduzir persistência.

A partir dessa base, a aula evolui para implementar a persistência dos dados (por exemplo, com `AsyncStorage` ou outra solução de armazenamento local), fazendo as tarefas sobreviverem ao fechar e reabrir o app.

## Estrutura do projeto

```
App.js                        # ponto de entrada, monta a screen principal
src/
  screens/
    ListaTarefasScreen.js     # tela com o estado e a lógica da lista de tarefas
  components/
    TarefaItem.js             # componente de um item da lista (concluir/excluir)
```

## Estado do código

O arquivo [src/screens/ListaTarefasScreen.js](src/screens/ListaTarefasScreen.js) está propositalmente incompleto (funções e estado a implementar) para servir de exercício em sala: os alunos devem completar a lógica de adicionar, concluir e excluir tarefas junto ao professor em live coding, antes de avançar para a etapa de persistência.

## Como rodar

```bash
npm install
npx expo start
```

Escolha rodar no Android, iOS ou Web a partir do menu do Expo CLI.

## Tecnologias

- [Expo](https://docs.expo.dev/versions/v57.0.0/) (SDK 57)
- React Native
- Componentização básica com `StyleSheet`, sem bibliotecas de UI externas

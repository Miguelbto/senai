# Pagina Virada - API

API REST didatica em Node.js + Express para uso em aula de React Native.

## Como rodar

```bash
npm install
npm start
```

A API sobe em http://localhost:3000

## Acessando do emulador Android

No emulador Android, `localhost` aponta para o proprio emulador.
Para acessar a maquina host use `http://10.0.2.2:3000`.

O app ja vem configurado com esse endereco em `services/api.js`.

## Endpoints

| Metodo | Rota            | Descricao                                           |
|--------|-----------------|-----------------------------------------------------|
| GET    | /livros         | Lista todos os livros                               |
| GET    | /livros/:id     | Retorna um livro (404 se nao existir)               |
| GET    | /favoritos      | Lista favoritos com dados do livro embutidos        |
| POST   | /favoritos      | Cria favorito `{ livroId, observacao }`             |
| PUT    | /favoritos/:id  | Atualiza observacao `{ observacao }`                |
| DELETE | /favoritos/:id  | Remove o favorito (204 sem corpo)                   |

## Comportamentos didaticos

- Delay aleatorio de 300-600ms em todas as respostas GET (simula latencia real).
- Erro 500 em ~10% das requisicoes de escrita (POST/PUT/DELETE), para forcar
  tratamento de erro no app.

Para desligar os erros simulados, altere a flag no topo de `server.js`:

```js
const SIMULAR_ERROS = false;
```

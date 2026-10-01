Testando o JWT no Thunder Client — Passo a Passo

Vou te mostrar a sequência completa de testes, na ordem que faz sentido (igual ao fluxo real da aplicação).

Pré-requisito

Abra a extensão Thunder Client no VS Code (ícone de raio na barra lateral) e certifique-se de que seu servidor está rodando (npm start ou node server.js).

1. Testar o registro (POST /auth/registro)
Method: POST
URL: http://localhost:3000/auth/registro (ajuste a porta)
Vá na aba Body → selecione JSON:
json
{
  "nome": "João Silva",
  "email": "joao@teste.com",
  "senha": "senha123",
  "papel": "admin"
}

Clique em Send.

Esperado: status 201, retorno com id, nome, email, papel, criado_em — sem a senha. Se a senha aparecer na resposta, tem algo errado no repository (revise o RETURNING).

Dica: crie um usuário com "papel": "admin" e outro sem o campo (vai virar "user" pelo default) — assim você testa os dois casos de permissão depois.

2. Testar o login (POST /auth/login)
Method: POST
URL: http://localhost:3000/auth/login
Body (JSON):
json
{
  "email": "joao@teste.com",
  "senha": "senha123"
}

Esperado: status 200 com:

json
{
  "usuario": { "id": 1, "nome": "João Silva", "email": "joao@teste.com", "papel": "admin" },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Copie o accessToken e o refreshToken — você vai usar nos próximos passos.

Dica útil: salvar em variável de ambiente do Thunder Client

Em vez de copiar/colar manualmente toda hora:

Crie um Environment no Thunder Client (ícone de engrenagem → New Environment, ex: "Local").
Na aba Tests da requisição de login, adicione:
javascript
// Tests tab
tc.setVar("accessToken", tc.response.json.accessToken);
tc.setVar("refreshToken", tc.response.json.refreshToken);

Assim, toda vez que você rodar o login, essas variáveis são atualizadas automaticamente, e você usa {{accessToken}} nas próximas requisições.

3. Testar rota protegida sem token (deve falhar)
Method: POST
URL: http://localhost:3000/produtos
Body: qualquer JSON de produto
Não envie o header Authorization

Esperado: status 401 — "Token não fornecido".

Isso confirma que o verificarToken está bloqueando corretamente.

4. Testar rota protegida com token válido
Method: POST
URL: http://localhost:3000/produtos
Vá na aba Headers e adicione:
Key	Value
Authorization	Bearer {{accessToken}}

(ou cole o token direto se não configurou variável: Bearer eyJhbGci...)

Body (JSON):
json
{
  "nome": "Produto Teste",
  "preco": 99.90
}

Esperado: se o usuário logado for admin, status 201/200 normal do controller de produtos.

5. Testar verificarAdmin (usuário sem permissão)

Registre e faça login com um usuário "papel": "user" (sem admin), pegue esse accessToken e repita o passo 4.

Esperado: status 403 — "Acesso restrito a administradores".

Isso confirma que o verificarAdmin está distinguindo papéis corretamente.

6. Testar token expirado/inválido

Duas formas de testar:

A) Token adulterado: pegue um accessToken válido, mude um caractere no meio dele, use no header.
Esperado: 403 — "Token inválido ou expirado".

B) Token expirado de verdade: troque temporariamente no .env JWT_EXPIRES_IN=10s, reinicie o servidor, faça login, espere 10 segundos, tente acessar a rota protegida.
Esperado: 403. Depois volte o .env para 15m.

7. Testar o refresh token (POST /auth/refresh-token)
Method: POST
URL: http://localhost:3000/auth/refresh-token
Body (JSON):
json
{
  "refreshToken": "{{refreshToken}}"
}

Esperado: status 200 com um novo accessToken. Use esse novo token na aba Headers do passo 4 para confirmar que ele funciona.

Teste de erro: envie um refresh token inválido/inventado → espere 401 — "Refresh token inválido".

8. Testar o logout (POST /auth/logout)
Method: POST
URL: http://localhost:3000/auth/logout
Body (JSON):
json
{
  "refreshToken": "{{refreshToken}}"
}

Esperado: status 204 (sem conteúdo).

Confirmação real do logout: repita o passo 7 (refresh) com o mesmo refreshToken — agora deve dar 401, porque ele foi removido do banco.

Checklist resumido da sessão de testes
#	Requisição	Resultado esperado
1	Registro	201, sem senha na resposta
2	Login	200, accessToken + refreshToken
3	Rota protegida sem token	401
4	Rota protegida com token válido (admin)	200/201
5	Rota protegida com token válido (não-admin)	403
6	Token inválido/expirado	403
7	Refresh token válido	200, novo accessToken
8	Logout + reuso do refresh token	204 depois 401
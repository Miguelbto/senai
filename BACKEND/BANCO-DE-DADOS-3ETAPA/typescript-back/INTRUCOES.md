testes:

npm run test: Roda todos os testes uma única vez e encerra.

npm run test:watch: Modo de desenvolvimento — reexecuta os testes automaticamente sempre que você salvar um arquivo.

npm run test:unit: Executa apenas os testes unitários (ideal para rodar continuamente enquanto você desenvolve a lógica das regras de negócio).

npm run test:e2e: Executa apenas os testes integrados que fazem chamadas HTTP e acessam o PostgreSQL no Docker.

npm run test:cov: Gera uma tabela no terminal mostrando a porcentagem exata de linhas, funções e ramificações da sua API cobertas por testes.



Geração de dados Fakes  com factories e @faker-js/faker
Usar valores estaticos como email por exemplo gera colisão com o banco como @unique, ou falsos positivos. As factories geram objetos com dados aleatórios válidos a cada execução, permitindo sobreescrever propriedades necessárias para o teste 
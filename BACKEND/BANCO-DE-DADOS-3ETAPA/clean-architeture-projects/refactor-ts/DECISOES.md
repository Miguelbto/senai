
1. Execução do script do banco de dados

2. sem uma rota root para chamar suas subrotas

3. requisição e reply sem nenhum tipo de interface ou tipagem ao receber ou entragar argumentos

4. extração dos dados não valida o tipo deles

5. email não tem sua validação ideal com REGEX

6. não valida campos como deveria, o nome pode ser passado uma string.

7. sripts manuais e totalmente acoplados ao código, se mudar o banco tenho que procurar script por script para altera-los

8. console.log para mostrar exibir uma mensagem de bem vindo 

9. esta enviando o id junto na resposta

9. o preço esta validando errado, pois pode ser arredondado pela função de mathRound 

10. string soltas validando, frete gratis, promo, vip, estão todos soltos 

11. o bound context de pagamento ele é generico, deveria ser um ACL(anti corruption layer)

12. console.log totalmente errados para mostrar eventos 

**Classificação dominio/aplicação/infraestrutura**

1. USERS
    Dominio: 
        1. um usuario só pode ser cadastrado tendo um nome, email e senha
        2. o usuario deve ser criado com o campo vip como falso por padrão
        3. um usuario não pode ser cadastrado com um email já existente
        

    Aplicação: 
        1. verificarExistenciaUsuario
        2. UniqueIdGenerator
        4. createUsuarioUsecase
        5. buscarUsuarioUnicoUsecase


    Infraestrutura: 
        1. hashPassword
        2. post "/users"
        3. get "/users"
        4. buscarUsuarioRepository

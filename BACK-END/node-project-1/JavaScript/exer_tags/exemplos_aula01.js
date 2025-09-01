// var nome = "João"; // Declara a variável 'nome' e atribui o valor "João"

// var nome = "Maria"; // Redefine a variável 'nome' para "Maria"

// console.log(nome); // Exibe o valor atual de 'nome' no console (Saída: Maria)

//----------------------------------------------------------------------------------------------

// let idade = 30; // Declara a variável 'idade' e atribui o valor 30


// let idade = 25; // Declara a variável 'idade' e atribui o valor 25

// idade = 30; // Redefine a variável 'idade' para 30

// console.log(idade); // Exibe o valor atual de 'idade' no console (Saída: 30)
// // A variável 'idade' foi declarada com 'let', permitindo sua redefinição
// // Se fosse 'const', a redefinição causaria um erro

//----------------------------------------------------------------------------------------------

// const cidade = "São Paulo"; // Declara a constante 'cidade' e atribui o valor "São Paulo"
 
// console.log(cidade); 

//----------------------------------------------------------------------------------------------

// let nomeCompleto = "Celso Rodrigo Rusti"

// console.log(nomeCompleto);

//----------------------------------------------------------------------------------------------

// let texto = "Olá, mundo!"; //string

// let número = 42; //number

// let booleano = true; //boolean

// let nulo = null; //null

// let indefinido; //undefined

//----------------------------------------------------------------------------------------------

// let texto = "olá mundo"; //string

// let num1 = 10;

// let num2 = 20;

// let verdadeiro = true; //boolean

// console.log(num1 + num2); //30

// console.log(texto); //olá mundo

//----------------------------------------------------------------------------------------------


// let lis = ["maça", "banana", "uva", "manga", "abacaxi"];

// let people = {
//     nome: 'Nome:Miguel',
//     idade: '23 anos',
//     pais: 'País:Suiça',
//     salario: 'Salário:1000000',
//     profissao: 'Profissão:programador'
// };

// function saudacao(nome) {
//     return `olá, ${nome} seja bem vindo!`;
// }

// console.log(saudacao(people.nome));
// console.log("receba sua descrições abaixo:");
// console.log(people.nome, people.idade, people.pais, people.salario, people.profissao);
// console.log(lis);

//----------------------------------------------------------------------------------------------

// let a = true, b = false;
// console,=.log(a && b); // false
// console.log(a || b); // true
// console.log(!a); // false

//----------------------------------------------------------------------------------------------

// let idade = 18

// if (idade >= 18) {
//     console.log("Você é maior de idade.");
// } else {
//     console.log("Você é menor de idade.");
// }

//----------------------------------------------------------------------------------------------

// let nota = 85;

// if (nota >= 90) {
//     console.log("Aprovado com A");
// } else if (nota >= 70) { 
//     console.log("Aprovado com B");
// } else {
//     console.log("Reprovado");
// }

//----------------------------------------------------------------------------------------------

// let a = 10;
// let b = 20;

// if (a === b) {
//     console.log("a é diferente de b");
// } else {
//     console.log("a é igual a b"); 
// }

//----------------------------------------------------------------------------------------------

// let idade = 18;

// let mensagem = idade >= 18 ? "Você é maior de idade." : "Você é menor de idade.";

// console.log(mensagem);

//----------------------------------------------------------------------------------------------

// let dia = 3;

// switch (dia) {
//     case 1:
//         console.log("Segunda-feira");
//         break;
//     case 2:
//         console.log("Terça-feira");
//         break;
//         default:
//         console.log("Outro dia")
// }


//----------------------------------------------------------------------------------------------

// for (let i = 0; i < 5; i++) {
//     console.log(i);
// }

//----------------------------------------------------------------------------------------------

// let nome = ["Ana", "Brenda","Láis", "Sinesio", "Zilda" ] //declaração da variável e o que contém dentro dela

// for (let i = 0; i < 5; i++) {  // 
//     console.log(nome[i]);
// }
 
// o i++ serve para representar o incremento de um número na contagem exatamnete assim: i = i + 1

//---------------------------------------------------------------------------------------------

// let numeros = [1, 2, 3]; 
// numeros.forEach(num => console.log(num));

//---------------------------------------------------------------------------------------------

// let contador = 0;
// while (contador < 15) {
//     console.log(contador);
//     contador++
// }

//---------------------------------------------------------------------------------------------

// let num = 5;
// do { 
//     console.log(num);   
//     num++; 
// }
//     while(num < 3);

//----------------------------------------------------------------------------------------------

// let lista = ["Banana", "Maça", "Laranja"];
// console.log(lista[0]); //"banana"

// lista.push("uva"); //adiciona ao final
// lista.pop(); // Remove o último
// lista.unshift ("Manga"); // Adiciona no início
// lista.shift(); // Remove do início

// console.log(lista.includes("Maça")); // true
// console.log(lista.indexOf("Laranja")); // 2
// console.log (lista.lenghth); // Tamanho da arraay

//---------------------------------------------------------------------------------------------


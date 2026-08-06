// LISTA EXERCÍCIO JAVASCRIPT

// 1 

// let num1 = 3
// let num2 = 5

// num = num1 + num2
// {
// console.log (num);
// }

//------------------------------------------------------------------

// 2

// let base = 5
// let altura = 7
// let area = 0 

// area = base * altura
// {
//     console.log(area)
// }

//------------------------------------------------------------------

// 3 

// let celsius = 30
// let fahrenheit = 0

// fahrenheit = (celsius * 9 / 5 + 32);

// {console.log("A temperatura é de", fahrenheit)}


//------------------------------------------------------------------

// 4

// let num1 = 5
// let num2 = 5
// let num3 = 10

// let conta = (num1 + num2 + num3);

// {
// console.log("A soma dos três números é de:", conta)

// }

//------------------------------------------------------------------

// 5

// let num1 = 5
// let num2 = 4

// let multiplicar = num1 * num2
// {
//     console.log("O resultado da multiplicação é:", multiplicar)
// }

//------------------------------------------------------------------

// 6

// let num1 = 0

// if (num1 >= 1) {
//     console.log("este é um número positivo")
// } else if (num1 <= -1 ) {
//     console.log("este é um número negativo")}
//     else {(num1 == 0 ) 
//         console.log("É o número 0")}

//------------------------------------------------------------------

// 7 


//  let idade = 18

//  if (idade >= 18 ) {
//      console.log("Você já é maior de idade") 
//  } else {" Você ainda é menor de idade"}

//------------------------------------------------------------------

// 8 

// let num1 = 2
// let verificacao = num1 % 2

// if (verificacao == 0 ) {
//     console.log("este é um número par")
// } else {console.log("este é um número impar")}

//------------------------------------------------------------------

// 9

// let nota1 = 8
// let nota2 =10

// let calculo = (nota1 + nota2) /2

// if (calculo >= 7) {
//     console.log("Aluno aprovado")
// } else {
//     console.log("Aluno reprovado")
// }

//------------------------------------------------------------------

//10

// let num1 = 10
// let num2 = 18
// let num3 = 20

// if (num1 > num2 && num1 > num3) {
//     console.log("O primeiro número é maior")
// } else if ( num2 > num1 && num2 > num3) {
//     console.log("O segundo valor é o maior")
// } else {(num3 > num1 && num3 > num2) 
//     console.log("O terceiro valor é o maior")
// }

//------------------------------------------------------------------

// 11

// let idade = 19

// if (idade <12) {
//     console.log("Você é uma criança")
// } else if (idade >=12 && idade <=17) {
//     console.log("você é um adolescente")
// } else if (idade >= 18 && idade <=59) {
//     console.log("você é um adulto")
// } else if(idade >= 60) {
//     console.log("você é um idoso")
// }

//------------------------------------------------------------------

//12

// let ano = 2025

// let verificar = ano % 4

// if (verificar == 0 ) {
//     console.log("É um ano bissexto")
// } else {
//     console.log("Não é um ano bissexto")
// }

//------------------------------------------------------------------

//13 

// let operacao = 3

// switch (operacao) {
//     case 1:
//     console.log("soma");
//     break
//     case 2:
//         console.log("subtração")
//         break
//     case 3:
//     console.log("multiplicação");
//     break
//     case 4:
//         console.log("divisão")
//         break
//}
//------------------------------------------------------------------

// 14

// let dia = 3;

// switch (dia) {
//     case 1:
//         console.log("Domingo");
//         break;
//     case 2:
//         console.log("Segunda-feira");
//         break;
//     case 3:
//         console.log("Terça-feira");
//         break;
//     case 4:
//         console.log("Quarta-feira");
//         break;
//     case 5:
//         console.log("Quinta-feira");
//         break;
//     case 6:
//         console.log("Secta-feira");
//         break;
//     case 7:
//         console.log("Sábado");
//         break;
        
// }


//------------------------------------------------------------------

// 15

// let dia = 3;

// switch (dia) {
//     case 10 && 9:
//         console.log("A");
//         break;
//     case 8 && 7:
//         console.log("B");
//         break;
//     case 6 && 5:
//         console.log("C");
//         break;
//     case 4 && 3:
//         console.log("D");
//         break;
//     case 2 && 1:
//         console.log("E");
//         break;
//     case 0:
//         console.log("F");
//         break;
    
// }




//------------------------------------------------------------------------------

// 16


// for (let i = 1; i <= 10; i++) {
//     console.log(i)
// }

//------------------------------------------------------------------------------

// 17


// var soma = 0

// for (let i = 1; i < 101; i++) {
//     let num = i;
//     var soma = soma + num;
// }
// console.log("O resultado é", soma)

//------------------------------------------------------------------------------

// var tabuada = 5

// for (let i = 1; i <11; i++){
//     var tabuada = 5
//     var tabuada = i * tabuada
//     console.log(tabuada)
//     var tabuada = 0
   
// }

//------------------------------------------------------------------------------

// let cont = 10
// while (cont >0) {
//     console.log(cont);
//     cont--
    
// }

//------------------------------------------------------------------------------


// for (i = 2; i <51; i= i+2 ) {
//     console.log(i)
// }

//------------------------------------------------------------------------------

// let numFatorial = 5;
// var resultado = 1;

// for (let i = numFatorial; i > 0; i--) {
//      var resultado = resultado * i;
//  }
// console.log("O resultado é de:", resultado)





//------------------------------------------------------------------------------

// let nome = ["ricardo", "josé","pedro", "monteiro", "rafifa" ] //declaração da variável e o que contém dentro dela

// for (let i = 0; i < 5; i++) {  // 
//     console.log(nome[i]);
// }
 

//------------------------------------------------------------------------------


// let numeros = [12, 45, 67, 23, 89, 34]
// let maior = numeros2[0]

// for (let i = 1; i < numeros.length; i++) {
//     if (numeros[i] > maior) {
//         maior = numeros2[i]
//     }
// }

// console.log("Maior número: ", maior)


//-----------------------------------------------------------------------

// let frutas = ["maçã", "banana", "uva", "laranja"]
// let procura = "banana"

// if (frutas.includes(procura)) {
//     console.log(procura + " está no array")
// } else {
//     console.log(procura, " não foi encontrada")
// }


//-----------------------------------------------------------------------

// let cores = ["roxo", "azul", "verde"]
// cores.push("preto")

// console.log(cores)


//-----------------------------------------------------------------------

// let animais = ["cachorro", "gato", "leão", "tubarão"]
// animais.pop()

// console.log(animais)








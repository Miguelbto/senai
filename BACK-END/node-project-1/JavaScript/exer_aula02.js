/*
console.log (`O resultado da soma é: ${soma(6,8)}`)

function soma(a, b) {
    return a + b
};
*/
//------------------------------------------------------------------------------------
/*
console.log (`O reusltado da média dessas três notas 7, 9, 10 desse aluno foi de: ${media(7,9,10)}`)

function media (a,b,c) {
    return (a + b + c) / 3
}
*/
//------------------------------------------------------------------------------------
/*
const areaTriangulo = function (a,b) {
    return (a * b) / 2
}

result = areaTriangulo(5,4)

console.log(`O resultado da área do triangulo é de: ${result}`)
*/
//------------------------------------------------------------------------------------
/*
let a = 2
validacao = function(a) {
    if (a % 2 == 0 ) {
        return console.log("Este é um número par")
    } else {
        return console.log("Este é um número impar")
    }
}

result = validacao(3)

*/

//------------------------------------------------------------------------------------
/*
let maior = (a,b) => {

    if (a > b) {
        return console.log(`O número ${a} é maior`)
    } else {
        return console.log (`O número ${b} é maior`)
    }

}

numMaior = maior(5,8)

*/
//incompleto---------------------------------------------------------------------------------
/*
let lista = [3, 5, 4,6,7,8]
num = lista

lista => {

    if (lista.forEach(num  => console.log(num)))

    return console.log([0,1,2,3,4,5] % 3 == 0 ) 
    
}

console.log(`O numeros pares são: ${lista[2,5,56,2,2]}`)
*/

//------------------------------------------------------------------------------------
/*
(function (){

    return console.log ("...")
})
()
*/
//------------------------------------------------------------------------------------
/*
num = 4

(function(){
    
    return console.log (`O Quadardo de é `, num*num)
})

() 
*/
//------------------------------------------------------------------------------------

    
function mensage(nome, callback) {
callback(nome);
}
mensage("Sinesio", (n) => {rever
console.log(Seja bem-vindo, ${n}!);
});



function aplicarCallback(array, callback) {
return array.map(callback);
}
const dobrar = num => num * 2;
console.log(aplicarCallback([1,2,3,4], dobrar)); // [2,4,6,8]
// Contagem regressiva de 10 até 1



function contagem(n) {
if (n === 0) return;
console.log(n);
contagem(n - 1);
}
contagem(10);
// 1. Aguarda 2 segundos e exibe mensagem



async function esperarMensagem() {
await new Promise(resolve => setTimeout(resolve, 2000));
console.log("Passaram 2 segundos!");
}
esperarMensagem();


// 2. Aguarda 1 segundo e retorna o dobro
async function dobrarNumero(num) {
await new Promise(resolve => setTimeout(resolve, 1000));
return num * 2;
}
dobrarNumero(5).then(res => console.log(res)); 



// 3. Simula consulta de usuário em 3 segundos
async function consultarUsuario() {
await new Promise(resolve => setTimeout(resolve, 3000));
console.log("Usuário encontrado!");
}














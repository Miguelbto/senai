
// const soma = function(a,b) {
//     return a + b
// }




 // console.log('O resultado da soma é ${soma(5, 5)}')


// function myFunction(p1, p2) {
//     return p1 * p2
// }

// log.cnsole



//------------------------------------------------------------------

// let soma = function(a,b) { //Função sem nome
//     return a+b
// }

// console.log(`O resultado da soma é ${soma(5,8)}`)


//-----------------------------------------------------

//----------------------------------------------------------------
/*
let soma = (a,b) => {return a + b }

console.log(`O resultado da soma é: ${soma(7,7)}`)
*/
//------------------------------------------------------
/*
(function(){

    return console.log('Hello word')
})()
*/

//------------------------------------------------------
/*
function executarCallback(callback){ //função passada como parâmetro
    callback()
}

executarCallback(() => {console.log(`Callback Executado`)})
*/
//------------------------------------------------------
/*

function executarOperacao(a,b, callback) {
    return callback(a,b);
}

function soma(x,y) {
    return x + y;
}

function multiplicar (x, y) {
    return x * y;
}

console.log (executarOperacao(2, 6, soma));
console.log (executarOperacao(2, 3, multiplicar));

*/
//------------------------------------------------------
/*
function fatorial(n){
    if (n === 0  || n === 1) {
        return 1;
    } else {
        return n * fatorial(n - 1);
    }
}

console.log(fatorial(1));
*/
//------------------------------------------------------
/*
async function buscarDados() {
    console.log("Iniciando a busca...");

    const resposta = await fetch ("https://viacep.com.br/ws/13324508/json/")

    const dados = await resposta.json();

    console.log("Dados recebidos:", dados);
}
buscarDados()

console.log("Essa mensagem aparece antes da resposta da API")
*/

//------------------------------------------------------










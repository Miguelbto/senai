
/* FUNÇÕES - EXERCÍCIO 1



function contadorVogais (text) {

    let contador = 0
    if  (text == "a" ) {
        contador ++ }
    if  (text == "e" ) {
        contador ++ }
    if  (text == "i" ) {
        contador ++ }
    if  (text == "o" ) {
        contador ++ }
    if  (text == "u" ) {
        contador ++ 
        }
    } 
    else {
        console.log('O texto inserido não contém nenhuma vogal')
    }

    return console.log(`O númerpo de vogais é de: ${contador}`)
}
console.log(contadorVogais("abcdeoi"))

*/


// CLASSES - EXERCÍCIO 1

/*
class Produto {
    constructor (nome, preco, estoque) {
        this.nome = nome 
        this.preco = preco 
        this.estoque = estoque 
    }

    venderQuantidade(x) {

        if (x <= this.estoque) {
            console.log(`A venda do estoque foi feita com sucesso agora restam ${this.estoque - x} produtos`)
        } else {
            console.log("O estoque não tem produtos suficientes para atender sua demanda")
        }

    }

}

let produto1 = new Produto ("Short", 200, 20)

produto1.venderQuantidade(24)

*/

// CLASSES - EXERCÍCIO 2

/*
class ContaEnergia {
    constructor (nome, consumoKwh, valorKwh) {
        this.nome = nome 
        this.consumoKwh = consumoKwh
        this.valorKwh = valorKwh
    }

    totalConta () {
        return console.log(`O valor da conta foi de: ${this.consumoKwh * this.valorKwh}`)
    }
}

let conta1 = new ContaEnergia ("Miguel", 300, 0.50)
conta1.totalConta()

*/

// CLASSES - EXERCÍCIO 3

class Aluno {
    constructor (nome, nota1, nota2, nota3) {
        this.nome = nome 
        this.nota1 = nota1
        this.nota2 = nota2
        this.nota3 = nota3 
    }

    media () {
        return (this.nota1 + this.nota2 + this.nota3) / 3 
    }

    aprovado () {
        if (this.media() >=7 ) {
            console.log("Aluno aprovado") } else {
                console.log("Aluno reprovado")
            }
        }
    
}

let aluno1 = new Aluno ("miguel", 8, 5, 10)
console.log(aluno1.media())
aluno1.aprovado()
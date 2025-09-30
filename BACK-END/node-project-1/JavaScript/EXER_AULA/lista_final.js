
 
//FUNÇÕES - EXERCÍCIO 1

/*

function contarVogais (str) {
    const vogais = "aeiou"
    let contador = 0 

    const strMinuscula = str.toLowerCase()

    for (let i = 0; i < strMinuscula.length; i++) {
        const caractere = strMinuscula[i]
        if (vogais.includes(caractere)) {
            contador ++
        }
    }

    return contador
}

const minhaString = "abcio"
const numeroDeVogais = contarVogais(minhaString)
console.log(`${minhaString} e ${numeroDeVogais}`)

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

/*
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

*/


// CLASSES - EXERCÍCIO 4
/*
class Cinema {
    constructor (nome, capacidade, ingressosVendidos) {
        this.nome = nome 
        this.capacidade = capacidade 
        this.ingressosVendidos = ingressosVendidos 
    }

    venderIngressos (x) {
        if (x <= this.capacidade - this.ingressosVendidos) {
            return console.log("Venda realizada com sucesso")
        } else {
            return console.log("A venda não foi feita por lugares insuficientes ")
        }
    }
}

let cinema1 = new Cinema ('Cinemark', 100, 50)
cinema1.venderIngressos(30)

*/

// CLASSES SIMPLES - EXERCÍCIO 5
// A FAZER
/*
class Biblioteca {
    constructor ([livros]) {
        this.livros = livros
    }

    adicionarLivro (livro) {
        this.livros.push(livro)
        return console.log("Livro adicionado")
    }

    removerLivro (livro) {
        this.livros.indexof(livro)
    }

    listarLivros () {
        return console.log(this.livros)
    }
}

let biblioteca1 = new Biblioteca (['livro1', 'livro2', 'livro3'])
biblioteca1.adicionarLivro('livro4')
biblioteca1.removerLivro('livro2')
biblioteca1.listarLivros()

*/

// ENCAPSULAMENTO - EXERCÍCIO 1
/*
class Cofrinho {
    #valor
    
    constructor ( valor) {
        this.#valor = valor         
    }

    setSacar (x) {
        if (x <= this.#valor) {
            return console.log(this.#valor - x)
        } else {
            console.log( "Saldo insuficiente")
        }
    }

    setDepositar (x) {
        if (x > 0) {
            console.log(`Deposito concluído ${this.#valor + x}`)
        } else {
            console.log("Valor depositado incorreto")
        }
    }

    getSaldo () {
        return console.log(this.#valor)
    }
}

let cofrinho1  = new Cofrinho (1000)
cofrinho1.setSacar(500)
cofrinho1.setDepositar(1000)
cofrinho1.getSaldo()  

*/
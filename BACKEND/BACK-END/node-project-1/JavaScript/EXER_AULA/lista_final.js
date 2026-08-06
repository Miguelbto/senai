
 
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


// FUNÇÃO - EXECÍCIO 3 

function filtrarlist(lista, callback) {
    lista.forEach(i => {      //for (let i  = 0; i < lista.lenght; i++)
        if (callback(i)) {    //  if (callback (lista[i])) {console.log(lista[i])}
            console.log(i)
        }
    })
} 

function primo(numero) {
    if (numero < 2 ) {
        return false 
    } 
    for (let i = 2; i < numero; i++){
        if (numero % i == 0 ) {
            return false 
        }
    }
    return true 
}

filtrarlist([1,23,4,5,56,3,5,7,4], primo)


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

// HERANÇA - EXERCÍCIO 1
/*
class Funcionario {
    constructor (nome, salarioBase) {
        this.nome = nome 
        this.salarioBase = salarioBase
    }

} 

class FuncionarioCLT extends Funcionario {
    constructor(nome, salarioBase, imposto = -0.10, comissao = 0.05 ) {
        super(nome, salarioBase)
        this.imposto = imposto 
        this.comissao = comissao
    }

    calcularSalarioLiquido() {
        return console.log(`O salário é de:${((this.salarioBase * this.imposto) + this.salarioBase) + (this.salarioBase * this.comissao) }`)
    }
}

let funcionarioclt1 = new FuncionarioCLT("joão", 1000)
funcionarioclt1.calcularSalarioLiquido()

*/

// POLIMORFISMO - EXERCÍCIO 1
//INACABADO
/*
    class Imposto {
        
        calcular(valor) {
            return valor 
        }
    }
class ICMS extends Imposto {
    
    calcular (valor) {
        return (valor * -0.18) + valor
    }
}

class ISS extends Imposto {
    calcular(valor) {
        return (valor * -0.05) + valor
    }
}

class IRPF extends Imposto {
    calcular(valor) {
        if (valor <= 2000) {
            return console.log(`Você está insento de imposto`)
        } if (valor >= 2001 && valor <= 5000) {
            return console.log(`${valor * -0.15}`)
        } if (valor > 5000) {
            return console.log(`${valor * -0.275}`)
        }
        }
}

let iss1 = new ISS 
console.log(`${iss1.calcular(1000)}`) 

*/



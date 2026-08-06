/*

class Produto {
    constructor (name, preco, quantidadeEstoque) {
        this.name = name 
        this.preco = preco
        this.quantidadeEstoque = quantidadeEstoque
    }

    calcule () {

        console.log (this.preco * this.quantidadeEstoque)
    

    }
}

const myProduto1 = new Produto("Tênis", 214, 3)
myProduto1.calcule()
*/
//------------------------------------------------------------------------

/*

class Filme {
    constructor (titulo, diretor, anoDeLancamento) {
    this.titulo = titulo
    this.diretor = diretor
    this.anoDeLancamento = anoDeLancamento

    }


    exibir () {
        
        console.log(`O filme ${this.titulo} foi lançado em ${this.anoDeLancamento} e dirigido por ${this.diretor}`)
    }

}

const myFilme1 = new Filme("Matrix", "Wachowski", 1999)
myFilme1.exibir()

*/

//----------------------------------------------------------------------------------------

/*

class Aluno{
    constructor (nome, nota1, nota2 ) {
        this.nome = nome
        this.nota1 = nota1
        this.nota2 = nota2 
    }



    exibir () {

       const media = (this.nota1 + this.nota2) / 2

        let validacao;
        if (media >= 7) {
            validacao = "Aprovado";
        } else {
            validacao = "Reprovado";
        }

        console.log (`Parabens ${this.nome} você foi ${validacao} com a nota ${media} `)
    }

}
const myAluno1 = new Aluno("Miguel", 8, 10)
myAluno1.exibir ()

*/
//---------------------------------------------------------------------------------------------

/*

class Retangulo {
    constructor (base, altura) {
        this.base = base 
        this.altura = altura
    }

    exibirECalcular () {

    let calcular = this.base * this.altura

     console.log (`A área do retângulo é de ${calcular} metros quadrados`)    }


}

myRetangulo = new Retangulo (8, 4)
myRetangulo.exibirECalcular ()

*/

//---------------------------------------------------------------------------------

/*

class Carro {
    constructor (marca, modelo, combustivel) {
        this.marca = marca
        this.modelo = modelo
        this.combustivel = combustivel
    }

    abastecer (y) {
       const abastecimento = (this.combustivel + (y))
        console.log (`Você tinha ${this.combustivel} litros de gasolina e depois do abstecimento tem ${abastecimento} litros em seu veículo`)
    }

    dirigir (x) {
        const consumo = (x) * 0.1
        console.log (`Você percorreu ${x} quilômetros e gastou ${consumo} litros de gasolina`)

    }

}

myCarro = new Carro ("Ferrari", "458 Itália", 20)
myCarro.abastecer(30)
myCarro.dirigir(5)

*/



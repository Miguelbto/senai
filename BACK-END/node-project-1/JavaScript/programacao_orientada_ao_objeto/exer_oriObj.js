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

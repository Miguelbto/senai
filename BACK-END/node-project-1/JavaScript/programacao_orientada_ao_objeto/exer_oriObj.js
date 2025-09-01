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


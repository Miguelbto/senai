/*
const estoque = {
            caixa: 50,
            palete: 10,
            empilhadeira: 2
          };

function verificarEstoque(produto, quantidade, callback) {
    return callback(produto, quantidade)
}
function conferir(produto, qtd) {
    if (estoque[produto] >= qtd) {
        return "pedido aprovado";
    } else {
        return "estoque insuficiente"
        
    }
}

console.log(verificarEstoque('caixa', 20, conferir))
console.log(verificarEstoque('Palete', 15, conferir))
console.log(verificarEstoque('empilhadeira', 5, conferir))
*/
/*

function verificarEstoque(produto, quantidade, callback) {
    if (callback(produto,quantidade)) {
        console.log(`Aprovado`)
    }
        
    };



function validacao (estoque, quantidade){
    if (quantidade <= estoque ) {
        return console.log('disponivel') 
    } else return console.log('indisponível') 

}

const estoque = {
            caixa: 50,
            palete: 10,
            empilhadeira: 2
};

verificarEstoque(caixa,10, callback)

*/


// EXERCÍCIO 2
/*
class Produto {
    constructor (nome, preco, quantidade) {
        this.nome = nome 
        this.preco = preco 
        this.quantidade = quantidade
    }

    valorTotal() {
        return this.preco * this.quantidade 
    }

    reporEstoque (quantidade) {
        return quantidade + this.quantidade 
    }
}

let produto1 = new Produto ('adidas', 200, 30)
console.log(produto1.valorTotal())
console.log(produto1.reporEstoque(10))
produto1.nome //entrega o nome do produto(pega o atributo individual indicado)

*/

// EXERCÍCIO 3

/*

class Pedido {
    constructor (numPedido, nameProduto, precoUni, quantidade) {
        this.numPedido = numPedido
        this.nameProduto = nameProduto
        this.precoUni = precoUni
        this.quantidade = quantidade
    }

    calcularPedido() {
        return console.log(`O seu pedido de número ${this.numPedido}, que é um ${this.nameProduto}, na quantidade de ${this.quantidade}, ficou com o total de:${this.precoUni * this.quantidade}R$`)
    }
}

let pedido1 = new Pedido (1,'Tênis', 240, 2)
pedido1.calcularPedido()

*/

// EXERCÍCIO 4 
/*
class Veiculo {
    constructor (placa, capacidade){
        this.placa = placa 
        this.capacidade = capacidade
    }
}

class Caminhao extends Veiculo {
    constructor (placa, capacidade, eixos, motorista) {
        super (placa, capacidade)
        this.eixos = eixos 
        this.motorista = motorista
    }

    transportar(carga) {
        if (carga <= this.eixos * 8000) {
            return console.log(`O transporte pode ser feito`)
        } else {
            return console.log(`O transporte não pode ser feito pelo excesso de carga`)
        }
    }
}

class Van extends Veiculo {
    constructor (placa, capacidade, motorista) {
        super(placa, capacidade)
        this.motorista = motorista
    }

    transportar(carga) {
        if (carga <= 5000) {
            return console.log("O transporte pode ser feito")
        } else {
            return console.log('O transporte não pode ser feito pelo excesso de carga')
        }
    }
}

let caminhao1 = new Caminhao('a9f900', 24000, 3, 'Joelson')
let van1 = new Van ('i8t8g08a', 5000, "Werdum")

caminhao1.transportar(20000)
van1.transportar(3000)

*/

// EXERCÍCIO 5
/*
class Funcionario {
    constructor (nome, salarioBase){
        this.nome = nome 
        this.salarioBase = salarioBase
    }

    calcularSalario(){
        return this.salarioBase
    }
}

class OperadorDeEmpilhadeira extends Funcionario  {
    constructor (nome, salarioBase, adicional = 1.10) {
        super (nome, salarioBase)
        this.adicional = adicional
    }

    calcularSalario() {
        return console.log(`O salário deste funcionario é de:${this.salarioBase * this.adicional}`)
    }
}

class GerenteDeLogistica extends Funcionario {
    constructor (nome, salarioBase, adicional = 2000) {
        super (nome, salarioBase)
        this.adicional = adicional
    }

    calcularSalario() {
        return console.log(`O salário do ${this.nome} é de:${this.salarioBase + this.adicional}`)
    }
}

let operadorDeEmpilhadeira1 = new OperadorDeEmpilhadeira("Tarantelo", 1000)
let gerenteDeLogistica1 = new GerenteDeLogistica("João", 4000)

operadorDeEmpilhadeira1.calcularSalario()
gerenteDeLogistica1.calcularSalario()

const funcionarios = [
    new OperadorDeEmpilhadeira("pedro", 3000),
    new GerenteDeLogistica("ana", 1000), 
    new Funcionario("joão", 1000)
]
    funcionarios.forEach(f => {
        console.log(`${f.nome} - Salário:R$ ${f.calcularSalario()}`)
    })
    
*/



// EXERCICÍO 6
/*
class Almoxerifado {
    #quantidade
    #nome
    constructor (nome, quantidade) {
        this.#quantidade = quantidade
        this.#nome = nome
    }

    set adicionarProduto (quantidade) {
        return console.log(`Foi adicionado ${quantidade}, assim o estoque tem ${quantidade + this.#quantidade}`)

    }

    set retirarProduto (quantidade) {
        if (quantidade <= this.#quantidade) {
            console.log(`foi retirado ${quantidade} quantidades do produto , e sobraram ${this.#quantidade - quantidade }`)
        } else { 
            return console.log(`O estoque não tem produtos suficientes`)
        }
    }

    get consultarEstoque() {
        return console.log(this.#nome, this.#quantidade)
    }
}

produto1 = new Almoxerifado('caixa', 20)
produto1.retirarProduto = 10
produto1.adicionarProduto = 30
produto1.consultarEstoque
*/

/*
const listaTransportes = [
        new Carro(),
        new Bicicleta(),
        new Aviao()
    ]

listaTransportes.forEach(transporte => {
    transporte.mover()
})

*/
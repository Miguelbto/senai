/*
const statusCargas = {
"BR12345": "Em trânsito para o centro de distribuição",
"BR67890": "Entregue ao destinatário",
"BR54321": "Aguardando retirada na agência"
};

function rastrearCarga (codigoRatreio, callback) {
    return callback(codigoRatreio)
}

function buscarCarga (codigoRatreio) {
    if (codigoRatreio in statusCarga ) {
        return statusCargas
    }
}

*/

/*

class itemEstoque {
    constructor(codigo, descricao, localizacao) {
        this.codigo = codigo
        this.descricao = descricao
        this.localizacao = localizacao
    }
    obterLocalizacao() {
        return console.log(this.localizacao)
    }
    AtualizarLocalizacao(novaLocalizacao) {
        this.localizacao = novaLocalizacao
        return console.log(this.localizacao)
        
    }
}

let itemestoque = new itemEstoque('123', 'coca-cola', 'corredor s, prateleira 9')
itemestoque.obterLocalizacao()
itemestoque.AtualizarLocalizacao('corredor 1, prateleira 2')
itemestoque.obterLocalizacao()

*/

/*

class RotadeEntrega {
    constructor (codigo, veiculo, destino){
    this.codigo = codigo
    this.veiculo  = veiculo
    this.destino = destino
    }
     RotaDeEntrega () {
    return console.log(this.destino)
}
    ResumoRotaEntrega (){
        return console.log(`
            Código: ${this.codigo}
            desino: ${this.destino}
            veiculo: ${this.veiculo}            
            `)
    }       
}

let rotadeEntrega1= new RotadeEntrega (658, "caminhonete", "AngraDosReis")
rotadeEntrega1.RotaDeEntrega()
rotadeEntrega1.ResumoRotaEntrega()

*/
/*
class Embalagem {
    constructor (id, pesoMaximo ) {
        this.id = id 
        this.pesoMaximo = pesoMaximo
    }
}

class Caixa extends Embalagem {
    constructor (id, largura, altura, profundidade, pesoMaximo = 25) {
        super (id, pesoMaximo = 25)
        this.largura = largura
        this.altura = altura
        this.profundidade = profundidade
    }

    podeConter (pesoitem) {
        if (pesoitem <= this.pesoMaximo) {
            return console.log("suporta")
        } else {
            return console.log('Não suporta')
        }
    }
}  

class Palete extends Embalagem {
    constructor (id, material, pesoMaximo = 1000) {
        super (id, pesoMaximo = 1000)
        this.material = material 
    }

    podeConter(pesoitem) {
        if (this.pesoMaximo >= pesoitem) {
            return console.log('suporta')
        } else {
            return console.log('não suporta')
        }
    }


}

let caixa1 = new Caixa (3, 20,40,50)
let palete1 = new Palete (6, 'madeira')

caixa1.podeConter(30)
palete1.podeConter(1000)

*/
/*
class Tarefa {
    constructor (descricao,responsavel) {
      this.descricao=descricao
      this.responsavel=responsavel
    }


    tempoestimado(){
            return console.log(`teste`)
        }

}

class SepararPedido extends Tarefa {
    constructor (quantidadeItens, responsavel,descricao){
        super(descricao, responsavel)
        this.quantidadeItens = quantidadeItens
        
        
    }

    tempoestimado() {
            return console.log(this.quantidadeItens * 5)
        }
}

class ConferirCarga extends Tarefa {
    constructor(descricao,responsavel){
        super(descricao, responsavel)
        
    }

    tempoestimado() {
            return console.log( `60 minutos`)
        }

}



const listacargas = [
        new ConferirCarga('conferir carga', 'ANA'),
        new SepararPedido(15, 'ANA', 'separar pedido'),
    ]

listacargas.forEach(cargas => {
    cargas.tempoestimado()
})
*/
/*

class Almoxerifado {
#quantidade
nome
    constructor (nome, quantidade) {
        this.#quantidade = quantidade
        this.nome = nome
    }
        set adicionarProduto(qtd) {
            return console.log (this.#quantidade += qtd)
        }

    
        set retirarProduto(qtd) {
            if (qtd <= this.#quantidade ) {
                return console.log(this.#quantidade -= qtd)
            } else {
                console.log('estoque insuficiente')
            }
        
        }

        get consultarEstoque () {
            return console.log(this.nome, this.#quantidade)
        }

}


let almoxerifado1 = new Almoxerifado('caixa', 50)
almoxerifado1.adicionarProduto = 20 
almoxerifado1.retirarProduto = 10
almoxerifado1.consultarEstoque

*/





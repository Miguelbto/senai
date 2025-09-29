
/*



class InstrumentoMusical {
	 tocar() {
		console.log(`emite um som genérico`)
	}
}

class Violao extends InstrumentoMusical {
	tocar () {
		console.log(`tchamtchamtcham`)
	}
}

class Piano extends InstrumentoMusical {
	tocar () {
		console.log(`tururururuurur`)
	}
}

let violao1 = new Violao
violao1.tocar()

let piano1 = new Piano
piano1.tocar()

*/
//----------------------------------------------------------------



/*

class Funcionario {
    nome
    salario
    constructor (nome, salario) {
        this.nome = nome
        this.salario = salario
    }
}

class Gerente extends Funcionario {
    constructor (nome, salario, bonus) {
    super(nome, salario)
    this.bonus = bonus}
    
}

let gerente1 = new Gerente ("joão", 1400, 30)
console.log (gerente1.bonus)

*/

//--------------------------------------------------------------------------

/*

class Veiculo {
    constructor (marca, ano) {
        this.marca = marca
        this.ano = ano
    }
}

class Carro extends Veiculo {
    constructor (marca, ano, portas) {
        super(marca, ano)
        this.portas = portas 
    }
}

class Moto extends Veiculo {
    constructor (marca, ano, cilindradas) {
        super (marca, ano)
        this.cilindradas
    }
}

let carro1 = new Carro("ferrari", 2025, 2)
let moto1 = new Moto("BMW", 2025, 1200)

console.log (carro1.ano)
console.log (moto1.ano)


*/

//------------------------------------------------------------------------------

// NÃO CONSEGUI FAZER, NÃO ESTOU ENTENDENDO NADA, REVISAR PARA FAZER DENOVO

/*

class Funcionario {
    constructor (salario, bonus) {
        this.salario = salario
        this.bonus = bonus
    }

    calcularSalario() {
        return this.salario + (this.salario * this.bonus)
    }
}

class Gerente extends Funcionario {
    
    constructor (salario, ) {
    this.salario = salario
    
    }

    super(salario) {salario, 0.30}

    calcularSalario () {
    return this.salario + (this.salario * 0.30 )
    }
        
}

class Desenvolvedor extends Funcionario {

    constructor (salario) {
    this.salario = salario
    
    }

    calcularSalario () {
    return this.salario + (this.salario * 0.20 )
    }
}

let gerente1 = new Gerente(1000)
let desenvolvedor1 = new Desenvolvedor(1000)

console.log (`O salário deste gerente é de ${calcularSalario(1000)}`)
console.log(`O salário deste gerente é de ${calcularSalario(1000)}`)


*/

//--------------------------------------------------------------------------------


/*


class ContaBancaria {
    constructor (titular, saldo) {
        this.titular = titular
        this.saldo = saldo
    }

    depositar (valor) {
        return this.saldo + valor

        }

    sacar (valor) {
        return this.saldo - valor
    }
}

class ContaCorrente extends ContaBancaria {
    constructor (titular, saldo) {
    super(titular, saldo)

    }

    sacar (valor) {
        return (this.saldo - valor) - 2
    }
}

class ContaPoupanca extends ContaBancaria {
    constructor (titular, saldo) {
        super (titular, saldo)
    }

    atualizarSaldo () {
        return this.saldo * 0.05 + this.saldo
    }

}

let conta1 = new ContaPoupanca ('Miguel', 100000)
let conta2 = new ContaCorrente ('Miguel', 1000)


console.log(`O valor da sua conta poupança nesse mês foi de: ${conta1.atualizarSaldo()}`)
console.log(`O valor da sua conta ao final ficou com ${conta2.sacar(50)} `)


*/
/*
class Produto {
    #nome
    #preco
    constructor (nome, preco) {
        this.#nome = nome 
        this.#preco = preco
    }

    get getNome() {
    return this.#nome
    }

    get getPreco() {
        return this.#preco
    }
}

let produto1 = new Produto ('Abidas', 200)

console.log(produto1.getNome)
console.log(produto1.getPreco)

*/


class Car { 
    #velocidade
    constructor (nome, velocidade){
        this.#velocidade = velocidade
        this.nome = nome 

    }

    set Acelerar (value) { 
        return this.velocidade = value 
        
        
    }

    set Frear (value) {
        return this.velocidade = value 
        
    }
}

let carro1 = new Car ('niaka', 50 )
carro1.Acelerar(10)























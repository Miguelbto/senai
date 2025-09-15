/*

const pessoa = {
	nome: "João",
	idade: 30 ,
	falar: function() {
		console.log(`Olá, meu nome é ${this.nome}`);
	}
};

pessoa.falar();

const pessoa2 = {
	nome: "Renato",
	idade: 37 ,
	falar: function() {
		console.log(`Olá, meu nome é ${this.nome}`);
	}
};

pessoa2.falar();

const pessoa3 = {
	nome: "Ana",
	idade: 26 ,
	falar: function() {
		console.log(`Olá, meu nome é ${this.nome}`);
	}
};

pessoa3.falar();
*/
//----------------------------------------------------------------
/*
class Pessoa {

	constructor (nome, idade) {
		this.nome = nome;
		this.idade = idade;
	}

*/

//---------------------------------------------------------------------------------------

/*

class Pessoa {

	constructor (nome, idade) {
		this.nome = nome;
		this.idade = idade;
	}
	
	saudacao() {
	return `Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.}`

*/

//-----------------------------------------------------------------------------------------

/*
class Pessoa {

	constructor (nome, idade) {
		this.nome = nome;
		this.idade = idade;
	}
	
	saudacao() {
	    return console.log(`Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`)
    }
}



// Criando um objeto a partir da classe Pessoa 
const pessoa1 = new Pessoa("João", 25);

// Chamando o método do objeto 
pessoa1.saudacao();

*/

/*
class Conta {
    constructor (titular, saldo) {
        this.titular = titular
        this.saldo = saldo

    }

    
    depositar (valor) {
            this.saldo += valor
            console.log(`Deposito realizado. Saldo atual: R$${this.saldo}`)
        
        }
    
    }

    sacar(valor) {
        if(valor <= this.saldo) {
        this.saldo -= valor
        console.log(`Saque realizado.Saldo atual: ${this.saldo}`)
        }
        else {
            console.log(`Saldo insuficiente`)
        }
    }

}

let conta1 = new Conta("Celso", 0 )

conta1.depositar
*/
//---------------------------------------------------------------------------------

/*

// ENCAPSULAMENTO 

class ContaBancaria {
	#Saldo 
	numeroConta
	constructor (saldo, numeroConta) {
		this.#Saldo = saldo  // A propriedade saldo não é possivel acessar o atributo
		this.numeroConta = numeroConta 
	}

	get getSaldo() {return this.#Saldo}

	set setSaldo (value) { //está fazendo uma condição par verificar se o saldo é válido

		if(value != null && value > 0) {
			this.#Saldo = value 
		} else {
			console.log(`Saldo inválido`)
		}

	}

}

let conta = new ContaBancaria(1000,`r2d2`)

console.log (conta.numeroConta)
console.log(conta.getSaldo)

console.log (conta.getSaldo)
conta.getSaldo = 1500   // o get não consegue alterar nenhum valor, apenas usado para exibir
console.log(`saldo alterado pelo get: ${conta.getSaldo}`)

conta.setSaldo = -1500000
console.log (`Saldo alterado pelo set: ${conta.getSaldo}`)

*/

//--------------------------------------------------------------------

/*

class Animal {
	constructor (nome) {
		this.nome = nome
	}
	FazerSom () {
		console.log(`Emite  um som genérico`)
	}
}
/*
class Cachorro extends Animal {}

class Cachorro extends Animal {
	FazerSom () {
		console.log(`Auau`)
	}
}

let cachorro1 = new Cachorro();
cachorro1.FazerSom()
*/
/*
class Cachorro extends Animal {
	constructor (nome) {
		super(nome)
	}
}

let cachorro = new Cachorro(`Rex`)
console.log (`Nome do cachorro: ${cachorro.nome}`)

*/



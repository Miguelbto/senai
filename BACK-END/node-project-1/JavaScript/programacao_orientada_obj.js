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


class Produto {
    constructor (name, preco, quantidadeEstoque) {
        this.name = name 
        this.preco = preco
        this.quantidadeEstoque = quantidadeEstoque
    }

    calcule (value) {


    }
}

const myProduto1 = new Produto("Tênis", 214, 3)



























/*================================================================================
EXERCÍCIO 1 - CLASSE SIMPLES (Pessoa)

Enunciado:
Crie uma classe chamada Pessoa que possua:
nome 
idade

Crie um método apresentar() que exiba no console o nome e a idade da pessoa.
================================================================================*/
/*
class Pessoa{
    constructor(nome, idade){
        this.nome = nome
        this.idade = idade
    }
    apresentar(){
        console.log(Nome: ${this.nome} | Idade: ${this.idade})
    }
}

const pessoa1 = new Pessoa("Eduardo",17)
pessoa1.apresentar()
*/
/*================================================================================
EXERCÍCIO 2 - CLASSE SIMPLES (Produto)

Enunciado: 
Crie uma Classe Produto com:
nome
preco 

Crie um método mostrarPreco() que exiba o nome do produto e seu preço.
================================================================================*/
/*
class Produto{
    constructor(nome, preco){
        this.nome = nome
        this.preco = preco
    }
    mostrarPreco(){
        console.log(Produto: ${this.nome} | Preço: R$${this.preco.toFixed(2)})
    }
}
const produto1 = new Produto("Melância", 3.90)
produto1.mostrarPreco()
*/
/*================================================================================
EXERCÍCIO 3 - HERANÇA (Funcionário)

Enunciado: 
Crie uma classe Funcionário com:
nome 

Crie uma classe Gerente que herda de Funcionário e possui:
setor

Crie um método que exiba o nome e o setor do gerente.
================================================================================*/
/*
class Funcionário{
    constructor(nome){
        this.nome = nome
    }

}
class Gerente extends Funcionário{
    constructor(nome, setor){
        super(nome)
        this.setor = setor
    }
    mostrarDados(){
        console.log(Nome: ${this.nome} | Setor: ${this.setor})
    }
}
const gerente1 = new Gerente ("Eduardo", "RH")
gerente1.mostrarDados()
*/
/*================================================================================
EXERCÍCIO 4 - HERANÇA (Veículo)

Enunciado: 
Crie uma classe Veículo com:
marca

Crie uma classe Carro que herda de Veículos e possui:
modelo

Crie um método que exiba a marca e o modelo do carro.
================================================================================*/
/*
class Veiculo{
    constructor(marca){
        this.marca = marca
    }
}
class Carro extends Veiculo{
    constructor(marca, modelo){
        super(marca)
        this.modelo = modelo
    }
    modeloCarro(){
        console.log(Marca: ${this.marca} | Modelo: ${this.modelo})
    }
}
const carro1 = new Carro ("Tesla", "Model X")
carro1.modeloCarro()
*/
/*================================================================================
EXERCÍCIO 5 - CLASSE SIMPLES (Livro)

Enunciado:
Crie uma classe conta onde:
-saldo seja atributo privado 
-exista um método depositar(valor) que adicione o valor ao saldo
-exista um metodo mostrarsaldo
================================================================================*/
/*
class Conta {
    #saldo
    constructor () {
        this.#saldo = 0
    }

    depositar(valor){
        if(valor < 0){
            console.log("Valor inválido")
        } else {
            this.#saldo += valor
        }
    }

    mostrarSaldo(){
        console.log(`Saldo: R$ ${this.#saldo}`)
    }

}

const conta1 = new Conta()
conta1.depositar(30)
*/
/*
EXERCÍCIO - ENCAPSULAMENTO (aluno)

Enunciado: Crie uma classe aluno onde: 
- a nota seja um atributo privado 
- exista um método definirNota(nota)
- existe um método mostrarNota()
*/
/*
class Aluno {
    #nota
    constructor(){
        this.#nota = 0
    }

    definirNota(nota) {
        if(nota < 0 ){
            console.log(`Nota inválida, tente novamente`)
        } if(nota > 10){
            console.log(`Nota inválida, tente novamente`)
        } else {
            console.log(this.#nota += nota)
        }
    }

    mostrarNota() {
        console.log(`Sua nota é: ${this.#nota}`)
    }
}

const aluno1 = new Aluno
aluno1.definirNota(10)
aluno1.mostrarNota()

*/



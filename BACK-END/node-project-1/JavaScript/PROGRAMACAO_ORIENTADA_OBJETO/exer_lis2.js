
//1

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

//2

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


//3


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
//4

/*
class Funcionario {
    constructor (nome, salario) {
        this.nome = nome 
        this.salario = salario
    }

    calcularSalario () {
        return this.salario
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
    constructor (nome, salario, bonus = 0.30) {
        super (nome, salario)
        this.bonus = bonus

    }

    calcularSalario () {
        return (this.salario * this.bonus) + this.salario
    }
    
}

class desenvolvedor extends Funcionario {
    constructor (nome, salario, bonus = 0.20) {
        super (nome, salario)
        this.bonus = bonus
    }

    calcularSalario () {
        return (this.salario * this.bonus) + this.salario
    }
}

let gerente1 = new Gerente ('Miguel', 2000)
console.log (`O salário desse gerente é de:${gerente1.calcularSalario()}`)

let dev1 = new desenvolvedor ('Ana', 3000, 0.20)
console.log(`O salário desse desenvolvedor é de:${dev1.calcularSalario()}`)

*/

//4


/*
class Funcionario {
    constructor (nome, salario) {
        this.nome = nome
        this.salario = salario
    }

    calcularSalario () {
        return this.salario
    }
}

class Gerente extends Funcionario {
    constructor (nome, salario, bonus = 0.30) {
        super (nome, salario) 
        this.bonus = bonus 
    }

    calcularSalario () {
        return (this.salario * this.bonus) + this.salario
    }
}

class Desenvolvedor extends Funcionario {
    constructor (nome, salario, bonus = 0.20) {
        super (nome, salario)
        this.bonus = bonus
    }

    calcularSalario () {
        return (this.salario * this.bonus) + this.salario
    }
}

let gerente1 = new Gerente ('Ana', 1000)
let desenvolvedor1 = new Desenvolvedor ('Ana', 1000)

console.log(`O salário desse gerente é de:${gerente1.calcularSalario()}`)
console.log(desenvolvedor1.calcularSalario())


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

//5

/*
class ContaBancaria {
    constructor (titular, saldo) {
        this.titular = titular 
        this.saldo = saldo 
    }

    depositar (value) {
        return this.saldo + value
    }

    sacar () {
        return this.saldo 
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
/*

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














        super (titular, saldo)
    }

     sacar (value) {
        return this.saldo - (value + 2)
     } 
}

class ContaPoupanca extends ContaBancaria {
    constructor (titular, saldo ) {
        super (titular, saldo)
    }

    atualizarSaldo () {
        return this.saldo * 1.05
    }
}

let contacorrente1 = new ContaCorrente ('Miguel', 1000)
let contapoupanca1 = new ContaPoupanca ('Ana', 1000)

console.log(contacorrente1.sacar(200))
console.log(contapoupanca1.atualizarSaldo())

*/

// ENCAPSULAMENTO

/*

class Produto {
    #nome
    #preco
    constructor (nome, preco) {
        this.#nome = nome
        this.setPreco(preco)
    }

    getNome () {
        return this.#nome
    }

    getPreco () {
        return this.#preco
    }

    setNome (newname) {
        this.#nome = newname
    }

    setPreco (newpreco) {
        if (newpreco >= 0) {
            this.#preco = newpreco
        } else {console.log('Preco invalido')}
    }
}

let produto1 = new Produto ('Tenis', 200)
console.log (produto1.getNome())
console.log(produto1.getPreco())

produto1.setNome('tenis Abidas')
produto1.setPreco(250)

console.log (produto1.getNome())
console.log(produto1.getPreco())

*/

//7

/*

class Carro {
    #velocidade 
    constructor (velocidade) {
        this.#velocidade = velocidade
    }

    getAcelerar () {
        return this.#velocidade + 10
    }

    getFrear () {
        if (this.#velocidade >= 10) {
         return this.#velocidade - 10}
         else {
            console.log('O carro não pode desacelerar ainda mais')
         }
    }
}

let carro1 = new Carro (5)
console.log(`A velocidade do carro após acelerar é de: ${carro1.getAcelerar()}`)
console.log(carro1.getFrear())


*/

//8

/*
class Conta {
    #saldo
    constructor (saldo) {
        this.#saldo = saldo
    }

    getSaldo () {
        return this.#saldo
    }

    setDepositar (newDeposito) {
        if (newDeposito > 0) {
            return this.#saldo + newDeposito
        } else {
            console.log('O número depositado é negativo, não foi possivel consluir está ação')
        }
    }

    setSacar (newSaque) {
        if (newSaque > 0 && newSaque <= this.#saldo) {
            return this.#saldo - newSaque
        } else {
            console.log('O valor do saque não pode ser efetuado por conta de saldo inválido')
        }

    }
}

let conta1 = new Conta (1000)
console.log (conta1.getSaldo())

console.log (conta1.setDepositar(-400))
console.log (conta1.setSacar (1600))

*/


//9


/*
class Usuario {
    #senha
    constructor (nome, senha) {
        this.nome = nome 
        this.#senha = senha
    }

    validarSenha (senhaDigitada) {
        if (senhaDigitada === this.#senha) {
            console.log('senha correta')
        } else { 
            console.log('A senha está inserida incorretamente')
        }
    }
}

let user1 = new Usuario ('Ana', 123)
console.log(user1.nome)
user1.validarSenha(123)


*/



//10


/*


class Retangulo {
    #largura 
    #altura 
    constructor (largura, altura) {
        this.#largura = largura 
        this.#altura = altura

    }

    getArea () {
        return this.#largura * this.#altura
    }

    getPerimetro () {
        return (this.#altura * 2) + (this.#largura * 2)
    }
 }


 let retangulo1 = new Retangulo (8,10)
 console.log(retangulo1.getArea())
 console.log(retangulo1.getPerimetro())

 */





// POLINMORFISMO


/*
class Forma {
    
    calcularArea () {
        return console.log('O método deve ser inserido para calcular')
    }
}

class Quadrado extends Forma {
    constructor (lado) {
        super ()
        this.lado = lado
    }

    calcularArea () {
        return this.lado * this.lado
    }

}

class Retangulo extends Forma {
    constructor (base, altura) {
        super () 
        this.base = base 
        this.altura = altura 
    }

    calcularArea () {
        return this.base * this.altura  
    }

}

class Circulo extends Forma {
    constructor (raio) {
        super ()
        this.raio = raio 
    }

    calcularArea () {
        return Math.PI * (this.raio * this.raio)

    }
}

let quadrado1 = new Quadrado (5)
let retangulo1 = new Retangulo (5,8)
let circulo1 = new Circulo (5)

console.log(quadrado1.calcularArea())
console.log(retangulo1.calcularArea())
console.log(circulo1.calcularArea())


*/

/*

class Funcionario {

    trabalhar () {
        console.log ('Este funcionario está fazendo...')
    }
}

class Professor extends Funcionario {

    trabalhar () {
        console.log ('Este professor está ministrando aulas e corrigindo provas')
    }

}

class Engenheiro extends Funcionario {

    trabalhar () {
        console.log('Este engenheiro está desenvolvendo projetos e supervisionando obras ')
    }
}


class Designer extends Funcionario {

    trabalhar () {
        console.log('Este designer está criando layouts e materias gráficos')
    }
}

let funcionario1 = new Funcionario
let professor1 = new Professor
let engenheiro1 = new Engenheiro 
let designer1 = new Designer 

funcionario1.trabalhar()
professor1.trabalhar()
engenheiro1.trabalhar()
designer1.trabalhar()

*/

/*
class Pagamento {

    realizarPagamento () {
        console.log('Qual método de pagamento você deseja?')
    }
}

class CartaoCredito extends Pagamento {

    realizarPagamento () {
        console.log('Em quantas vezes o(a) senhor(a) deseja parcelar?')
    }
}

class Boleto extends Pagamento {

    realizarPagamento () {

        console.log('O boeto foi gerafo para que o pagamento seja feito!')
    }
}

class Pix extends Pagamento {

    realizarPagamento () {
        console.log('O pagamento foi realizado via pix!')
    }
}

let pagamento1 = new Pagamento 
let cartaocredito1 = new CartaoCredito 
let boleto1 = new Boleto 
let pix1 = new Pix

pagamento1.realizarPagamento()
cartaocredito1.realizarPagamento()
boleto1.realizarPagamento()
pix1.realizarPagamento()


*/

/*

class Transporte {

    mover () {
        console.log('qual o meio de locomoção será utilizado?')
    }
}

class Carro extends Transporte {

    mover () {
        console.log('O carro anda pela etrada')
    }
}

class Bicicleta extends Transporte {
    mover () {
        console.log('A bicicleta anda por ciclovias e parques')
    }
}

class Aviao extends Transporte {

    mover () {
        console.log('O avião voa pelos céus')

    }
}


const listaTransportes = [
        new Carro(),
        new Bicicleta(),
        new Aviao()
    ]

listaTransportes.forEach(transporte => {
    transporte.mover()
})


*/

/*


class Mensagem {
    enviar () {
        console.log('Qual meio de comunicação você deseja utilizar?')
    }
}

class Email extends Mensagem {
    enviar () {
        console.log('O email acabou de ser enviado')
    }
}


class SMS extends Mensagem {
    enviar () {
        console.log ('O SMS foi enviado')
    }
}


class WhatsApp extends Mensagem {
        enviar () {
        console.log('A mensagem foi enviada pelo WhatsApp')
    }
}

const listaMensagens = [
    new Email (),
    new SMS (),
    new WhatsApp ()

]

listaMensagens.forEach (mensagem => {mensagem.enviar()})

*/









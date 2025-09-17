
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

class Funcionario {
    constructor (calcularSalario) {
        this.calcularSalario = calcularSalario
    }
}

class Gerente extends Funcionario {
    
    constructor ( salario, bonus) {
    this.salario = salario
    this.bonus = bonus
    
    }
    calcularSalario () {
        this.salario + this.bonus
    }

    }











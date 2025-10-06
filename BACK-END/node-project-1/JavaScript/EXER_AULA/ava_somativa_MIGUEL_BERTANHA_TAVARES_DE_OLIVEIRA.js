

//EXERCÍCIO 1
/*
const candidatos = {
ana: true,
bruno: false,
carla: true,
daniel: false
};


function verificarCandidato (nome, callback) {
    return callback(nome)
}

function candidato (nome) {
    if (candidatos[nome] == true) {
        return 'candidato aprovado'
    } else {
        return 'candidato reprovado'
    }
}

console.log(verificarCandidato('bruno',candidato))
console.log(verificarCandidato('carla',candidato))
console.log(verificarCandidato('daniel',candidato))
console.log(verificarCandidato('ana',candidato))

*/

//EXERCÍCIO 2 

/*
class Colaborador {
    constructor (nome, cargo, salario) {
        this.nome = nome 
        this.cargo = cargo 
        this.salario = salario
    }

    aumentarSalario (percentual) {
        return console.log (this.salario = (this.salario * ((percentual * 0.01) + 1)))
    }

    exibirDados () {
        return console.log(`
        Nome: ${this.nome}
        Cargo: ${this.cargo}
        Salário: ${this.salario}
        `)
    }

}

let colaborador1 = new Colaborador ('Irís', 'Gerente', 1000)
colaborador1.aumentarSalario(10)
colaborador1.exibirDados()
*/


//EXERCICÍO 3
/*
class FolhaDePagamento {
    constructor (nomeTrabalhador, cargo, salarioBase, diasTrabalhados) {
        this.nomeTrabalhador = nomeTrabalhador
        this.cargo = cargo
        this.salarioBase = salarioBase
        this.diasTrabalhados = diasTrabalhados
    }

    calcularSalarioMensal () {
        return this.salarioBase / 30 * this.diasTrabalhados
    } 

    resumo() {
    return console.log(`
        Nome Do Colaborador: ${this.nomeTrabalhador}
        Cargo: ${this.cargo}
        Dias Trabalhados: ${this.diasTrabalhados}
        Valor a receber: ${this.calcularSalarioMensal().toFixed(2)}
        `)
    }
}


let folhaDePagamento1 = new FolhaDePagamento('jobison', 'analista de desempenho', 1000, 10)
folhaDePagamento1.resumo()
*/

//EXERCICÍO 4
/*
class Contrato {
    constructor (colaborador, dataInicio, tipo, salarioBase){
        this.colaborador = colaborador
        this.dataInicio = dataInicio
        this.tipo = tipo
        this.salarioBase = salarioBase
    }

    calcularSalario() {
        return console.log(this.salarioBase)
    }
}

class CLT extends Contrato {
    constructor (colaborador, dataInicio, tipo, salarioBase, bonus) {
        super(colaborador, dataInicio, tipo, salarioBase)
        this.bonus = bonus
    }

    calcularSalario(bonus) {
        if (bonus > 15) {
            return console.log("O percentual não pode passar de 15%, insira novamente um percentual mais baixo")
        } else {
            return console.log (this.salarioBase = (this.salarioBase * ((bonus * 0.01) + 1)))
        }
    }

    detalhesContrato(){
        return console.log(`
        Colaborador: ${this.colaborador}
        Data de Inicio: ${this.dataInicio}
        Tipo: ${this.tipo}
        Salario Base: ${this.salarioBase}
            `)
    }

}

class Estagiario extends Contrato {
    constructor (colaborador, dataInicio, tipo, salarioBase, horasSemanais) {
        super(colaborador, dataInicio, tipo, salarioBase)
        this.horasSemanais = horasSemanais
    }

    calcularSalario() {
        return console.log (this.salarioBase += (this.horasSemanais * 20))

    }

    detalhesContrato(){
        return console.log(`
        Colaborador: ${this.colaborador}
        Data de Inicio: ${this.dataInicio}
        Tipo: ${this.tipo}
        Salario Base: ${this.salarioBase}
            `)
    }

}

let clt1 = new CLT ('daniel', '12/03/2001', 'analista', 1000)
let estagiario1 = new Estagiario ('joão', '21/05/2003', 'produtor', 1000, 10)
clt1.calcularSalario(10)
estagiario1.calcularSalario()
clt1.detalhesContrato()
estagiario1.detalhesContrato()

*/

// EXERCICÍO 5
/*
class Funcionario {
    constructor (nome, salarioBase) {
        this.nome = nome 
        this.salarioBase = salarioBase
    }

    calcularSalario() {
        return this.salarioBase
    }
}

class AssistenteRH extends Funcionario {
    constructor (nome, salarioBase, bonus = 1.05) {
        super(nome, salarioBase)
        this.bonus = bonus
    }

    calcularSalario() {
        return this.salarioBase * this.bonus
    }

}

class AnalistaRH extends Funcionario {
    constructor (nome, salarioBase, bonus = 1.15) {
        super(nome, salarioBase)
        this.bonus = bonus
    }

    calcularSalario() {
        return this.salarioBase * this.bonus
    }

}

class GerenteRH extends Funcionario {
    constructor (nome, salarioBase, bonus = 3000) {
        super(nome, salarioBase)
        this.bonus = bonus
    }

    calcularSalario() {
        return this.salarioBase += this.bonus
    }

}

const funcionarios = [
    new AnalistaRH('JJ', 1000),
    new AssistenteRH('AA', 1000),
    new GerenteRH('GG', 1000),
    new AnalistaRH('oo', 1000),
    new AssistenteRH('pp', 1000),
]

funcionarios.forEach(f => {
    console.log(`${f.nome} - Salário: R$${f.calcularSalario()}`)
})

*/

//EXERCICÍO 6
/*

class BancoDeHoras {
    #horas
    colaborador
    constructor (colaborador, horas) {
        this.#horas = horas
        this.colaborador = colaborador
    }

    adicionarHoras(qtd) {
        return console.log(this.#horas += qtd)
    }

    retirarHoras (qtd) {
        if (qtd <= this.#horas) {
        return console.log(this.#horas -= qtd)
        } else {
            return console.log("Saldo de horas inválido")
        }

    }

    consultarHoras(){
        return console.log(this.#horas)
    }
}

let bancodehoras1 = new BancoDeHoras('Miguel', 20)
bancodehoras1.adicionarHoras(10)
bancodehoras1.retirarHoras(15)
bancodehoras1.consultarHoras()

*/









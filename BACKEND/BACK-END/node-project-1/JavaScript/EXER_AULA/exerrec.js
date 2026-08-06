/*
 Exercício 1: Classe simples – Controle de Gastos
 */
class Gasto {
  // O construtor é chamado quando criamos uma nova instância (objeto) da classe
  constructor(descricao, valor, categoria) {
    this.descricao = descricao;
    this.valor = valor;
    this.categoria = categoria;
  }

  // Método da classe
  detalhes() {
    console.log(
      `Despesa: ${this.descricao} - Valor: R$${this.valor} - Categoria: ${this.categoria}`
    );
  }
}

const gasto1 = new Gasto('Supermercado', 250, 'Alimentação');
const gasto2 = new Gasto('Conta de Luz', 180, 'Moradia');

gasto1.detalhes(); 
gasto2.detalhes(); 

/*
 * Exercício 2: Encapsulamento – Conta Bancária
 */
class ContaBancaria {
  // Atributos privados são definidos com '#'
  #titular;
  #saldo;

  constructor(titular, saldoInicial = 0) {
    this.#titular = titular;
    this.#saldo = saldoInicial;
  }

  // Método para adicionar ao saldo
  depositar(valor) {
    if (valor > 0) {
      this.#saldo += valor;
      console.log(
        `Depósito de R$${valor} realizado. Novo saldo: R$${this.#saldo}`
      );
      return this.#saldo;
    } else {
      console.log('Valor de depósito inválido.');
      return this.#saldo;
    }
  }

  // Método para retirar do saldo
  sacar(valor) {
    if (valor > 0 && valor <= this.#saldo) {
      this.#saldo -= valor;
      console.log(
        `Saque de R$${valor} realizado. Novo saldo: R$${this.#saldo}`
      );
      return this.#saldo;
    } else if (valor > this.#saldo) {
      console.log(
        `Saldo insuficiente. Tentativa de sacar R$${valor}, saldo atual R$${this.#saldo}`
      );
      return this.#saldo;
    } else {
      console.log('Valor de saque inválido.');
      return this.#saldo;
    }
  }

  // Método para exibir o saldo (getter)
  verSaldo() {
    console.log(`O saldo atual da conta de ${this.#titular} é R$${this.#saldo}`);
    return this.#saldo;
  }
}



const minhaConta = new ContaBancaria('João Silva', 1000);

minhaConta.verSaldo(); 
minhaConta.depositar(500); 
minhaConta.sacar(300); 
minhaConta.sacar(1500); 
minhaConta.verSaldo(); 



 /* Exercício 3: Herança, Polimorfismo – Tipos de Investimento*/
 


class Investimento {
  constructor(valorInicial) {
    this.valorInicial = valorInicial;
  }

  // Método base (polimorfismo)
  calcularRendimento(anos) {
    // A classe base não tem rendimento
    return `Investimento inicial de R$${this.valorInicial} sem rendimentos por ${anos} anos.`;
  }
}

// 3.2 Subclasse Poupança
class Poupanca extends Investimento {
  constructor(valorInicial) {
    // 'super' chama o construtor da classe pai (Investimento)
    super(valorInicial);
    this.taxaAnual = 0.08; // 8%
  }

  // Sobrescrevendo o método (polimorfismo)
  calcularRendimento(anos) {
    // Aplicando juros compostos: M = C * (1 + i)^t
    const montante = this.valorInicial * Math.pow(1 + this.taxaAnual, anos);
    return `Investimento inicial de R$${
      this.valorInicial
    } em Poupança por ${anos} anos resulta em R$${montante.toFixed(2)}`;
  }
}

// 3.3 Subclasse CDB
class CDB extends Investimento {
  constructor(valorInicial) {
    super(valorInicial);
    this.taxaAnual = 0.12; // 12%
  }

  calcularRendimento(anos) {
    // Aplicando juros compostos: M = C * (1 + i)^t
    const montante = this.valorInicial * Math.pow(1 + this.taxaAnual, anos);

    // .toFixed(2) formata o número para 2 casas decimais
    return `Investimento inicial de R$${
      this.valorInicial
    } em CDB por ${anos} anos resulta em R$${montante.toFixed(2)}`;
  }
}

const valor = 1000;

const invGenerico = new Investimento(valor);
const invPoupanca = new Poupanca(valor);
const invCDB = new CDB(valor);

console.log(invGenerico.calcularRendimento(2));

console.log(invPoupanca.calcularRendimento(2));

console.log(invCDB.calcularRendimento(2));


function soma(a, b) {
  return a + b;
}

function subtrai(a, b) {
  return a - b;
}

function multiplica(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error('Nao e possivel dividir por zero');
  return a / b;
}

function ehPar(n) {
  return n % 2 === 0;
}

function raiz(n) {
  if (n < 0) throw new Error('Nao e possivel calcular raiz de numero negativo');
  return Math.sqrt(n);
}

function media(numeros) {
  if (!Array.isArray(numeros) || numeros.length === 0) {
    throw new Error('A lista de numeros nao pode ser vazia');
  }
  return numeros.reduce((total, n) => total + n, 0) / numeros.length;
}

module.exports = { soma, subtrai, multiplica, divide, ehPar, raiz, media };

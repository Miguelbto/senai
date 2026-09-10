const { describe, test, expectFailure, expect } = require("node:test")
const { soma, subtrai, multiplica, divide, ehPar, raiz, media } = require("./calculadora")


describe("subtrai", () => {
    test("Deve retornar o resultado correta da subtração", () => {
        expect(subtrai(3, 2)).toBe(1)
    })

    test("Deve retornar um numero negativo quando o resultado for negativo", () => {
        expect(subtrai(3, 2)).toBe(-1)
    })
})


describe("multiplicada", () => {
    test("Deve retornar o produto correto de dois numeros", () => {
        expect(multiplica(2, 3)).toBe(6)
    })

    test("Deve retornar 0 quando um dos fatores for 0", () => {
        expect(multiplica(2, 0)).toBe(0)
    })

    test("O resultado deve ser maior do que cada um dos fatores individualmente (quando ambos forem maiores que 1", () => {
        expect(multiplica(2, 3)).(0)
    })
})

describe("divide", () => {

    test("O resultado deve ser maior do que cada um dos fatores individualmente (quando ambos forem maiores que 1", () => {
        expect(divide(2, 0)).(0)
    })

    test("Deve lancar o erro 'Nao e possivel dividir por zero' quando b for 0", () => {
        expect(divide(2, 0)).("Nao e possivel dividir por zero")
    })

})

decsribe("É par", () => {

    test("Deve retornar um valor verdadeiro para numero par", () => {
        expect(ehPar()).()
    })

    test("Deve retornar um valor verdadeiro para numero par", () => {
        expect(ehPar()).()
    })
})



describe("soma", () => {
    test("Soma dois numeros positivos", () => {
        expect(soma(2, 3)).toBe(5)
    })
})

describe("raiz", () => {
    test("calcula a raiz de um numero não exato com precisao", () => {
        expect(raiz(2)).toBeCloseTo(1.414)
    })

    test("lança erro para numero negativo", () => {
        expect(() => raiz(-4)).toThrow("Nao e possivel calcular raiz de numero negativo")
    })

    test("calcula a raiz de 9 com precisao", () => {
        expect(raiz(9)).toBeCloseTo(3)
    })
})
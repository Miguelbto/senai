# -*- coding: UTF-8 -*-


print("Me fale a quantidade de horas que você trabalha que direi se irá descontar uma porcentagem de seu salário")
horas = float (input("Digite a quantidade de horas trabalhada: "))
salario = horas * 19.50

if salario <1499.00:
    print("A empresa não irá descontar nada de seu salário")

else:
    print("A empresa irá descontar 10% de seu salário para o imposto de renda")
    conta = salario * 10 / 100
    conta2 = salario - conta
    print("Seu salário será de: ", conta2)

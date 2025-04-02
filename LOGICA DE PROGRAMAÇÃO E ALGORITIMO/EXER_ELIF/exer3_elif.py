# -*- coding: UTF-8 -*-

print("insira abaixo dois valores diferentes")
v1 = float(input("valor1:"))
v2 = float(input("valor2:"))
operacao = input("informe qual operação entre essas quatro vc deseja fazer, soma, subtração, divisão, multiplicação:")
if operacao == "soma":
    print("o resultado da soma foi:", v1 + v2)
elif operacao == "subtracao":
    print("o resultado da subtração foi:", v1 - v2)
elif operacao == "divisao":
    print("o resultado da divisão foi:", v1 / v2)
elif operacao == "multiplicacao":
    print("o resultado da multiplicação foi:", v1 * v2)
    

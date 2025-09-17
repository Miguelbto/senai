#-*-coding: UTF-8-*-

"""
Escreva um programa que solicite o nome e o salário de um funcionário. Se o salário for menor
que R$3000, aplique um aumento de 10%; caso contrário, aplique um aumento de 5%.
Exiba o novo salário.

Entrada:

Uma string representando o nome do funcionário e um número real representando o salário.

Saída:

O novo salário do funcionário.

*
"""

print("informe seu nome,e o valor de seu salário, para que eu calcule o aumento dele")

nome = input("digite seu nome: ")
sala = float(input("insira seu salário"))

if sala < 3000:
    cont1 = sala / 100 * 10 + sala
    print(f"O novo salário de {nome} é {cont1}reais, com 10% de aumento")

else:
    cont2 = sala / 100 * 5 + sala
    print(f"O novo salário de {nome} é {cont2}reais, com 5% de aumento")


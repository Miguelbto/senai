'''
3 - Solicitar a idade de várias pessoas e imprimir: Total de pessoas com menos de
21 anos. Total de pessoas com mais de 50 anos. O programa termina quando idade
for = -99.
'''
#-*- coding: UTF-8 -*-
#codigo para ver a quantidade de pessoas com a idade inferior a 21 e superior a 50
idade_21 = 0
idade_50 = 0
while True:
    num = int(input("Diga-me a idade de alguem. caso você digite -99, o programa irá acabar."))
    if num == -99:
        break
    if num < 21:
        idade_21 = idade_21 + 1
    elif num > 50:
        idade_50 = idade_50 + 1
print(f"o número de pessoas com idade inferior a 21 é de: {idade_21} e a quantidade de pessoas com a idade superior a 50 é: {idade_50}")

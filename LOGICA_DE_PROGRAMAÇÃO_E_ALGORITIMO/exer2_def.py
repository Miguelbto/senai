# -*- coding: UTF-8 -*-

'''
Faça um programa com uma função que receba dois
números e retorne True se o primeiro número for
múltiplo do segundo.
'''

print("mê dê dois números para que eu informe se ele é multiplo do sgundo ou não")

v1 = int(input("insira o primeiro valor: "))
v2 = int(input("insira o segundo valor"))

def multiplo(v1,v2):
    soma1 = v1 % v2
    if soma1 == 0:
        return "true"
    else:
        print("false")

print(multiplo(v1,v2))
    

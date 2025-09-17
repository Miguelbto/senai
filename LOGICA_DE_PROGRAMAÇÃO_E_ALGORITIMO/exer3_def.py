# -*- coding: UTF-8 -*-

'''
Faça um programa com uma função que receba o lado
(l) de um quadrado e retorne a sua área (A = lado2).
'''

print("me informe o lado de um quadrado, para que eu dê o resultado da área ")

lado = int(input("coloque o valor do lado do quadrado: "))

def area_q(x):
    soma1 = lado * lado
    return f"o resultado da área do quadrado é de:{soma1} "

print(area_q(lado))

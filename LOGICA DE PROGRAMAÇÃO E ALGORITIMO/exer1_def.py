# -*- coding: UTF-8 -*-

'''
Faça um programa com uma função que retorne o
maior de dois números.
'''

print("insira dois valores para que eu retorne o maior dentre eles")

def contamaior():
    x = int(input("Digite um valor: "))
    y = int(input("Digite o seundo valor: "))
    if x > y:
        print(f"{x} é maior que {y}")
        return contamaior()
    elif y > x:
        print(f"{y} é maior que {x}")
        return contamaior()
    else:
        print("erro")
        return contamaior
print(contamaior())

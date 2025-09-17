# -*- coding: UTF-8 -*-

print ("insira um número para que eu informe se ele é perfeito ou não")

n1 = int(input("coloque o número: "))
soma = 0


def perfeito(x):
    for i in range(1,n1):
        if n1 % i == 0:
            soma = soma + i
    if soma == n1:
        print("é um número perfeito")
    else:
        print("não é um número perfeito")

perfeito(n1)

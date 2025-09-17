# -*- coding: UTF-8 -*-

n1 = int(input("insira um número para que eu verifique se ele é primo ou não: "))


def num_primo(n1):
    if n1 <= 0:
        return "o número que vc digitou está errado"

    for v in range (2,n1):
    
        if n1 % 2 == 0:
            return "Este não é um número primo" 
    return "é um número primo"

print (num_primo(n1))

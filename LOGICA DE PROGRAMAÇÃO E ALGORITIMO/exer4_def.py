# -*- coding: UTF-8 -*-

print ("me informe as medidas pedidas do triângulo, para que eu encontre sua área")

base = int(input("base do triângulo:"))
altura = int(input("altura do triângulo:"))

soma = base * altura / 2

def cont(a):
    global soma
    soma2 = soma * 3
    return f"A área do triângulo é de: {soma2}" 

print(cont(base))



#depois multiplicar por tres o resultado

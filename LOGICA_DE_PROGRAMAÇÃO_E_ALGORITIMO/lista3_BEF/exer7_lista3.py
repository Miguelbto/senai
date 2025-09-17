# -*- coding: UTF-8 -*-

operadores = input("insira qual operação matematica você quer realizar, para adição(a), subtração(s), multiplicação(m), e divisão(d): ")
v1 = float(input("Primeiro valor: "))
v2 = float(input("Segundo valor: "))


def som(x,y):
    cont1 = x + y
    print(f"a soma desses números são de: {cont1}")

def sub(x,y):
    cont1 = x - y
    print(f"a subtração desses números são de: {cont1}")
    

def mult(x,y):
    cont1 = x * y
    print(f"a multiplicação desses números são de: {cont1}")

def divi(x,y):
    cont1 = x / y
    print(f"a divisão desses números são de: {cont1}")



if operadores == "a" or operadores == "A":
    som(v1,v2)

elif operadores == "s" or operadores =="S":
    sub(v1,v2)
    
elif operadores == "m" or operadores =="M":
    mult(v1,v2)

elif operadores == "d" or operadores =="D":
    divi(v1,v2)

  

# -*- coding: UTF-8 -*-

print("me informe a altura e o raio de um cilindro, para que eu imprima seu volume: ")

altura = float(input("insira a altura do cilindro: "))
raio = float(input("insira o raio do cilindro"))

def cal(v1,v2):
    soma1 = 3.14 * (raio*raio) * altura
    print(" o valor do volume é %.2f de: " % soma1) 
    #return f" o valor do volume é de: {soma1} "

#print(cal(altura,raio))
cal(altura,raio)



# -*- coding: UTF-8 -*-

print("entre com valores positivos, eu contarei quantos foram digitados")
cont = 0
while True:
    valor = int(input("Digite um valor: "))
    if valor < 0:
        print("Você escolheu sair!")
        print("A quantidade de valores contados foi: ", cont)
        break
    cont = cont + 1

# -*- coding: UTF-8 -*-



maior = 0
menor = 0

while True:
    
    num = int(input("Digite um número, fale um negativo para sair: "))
    if num < 0:
        break
    if maior == 0 or num > maior:
        maior = num
    if menor == 0 or num < menor:
        menor = num
print(f"o menor número é: {menor} e o maior é o {maior}")

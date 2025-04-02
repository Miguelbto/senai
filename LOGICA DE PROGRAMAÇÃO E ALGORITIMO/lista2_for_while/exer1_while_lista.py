# -*- coding: UTF-8 -*-



print("vamos fazer a média dos números,caso queira parar digite um numero negativo")
ac = 0 
co = 0 
while True:
   soma = int(input("Diga aqui o valor que você deseja fazer a média: "))
   if soma < 0:
        break
   ac = ac + 1
   co = co + soma
print("A soma dos valores é:", co)
print("A média dos valores é:", co/ac)

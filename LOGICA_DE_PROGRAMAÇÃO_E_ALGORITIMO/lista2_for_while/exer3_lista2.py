# -*- coding: UTF-8 -*-



acum = 1 
print(" insira um número para que eu fatore ele")
valor = int(input("qual o números que deseja faturar"))
for v in range(1, valor +1):
    acum = acum * v
    print(" o valor da fatoração foi de: ", acum)
    

# -*- coding: UTF-8 -*-

print("informe a categoria de 1 a 3 do seu produto:")

produto = int(input("categoria: "))

if produto == 1:
    print("o seu produto vale 10 reais")
elif produto == 2:
    print("o seu produto vale 15 reais")
elif produto == 3:
    print("o seu produto vale 20 reais")
else:
    print("digitou o número invalido")
    

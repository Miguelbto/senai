# -*- coding: UTF-8 -*-

print("Me de dois números inteiro e direi se poderá ser dividido")
vlr = float (input("Digite o primeiro número: "))
vlr2 = float (input("Digite o segundo número: "))

if vlr2 > 0:
    print("Seu número é divisível")
    conta = vlr / vlr2
    print("Seu resultado é de: ", conta)

else:
    print("Seu número não é divisível")

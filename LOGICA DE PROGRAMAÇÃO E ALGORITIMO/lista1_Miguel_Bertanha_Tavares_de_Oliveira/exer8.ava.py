# -*- coding: UTF-8 -*-


print("Me informe seu salário para fazer sua aprovação do empréstimo")
vlr = float (input("Digite o valor da parcela de seu empréstimo: "))
slr = float (input("Digite seu salário: "))
cnt = slr * 30 / 100

if cnt > vlr:
             print("Seu empréstimo foi aprovado")

else:
    print("Seu empréstimo foi negado")


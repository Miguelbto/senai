# -*- coding: UTF-8 -*-

print(" insira três notas e o número de faltas para que eu informe sua situaçao")
n1 = float(input("nota 1:"))
n2 = float(input("nota 2:"))
n3 = float(input("nota 3:"))
f1 = int(input("faltas:"))

cal1 = (n1+n2+n3) / 3

if cal1 <7.0 :
    print("reprovado")
elif cal1 >=7.0 and f1 <=20 :
    print("aprovado")
else:
    print("reprovado")

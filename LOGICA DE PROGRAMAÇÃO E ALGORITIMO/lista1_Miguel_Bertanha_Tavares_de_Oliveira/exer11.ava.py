# -*- coding: UTF-8 -*-

print(" me de sua média para que eu te informe se soi aprovado, está de recuperação ou reprovad ")
n1 = float(input("nota 1:"))
n2 = float(input("nota 2:"))
cal1 = (n1 + n2) / 2
if cal1 >= 7:
           print("aprovado")
elif cal1 >7 or cal1 <=3:
    print("aprovado")
elif cal1 <3:
    print("reprovado")

# -*- coding: UTF-8 -*-

salario = float(input("digite o valor do seu salário:"))
if salario > 1250:
    calcule1 = salario / 100 * 10
    print("o aumento do salário foi de:", calcule1)
elif salario <=1250:
    calcule2 = salario / 100 * 15
    print("o valor do aumento do salário foi de:", calcule2)
    

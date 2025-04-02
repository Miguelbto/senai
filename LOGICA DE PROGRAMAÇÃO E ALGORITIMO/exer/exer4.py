#-*-coding:UTF-8-*-
print("me informe o valor do salário e a porcentagem de aumento, para que eu informe o valor do aumento e o salário atual")
salario = float(input("valor do salário:"))
porcentagem = float(input("porcentagem de aumento"))
calcule1 = salario * porcentagem / 100
calcule2 = salario + calcule1
print("o valor do aumento foi de:", calcule1)
print("o valor do salário novo foi de:", calcule2)

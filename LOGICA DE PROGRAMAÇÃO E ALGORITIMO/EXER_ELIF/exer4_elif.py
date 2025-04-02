# -*- coding: UTF-8 -*-

print("insira os seguintes valores pedidos:")
vcasa = float(input("insira o valor da casa:"))
vsala =  float(input("insira o valor do salário:"))
vanos = float(input("insira o o quantidade de anos:"))
cal2 = vanos * 13
cal3 = vcasa / cal2
cal4 = vsala / 100 * 30
if cal3 > cal4:
    print("o valor da parcela é maior que 30 porcento do salário, emprestimo inválido")
else:
    print("valor permitido", cal3)



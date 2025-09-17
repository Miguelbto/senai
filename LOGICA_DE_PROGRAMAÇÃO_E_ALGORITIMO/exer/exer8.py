#-*-coding:UTF-8-*-
print("qual a kilometragem percorrida pelo carro alugado e o total de dias usado")
dia = float(input("quantidade de dias do uso do carro:"))
km = float(input("quantidade de km rodados:"))
calcule1 = dia * 60
calcule2 = km * 0.15
calcule3 = calcule1 + calcule2
print("o preço a pagar pelo uso do carro é de: %.2f " %calcule3)

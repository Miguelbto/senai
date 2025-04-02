#-*-coding: UTF-8-*-


print("informe seu nome,e o valor de seu salário, para que eu calcule o aumento dele")

nome = input("digite seu nome: ")
sala = float(input("insira seu salário"))

if sala < 3000:
    cont1 = sala / 100 * 10 + sala
    print(f"O novo salário de {nome} é {cont1}reais, com 10% de aumento")

else:
    cont2 = sala / 100 * 5 + sala
    print(f"O novo salário de {nome} é {cont2}reais, com 5% de aumento")


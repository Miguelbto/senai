#-*-coding: UTF-8-*-





print("insira seu nome e sua idade para que eu informe se você é maior de idade ou não")

nome = input("digite seu nome: ")
idade = int(input("informe sua idade: "))

if idade >= 18:
    print(f"o individuo {nome} é uma pessoa maior de idade")
elif idade <18 and idade > 0:
    print(f"o individuo {nome} é uma pessoa menor de idade")
else:
    print(f"{nome} você digitou errado tente denovo")




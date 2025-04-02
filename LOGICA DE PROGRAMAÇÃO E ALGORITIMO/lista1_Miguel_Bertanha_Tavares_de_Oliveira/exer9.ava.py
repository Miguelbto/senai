# -*- coding: UTF-8 -*-


print("Me informe seu peso e altura que farei sei IMC")
peso = float (input("Digite seu peso: "))
alt = float (input("Digite sua altura: "))
conta = peso // alt ** 2

if conta <20:
    print("Você está abaixo do peso")

elif conta <=25:
    print("Você está no peso")

elif conta <=30:
    print("Você está sobre peso")

elif conta <=40:
    print("Você está obeso")

elif conta >40:
    print("Você está obeso mórbido")

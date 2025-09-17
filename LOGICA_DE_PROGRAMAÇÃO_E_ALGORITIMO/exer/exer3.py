#-*-coding:UTF-8-*-
print("olá usúario, informe três valores para mim, em dias, horas e segundos para que eu converta todos em segundos")
dias = int(input("quantidade de dias:"))
horas = int(input("quantidade de horas:"))
segundos = int(input("quantidade de segundos"))
calcule1 = dias * 86400
calcule2 = horas * 3600
resultado = calcule1 + calcule2 + segundos
print("o resultado da conversão dos dias, horas e segundos, para uma unica unidade de medida de tempo sendo ela segundos foi de:", resultado)

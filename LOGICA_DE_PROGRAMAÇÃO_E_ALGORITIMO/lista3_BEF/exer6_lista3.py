# -*- coding: UTF-8 -*-


tempe = input("insira a temperatura que você deseja calcula, para Celcius use (c), e Fahrenheit (f)")
tempera = int(input("insira a temperatura:"))


def cel(x):
    conta1 = tempera * 9/5 + 32
    print(f"A temperatura é de: {conta1}")

def fa(x):
    conta1 = (tempera - 32) / 1.8
    print (f"A temperatura é de: {conta1}")





if tempe == "c" or tempe == "C":
    print(cel(tempera))
    

elif tempe == "f" or tempe == "F":
    print(fa(tempera))








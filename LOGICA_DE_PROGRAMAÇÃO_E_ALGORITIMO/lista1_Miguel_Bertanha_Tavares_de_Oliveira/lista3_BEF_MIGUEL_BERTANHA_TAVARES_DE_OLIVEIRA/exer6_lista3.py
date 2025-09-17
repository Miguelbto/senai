# -*- coding: UTF-8 -*-


tempe = input("insira a temperatura que você deseja calcula, para Celcius use (c), e Fahrenheit (f)")
tempera = int(input("insira a temperatura:"))
if tempe == "c" or "C":

    def temp(x):
        conta1 = tempera * 9/5 + 32
        print(f"A temperatura é de: {conta1}")

elif tempe == "f" or "F":

    def temp(x):
        conta1 = (tempera - 32) * 9/5
        print (f"A temperatura é de: {conta1}")
temp(tempera)





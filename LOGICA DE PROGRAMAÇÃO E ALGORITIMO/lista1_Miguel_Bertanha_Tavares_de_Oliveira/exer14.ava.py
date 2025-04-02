# -*- coding: UTF-8 -*-


print("Me informe o valor do produto que direi seu lucro e o preço que deve vender")
vlr = float(input("Digite o valor do produto"))

if vlr < 20.00:
            print("Seu lucro será de 45% do valor do produto")
            lucro = vlr * 45 / 100
            print("Seu lucro irá ser de: ", lucro)
            conta = vlr + lucro
            print("Já o valor de seu produto será de: ", conta)

else:
    print("Seu lucro será de 30% do valor do produto")
    lucro2 = vlr * 30 / 100
    print("Seu lucro irá ser de: ", lucro2)
    conta2 = vlr + lucro2
    print("Já o valor de seu produto será de: ",conta2)

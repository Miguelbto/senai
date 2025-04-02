# -*- coding: UTF-8 -*-

print("insira um número  para que eu forneça sua tabuada")

v1 = int(input("número que vc deseja saber a tabuada: "))

def tabuada(v1):
    for i in range(0,11):
        print(f"{v1} X {i} = {v1 * i}")
tabuada(v1)

# -*- coding: UTF-8 -*-

print(" me de três valores reais, para que eu informe se é possivel fazer um triangulos com os valores e seu tipo ")
v1 = int(input("valor 1:"))
v2 = int(input("valor 2:"))
v3 = int(input("valor 3:"))
if v1 == v2 and v1 == v3:
    print("triangulo equilatero")
elif v1 == v2 or v1 == v2 or v2 == v3:
    print("triangulo isóceles")
elif v1 != v2 != v3:
    print("triangulo escaleno")

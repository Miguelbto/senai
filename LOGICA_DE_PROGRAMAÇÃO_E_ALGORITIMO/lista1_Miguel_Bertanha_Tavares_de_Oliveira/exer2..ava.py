# -*- coding: UTF-8 -*-

import math

print( "insira um número, casoraiz quadrada do número caso ele seja positivo ou igual a zero e o quadrado do número caso ele seja negativo")
num = float(input("insira o número:"))
if num>= 0:
    ra = math.sqrt(num)
    print("o resultado é:", ra)
else:
    cal1 = num * num
    print("o resultado é:", cal1)
    

# -*- coding: UTF-8 -*-


valor = int(input('Diga quantos divisores você quer: '))

for v in range(1, valor):
    if valor % v == 0:
        print('Os divisores são:', v)

# -*- coding: UTF-8 -*-


print("irei identificar quantos digitos você colocou")


def digitos():
    v = int(input("digite um número inteiro"))
    cont = 1
    v1 = v
    while True:
        v1 = v1 / 10
        if v1 >= 1:
            cont = cont + 1
        else:
            break
    print(f"O nùmero {v} tem {cont} dígitos")
    
digitos()

# -*- coding: UTF-8 -*-
velocidade = int(input("me informe a velocidade que você está percorrendo:"))
if velocidade > 80:
    valor = (velocidade - 80) * 5
    print("você passou do limite de velocidade, sua multa ficou no valor de:", valor)
else:
    print("parabens você está dentro do limite de velocidade")
    

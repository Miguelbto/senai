# -*- coding: UTF-8 -*-

print( "insira sua idade, para que eu indique sua faixa etária")
idade = int(input("insira sua idade:"))
if idade< 2:
          print("bebê")
elif idade>2 and idade<=12:
    print("criança")
elif idade>12 and idade<23:
    print("adolescente")
elif idade>23 and idade<70:
    print("adulto")
else :
    idade >70
    print("idoso")

     

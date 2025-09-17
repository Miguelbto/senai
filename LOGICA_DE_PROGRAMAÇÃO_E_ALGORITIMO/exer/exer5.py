#-*-coding:UTF-8-*-
print("me informe o preço de uma mercadoria e seu valor de desconto")
preco = float(input("preço da mercadoria:"))
desconto = float(input("valor do desconto"))
calcule1 = preco * desconto / 100
calcule2 =  preco - calcule1 
print("o valor do desconto foi de:", calcule1)
print("o valor da mercadoria foi para:", calcule2)


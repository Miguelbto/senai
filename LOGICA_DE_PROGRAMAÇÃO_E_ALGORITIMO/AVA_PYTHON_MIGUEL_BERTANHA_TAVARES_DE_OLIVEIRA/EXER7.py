#-*-coding: UTF-8-*-



print("olá usuario, vamos converter uma temperatura em Fahrenheit para Celsius")

temp = int(input("insira a temperatura em Fahrenheit: "))

def tempera(a):
    cal1 = (temp - 32) * 5/9
    return f"A conversão para graus Celsius é de: {cal1}"

print(tempera(temp))



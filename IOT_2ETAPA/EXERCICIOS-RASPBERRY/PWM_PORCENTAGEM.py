from machine import Pin, PWM
from utime import sleep

led = PWM(Pin(14))
led.freq(1000)

leitura = 60000

porcentagem = leitura / 65535 * 1000

print (f"O valor em porcentagem é de:{porcentagem.2f}% %")

while True:
    def converte_porcentagem(leitura):
        porcentagem = leitura / 65535 * 100
        
    converte_porcentagem(leitura)

from machine import Pin
from utime import sleep

led = Pin(16, Pin.OUT)
botao = Pin(15, Pin.IN, Pin.PULL_DOWN)

while True:
    # O valor do LED recebe diretamente o valor da leitura do botão (0 ou 1)
    led.value(botao.value())
    sleep(0.05) # Pequeno atraso para estabilidade
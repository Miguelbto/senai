from machine import Pin
from utime import sleep

pull_down = Pin(18, Pin.IN)

while True:
    #Variavel que armazenará o estado do botão
    estado_botao = pull_down.value()
    #if estado_botao == 1:
    if estado_botao == 0:
        print("0 - Botão Pressionado!! (LOW)")
    else:
        print("1 - O botão está pressionado (HIGH)")
        
    sleep(0.5)
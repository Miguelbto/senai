from machine import Pin, ADC
from utime import sleep

led = Pin(16, Pin.OUT)
potenciometro = ADC(26)

while True:
    leitura = potenciometro.read_u16()
    
    # Converte o valor de 0~65535 para um tempo entre 0.05s e 1.05s
    tempo_pausa = (leitura / 65535) + 0.05
    
    led.value(1)
    sleep(tempo_pausa)
    led.value(0)
    sleep(tempo_pausa)
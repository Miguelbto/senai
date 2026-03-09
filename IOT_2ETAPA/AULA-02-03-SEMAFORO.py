from machine import Pin
from utime import sleep

leds = [Pin(i, Pin.OUT) for i in (16, 17, 18)] #está fazendo a estrutura básica ledVermelho = Pin(16, Pin.OUT)

sequencia = [(1,0,0,3), (0,1,0,1), (0,0,1,2), (0,1,0,1)] #define qual led irá ficar on ou off e o seu tempo
    
while True:
    for s in sequencia: #está passando nas sequências
        #define o valor de cada LED
        for i in range(3):
            leds[i].value(s[i])
        sleep(s[3])
        
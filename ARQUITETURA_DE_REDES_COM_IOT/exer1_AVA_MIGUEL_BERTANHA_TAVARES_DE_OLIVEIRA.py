#exercício 1 normal

from machine import Pin
from  time import sleep



LED1 = Pin(1, Pin.OUT)
LED2 = Pin(2, Pin.OUT)
LED3 = Pin(3, Pin.OUT)
LED4 = Pin(5, Pin.OUT)
LED5 = Pin(6, Pin.OUT)
LED6 = Pin(7, Pin.OUT)

while True:
      # variável + comando
    LED1.value(1)
    sleep(1)
    LED1.value(0)
    sleep(1)
        
    LED2.value(1)
    sleep(1)
    LED2.value(0)
    sleep(1)
        
    LED3.value(1)
    sleep(1)
    LED3.value(0)
    sleep(1)

    LED4.value(1)
    sleep(1)
    LED4.value(0)
    sleep(1)

    LED5.value(1)
    sleep(1)
    LED5.value(0)
    sleep(1)

    LED6.value(1)
    sleep(1)
    LED6.value(0)
    sleep(1)







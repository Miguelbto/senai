EXERCÍCIO 1 BÔNUS

from machine import Pin
from  time import sleep


BUTTON = Pin(8, Pin.IN)
LED1 = Pin(1, Pin.OUT)
LED2 = Pin(2, Pin.OUT)
LED3 = Pin(3, Pin.OUT)
LED4 = Pin(5, Pin.OUT)
LED5 = Pin(6, Pin.OUT)
LED6 = Pin(7, Pin.OUT)
LED7 = Pin(10, Pin.OUT)
LED8 = Pin(11, Pin.OUT)


while True:
    
    LED7.on()
    if BUTTON.value() == 1:
        LED8.on()
        sleep(1)
        LED7.off()
    else:
        LED8.off()
        LED1.value(1)
        sleep(1)
        LED1.value(0)
        sleep(1)
    if BUTTON.value() == 1:
        LED8.on()
        sleep(1)
        LED7.off()
    else:
        LED8.off()
        LED2.value(1)
        sleep(1)
        LED2.value(0)
        sleep(1)
    if BUTTON.value() == 1:
        LED8.on()
        sleep(1)
        LED7.off()
    else:
        LED8.off()
        LED3.value(1)
        sleep(1)
        LED3.value(0)
        sleep(1)
    if BUTTON.value() == 1:
        LED8.on()
        sleep(1)
        LED7.off()
    else:
        LED8.off()

        LED4.value(1)
        sleep(1)
        LED4.value(0)
        sleep(1)

    if BUTTON.value() == 1:
        LED8.on()
        sleep(1)
        LED7.off()
    else:
        LED8.off()

        LED5.value(1)
        sleep(1)
        LED5.value(0)
        sleep(1)

    if BUTTON.value() == 1:
        LED8.on()
        sleep(1)
        LED7.off()
    else:
        LED8.off()
        LED6.value(1)
        sleep(1)
        LED6.value(0)
        sleep(1)
    

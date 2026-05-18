from machine import Pin, ADC
from utime import sleep

potenciometro = ADC(28)

while True:
    
    leitura_pot = potenciometro.read_u16()
    
    print("Valor leitura Potenciômetro", leitura_pot)
    sleep(0.5)
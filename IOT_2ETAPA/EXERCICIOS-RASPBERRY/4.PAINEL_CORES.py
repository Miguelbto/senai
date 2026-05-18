from machine import Pin, PWM, ADC
from utime import sleep

# Cria uma lista com 3 objetos PWM para Vermelho (16), Verde (17) e Azul (18)
rgb = [PWM(Pin(i)) for i in (16, 17, 18)]

# Configura a frequência de todos para 1000Hz e os inicializa apagados
for led in rgb:
    led.freq(1000)
    led.duty_u16(0)

potenciometro = ADC(26)

while True:
    brilho = potenciometro.read_u16()
    
    rgb[0].duty_u16(brilho) # Vermelho acompanha o potenciômetro
    rgb[1].duty_u16(0)      # Verde sempre apagado
    rgb[2].duty_u16(0)      # Azul sempre apagado
    
    sleep(0.05)
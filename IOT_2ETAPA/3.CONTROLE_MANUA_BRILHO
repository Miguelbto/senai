from machine import Pin, PWM, ADC
from utime import sleep

led_pwm = PWM(Pin(16))
led_pwm.freq(1000)

potenciometro = ADC(26) # Pinos ADC da Pico começam no GP26, 27 e 28

while True:
    # Lê o valor do potenciômetro (0 a 65535) e joga direto no PWM do LED
    brilho = potenciometro.read_u16()
    led_pwm.duty_u16(brilho)
    sleep(0.05)
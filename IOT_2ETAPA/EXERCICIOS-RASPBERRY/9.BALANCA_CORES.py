from machine import Pin, PWM, ADC
from utime import sleep

pwm_vermelho = PWM(Pin(16))
pwm_azul = PWM(Pin(18)) # Ignorando o verde neste exercício
pwm_vermelho.freq(1000)
pwm_azul.freq(1000)

potenciometro = ADC(26)

while True:
    valor_azul = potenciometro.read_u16()
    valor_vermelho = 65535 - valor_azul
    
    pwm_azul.duty_u16(valor_azul)
    pwm_vermelho.duty_u16(valor_vermelho)
    
    sleep(0.05)
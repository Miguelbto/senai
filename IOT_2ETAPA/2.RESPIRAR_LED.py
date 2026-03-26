from machine import Pin, PWM
from utime import sleep

# Configuramos o pino com a classe PWM
led_pwm = PWM(Pin(16))
led_pwm.freq(1000) # Frequência de 1kHz (padrão recomendado)

while True:
    # Fade In: vai de 0 a 65535 dando passos de 1000 em 1000
    for duty in range(0, 65535, 1000):
        led_pwm.duty_u16(duty)
        sleep(0.01)
        
    # Fade Out: vai de 65535 até 0 reduzindo de 1000 em 1000
    for duty in range(65535, 0, -1000):
        led_pwm.duty_u16(duty)
        sleep(0.01)
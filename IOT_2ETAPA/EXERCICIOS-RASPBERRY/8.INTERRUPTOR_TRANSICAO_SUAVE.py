from machine import Pin, PWM
from utime import sleep

led_pwm = PWM(Pin(16))
led_pwm.freq(1000)
led_pwm.duty_u16(0)

botao = Pin(15, Pin.IN, Pin.PULL_DOWN)
estado_ligado = False

while True:
    if botao.value() == 1:
        estado_ligado = not estado_ligado # Inverte o estado atual
        
        if estado_ligado:
            # Transição Fade In
            for duty in range(0, 65535, 1500):
                led_pwm.duty_u16(duty)
                sleep(0.01)
            led_pwm.duty_u16(65535) # Garante que chegou em 100% no final
        else:
            # Transição Fade Out
            for duty in range(65535, -1, -1500):
                # Limita a 0 para não jogar valor negativo no PWM e causar erro
                led_pwm.duty_u16(max(0, duty)) 
                sleep(0.01)
            led_pwm.duty_u16(0)
            
        sleep(0.2) # Aguarda antes de liberar nova leitura
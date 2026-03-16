from machine import Pin, PWM
from utime import sleep

led = PWM(Pin(14))
led.freq(1000)

def funcao_map(leitura, in_min, in_max, out_min, out_max):
    return int((leitura - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)

pot_leitura = 14000

rgb = funcao_map(port_leitura, 0, 6535, 0, 255)

print("Conversão RGB (0 a 255):", rgb)

rgb = led.duty_u16(funcao_map(pot_leitura, 0, 65535, 0, 255))

if rgb > 100 and rgb < 200:

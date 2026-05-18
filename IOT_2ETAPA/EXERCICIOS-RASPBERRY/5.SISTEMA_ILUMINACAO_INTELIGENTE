from machine import Pin, PWM, ADC
from utime import sleep

rgb = [PWM(Pin(i)) for i in (16, 17, 18)]
for led in rgb: 
    led.freq(1000)

botao = Pin(15, Pin.IN, Pin.PULL_DOWN)
potenciometro = ADC(26)

cor_ativa = 0 # 0=Vermelho, 1=Verde, 2=Azul

while True:
    # Se clicar, muda a cor. O operador % 3 garante que volte para 0 após o 2.
    if botao.value() == 1:
        cor_ativa = (cor_ativa + 1) % 3
        sleep(0.2) # Debounce
        
    brilho = potenciometro.read_u16()
    
    for i in range(3):
        if i == cor_ativa:
            rgb[i].duty_u16(brilho) # Acende só a cor ativa no nível do potenciômetro
        else:
            rgb[i].duty_u16(0)      # Apaga o resto
            
    sleep(0.05)
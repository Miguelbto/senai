from machine import Pin, PWM, ADC
from utime import sleep

rgb = [PWM(Pin(i)) for i in (16, 17, 18)]
for p in rgb: p.freq(1000)

btn_cor = Pin(14, Pin.IN, Pin.PULL_DOWN)
btn_efeito = Pin(15, Pin.IN, Pin.PULL_DOWN)
potenciometro = ADC(26)

cor_atual = 0     # 0=Vermelho, 1=Verde, 2=Azul
efeito_atual = 0  # 0=Fixo, 1=Pisca, 2=Fade

# Variáveis auxiliares para os efeitos automáticos
ciclo = 0
fade_val = 0
fade_step = 2500

while True:
    # 1. Leitura de Inputs com Debounce
    if btn_cor.value() == 1:
        cor_atual = (cor_atual + 1) % 3
        sleep(0.2)
        
    if btn_efeito.value() == 1:
        efeito_atual = (efeito_atual + 1) % 3
        sleep(0.2)
        
    intensidade_maxima = potenciometro.read_u16()

    # 2. Definição do comportamento do Efeito
    brilho_saida = 0
    
    if efeito_atual == 0:
        # Luz Fixa (100% do que o potenciômetro permitir)
        brilho_saida = intensidade_maxima
        
    elif efeito_atual == 1:
        # Pisca (metade dos ciclos passa o valor, metade passa zero)
        if ciclo % 20 < 10: 
            brilho_saida = intensidade_maxima
        else:
            brilho_saida = 0
            
    elif efeito_atual == 2:
        # Respiração
        fade_val += fade_step
        if fade_val >= 65535 or fade_val <= 0:
            fade_step = -fade_step # Inverte a direção da respiração
            
        # O brilho é proporcional ao potenciômetro
        brilho_saida = int((max(0, fade_val) / 65535) * intensidade_maxima)

    # 3. Atualização dos Pinos
    for i in range(3):
        if i == cor_atual:
            rgb[i].duty_u16(min(brilho_saida, 65535))
        else:
            rgb[i].duty_u16(0)

    # Incrementa o ciclo e dá um pequeno passo (50ms)
    ciclo += 1
    sleep(0.05)
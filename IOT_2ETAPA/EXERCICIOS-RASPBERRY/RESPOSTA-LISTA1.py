Exercício 1: Interruptor Simples
from machine import Pin
from utime import sleep
led = Pin(15, Pin.OUT)
btn = Pin(14, Pin.IN, Pin.PULL_DOWN)
while True:
if btn.value() == 1:
led.value(1)
else:
led.value(0)
sleep(0.05) # Pequeno atraso para estabilidade
Exercício 2: Respirar do LED (Fade In / Fade Out)
from machine import Pin, PWM
from utime import sleep
led = PWM(Pin(15))
led.freq(1000)
while True:
# Aumenta o brilho (Fade In)
for duty in range(0, 65535, 500):
led.duty_u16(duty)
sleep(0.01)
# Diminui o brilho (Fade Out)
for duty in range(65535, 0, -500):
led.duty_u16(duty)
sleep(0.01)
Exercício 3: Controle Manual de Brilho
from machine import Pin, PWM, ADC
from utime import sleep
led = PWM(Pin(15))
led.freq(1000)
potenciometro = ADC(26) # Pino ADC0
while True:
leitura = potenciometro.read_u16()
led.duty_u16(leitura)
sleep(0.05)

Exercício 4: O Painel de Cores
from machine import Pin, PWM, ADC
from utime import sleep
red = PWM(Pin(13))
green = PWM(Pin(14))
blue = PWM(Pin(15))
# Declaração explícita (sem for)
red.freq(1000)
green.freq(1000)
blue.freq(1000)
# Garante que verde e azul fiquem apagados
green.duty_u16(0)
blue.duty_u16(0)
potenciometro = ADC(26)
while True:
brilho = potenciometro.read_u16()
red.duty_u16(brilho)
sleep(0.05)
Exercício 5: Sistema de Iluminação Inteligente
from machine import Pin, PWM, ADC
from utime import sleep
red = PWM(Pin(13))
green = PWM(Pin(14))
blue = PWM(Pin(15))
# Declaração explícita de frequência e duty cycle inicial
red.freq(1000)
red.duty_u16(0)
green.freq(1000)
green.duty_u16(0)
blue.freq(1000)
blue.duty_u16(0)
potenciometro = ADC(26)
btn = Pin(12, Pin.IN, Pin.PULL_DOWN)
cor_ativa = 0
estado_ant = 0

while True:
estado_atual = btn.value()
# Verifica clique (transição de 0 para 1)
if estado_atual == 1 and estado_ant == 0:
cor_ativa += 1
if cor_ativa > 2:
cor_ativa = 0
estado_ant = estado_atual
brilho = potenciometro.read_u16()
if cor_ativa == 0:
red.duty_u16(brilho)
green.duty_u16(0)
blue.duty_u16(0)
elif cor_ativa == 1:
red.duty_u16(0)
green.duty_u16(brilho)
blue.duty_u16(0)
elif cor_ativa == 2:
red.duty_u16(0)
green.duty_u16(0)
blue.duty_u16(brilho)
sleep(0.05)
Exercício 6: Pisca-Pisca com Velocidade Ajustável
from machine import Pin, ADC
from utime import sleep
led = Pin(15, Pin.OUT)
pot = ADC(26)
while True:
# Transforma 0-65535 em 0.05s a 1.05s
tempo_pausa = (pot.read_u16() / 65535.0) + 0.05
led.toggle()
sleep(tempo_pausa)
Exercício 7: Controle Digital de Brilho
from machine import Pin, PWM
from utime import sleep
led = PWM(Pin(15))
led.freq(1000)
btn_mais = Pin(14, Pin.IN, Pin.PULL_DOWN)

btn_menos = Pin(13, Pin.IN, Pin.PULL_DOWN)
brilho = 0
passo = 6553 # Aumenta/diminui ~10% de 65535
while True:
if btn_mais.value() == 1:
brilho += passo
if brilho > 65535:
brilho = 65535
led.duty_u16(brilho)
sleep(0.2) # Debounce/Atraso
if btn_menos.value() == 1:
brilho -= passo
if brilho < 0:
brilho = 0
led.duty_u16(brilho)
sleep(0.2) # Debounce/Atraso
Exercício 8: Interruptor com Transição Suave
from machine import Pin, PWM
from utime import sleep
led = PWM(Pin(15))
led.freq(1000)
led.duty_u16(0)
btn = Pin(14, Pin.IN, Pin.PULL_DOWN)
ligado = False
estado_ant = 0
while True:
estado_atual = btn.value()
if estado_atual == 1 and estado_ant == 0:
ligado = not ligado # Inverte o estado
if ligado:
# Fade In
for i in range(0, 65535, 1000):
led.duty_u16(i)
sleep(0.01)
else:
# Fade Out
for i in range(65535, -1, -1000):
if i < 0: i = 0
led.duty_u16(i)
sleep(0.01)

estado_ant = estado_atual
sleep(0.05)
Exercício 9: Balança de Cores
from machine import Pin, PWM, ADC
from utime import sleep
red = PWM(Pin(13))
blue = PWM(Pin(15))
red.freq(1000)
blue.freq(1000)
pot = ADC(26)
while True:
leitura = pot.read_u16()
# Azul recebe a leitura direta
blue.duty_u16(leitura)
# Vermelho recebe a diferença
red.duty_u16(65535 - leitura)
sleep(0.05)
Exercício 10: Painel de Efeitos Visuais (Desafio Final)
from machine import Pin, PWM, ADC
from utime import sleep
red = PWM(Pin(13))
green = PWM(Pin(14))
blue = PWM(Pin(15))
# Declaração sem laço "for"
red.freq(1000)
green.freq(1000)
blue.freq(1000)
pot = ADC(26)
btn_cor = Pin(14, Pin.IN, Pin.PULL_DOWN)
btn_efeito = Pin(15, Pin.IN, Pin.PULL_DOWN)
modo_cor = 0 # 0=R, 1=G, 2=B
modo_efeito = 0 # 0=Fixo, 1=Pisca
estado_cor_ant = 0

estado_efeito_ant = 0
pisca_estado = False
while True:
# 1. Leitura de Entradas (Botões)
est_cor = btn_cor.value()
est_ef = btn_efeito.value()
if est_cor == 1 and estado_cor_ant == 0:
modo_cor = (modo_cor + 1) % 3
if est_ef == 1 and estado_efeito_ant == 0:
modo_efeito = (modo_efeito + 1) % 2
estado_cor_ant = est_cor
estado_efeito_ant = est_ef
# 2. Lógica de Brilho
intensidade = pot.read_u16()
if modo_efeito == 1: # Se for piscar
pisca_estado = not pisca_estado
if pisca_estado == False:
intensidade = 0 # Apaga no momento do pisca
# 3. Atualizar LED RGB
red.duty_u16(intensidade if modo_cor == 0 else 0)
green.duty_u16(intensidade if modo_cor == 1 else 0)
blue.duty_u16(intensidade if modo_cor == 2 else 0)
# Atraso que serve tanto para debounce quanto pro pisca
sleep(0.15)
from machine import Pin, PWM, ADC
import time

# 1. Configura os pinos PWM para as cores do LED RGB
# A frequência de 1000Hz é o padrão ideal para LEDs
pino_vermelho = PWM(Pin(13))
pino_vermelho.freq(1000)

pino_verde = PWM(Pin(14))
pino_verde.freq(1000)

pino_azul = PWM(Pin(15))
pino_azul.freq(1000)

# 2. Configura o pino analógico (ADC) para o potenciômetro
potenciometro = ADC(Pin(26))

# 3. Garante que o Verde e o Azul fiquem totalmente desligados (duty = 0)
pino_verde.duty_u16(0)
pino_azul.duty_u16(0)

while True:
    # Lê o valor do potenciômetro (retorna um valor entre 0 e 65535)
    valor_pot = potenciometro.read_u16()
    
    # Aplica o valor lido diretamente no brilho da cor Vermelha
    pino_vermelho.duty_u16(valor_pot)
    
    # Opcional: Imprime no console (Shell do Thonny) para você ver os valores
    print("Brilho do Vermelho:", valor_pot)
    
    # Pequeno atraso para não sobrecarregar o processador
    time.sleep(0.05)
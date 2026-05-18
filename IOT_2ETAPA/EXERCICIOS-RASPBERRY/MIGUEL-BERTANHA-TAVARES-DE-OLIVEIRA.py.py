from machine import Pin, PWM, ADC
from utime import sleep


potenciometro = ADC(26)
pull_down = Pin(18, Pin.IN)

pino_vermelho = PWM(Pin(15))
pino_vermelho.freq(1000)

pino_verde = PWM(Pin(16))
pino_verde.freq(1000)

pino_azul = PWM(Pin(17))
pino_azul.freq(1000)

pino_azul.duty_u16(0)
pino_verde.duty_u16(0)
pino_vermelho.duty_u16(0)

pull_down = Pin(18, Pin.IN)
ultimo_estado_botao = 0

while True:
    estado_atual_botao = pull_down.value()
    
    # Detecta mudança de 0 para 1 (borda de subida)
    if estado_atual_botao == 1 and ultimo_estado_botao == 0:
        valor_pot = potenciometro.read_u16()
        print("SISTEMA LIGADO")
        pino_azul.duty_u16(valor_pot)
        pino_vermelho.duty_u16( 65535 - valor_pot)
        print("Brilho do Azul:", valor_pot)
        print("Diferença Vermelho:", 65535 - valor_pot)
        sleep(0.5)
    
    else:
        print("SISTEMA DESLIGADO")
        pino_azul.duty_u16(0)
        pino_vermelho.duty_u16(0)
    sleep(0.5)


while True:
    #Variavel que armazenará o estado do botão
    estado_botao = pull_down.value()
    #if estado_botao == 1:
    if estado_botao == 0:
        print("SISTEMA DESLIGADO")
        
    else:
        print("SISTEMA LIGADO")
            # Lê o valor do potenciômetro (retorna um valor entre 0 e 65535)
        valor_pot = potenciometro.read_u16()
            
            # Aplica o valor lido diretamente no brilho da cor Vermelha
        pino_azul.duty_u16(valor_pot)
        pino_vermelho.duty_u16( 65535 - valor_pot)
            
            # Opcional: Imprime no console para você ver os valores
        print("Brilho do Azul:", valor_pot)
        print("Diferença Vermelho:", 65535 - valor_pot)
            
            # Pequeno atraso para não sobrecarregar o processador
        sleep(0.5)
        
    sleep(0.5)


from machine import Pin, ADC, PWM
from utime import sleep

potenciometro = ADC(28)
led_pwm = PWM(Pin(14))
led_comum = Pin(15, Pin.OUT)

led_pwm.freq(1000)

while True:
    valor = potenciometro.read_u16()
    porcentagem = int((valor * 100) / 65535)
   
    led_pwm.duty_u16(valor)
    
    if porcentagem > 50:
        led_comum.value(1)
    else:
        led_comum.value(0)
   
    print(f"{porcentagem}%")
    sleep(0.5)
    
    '''
from machine import Pin, ADC, PWM
from utime import sleep

# --- Constantes ---
# Nomear os pinos e valores mágicos facilita a manutenção caso o hardware mude
PIN_POTENCIOMETRO = 28
PIN_LED_PWM = 14
PIN_LED_COMUM = 15
FREQ_PWM = 1000
VALOR_MAX_ADC = 65535

def setup():
    """Configura e retorna os periféricos."""
    potenciometro = ADC(PIN_POTENCIOMETRO)
    
    led_pwm = PWM(Pin(PIN_LED_PWM))
    led_pwm.freq(FREQ_PWM)
    
    led_comum = Pin(PIN_LED_COMUM, Pin.OUT)
    
    return potenciometro, led_pwm, led_comum

def main():
    potenciometro, led_pwm, led_comum = setup()
    
    print("Sistema iniciado. Pressione Ctrl+C para interromper.")
    
    try:
        while True:
            # 1. Leitura
            valor_adc = potenciometro.read_u16()
            
            # 2. Processamento (Cálculo da Porcentagem)
            # A divisão inteira (//) no MicroPython é mais eficiente que converter com int()
            porcentagem = (valor_adc * 100) // VALOR_MAX_ADC
            
            # 3. Atualização dos Atuadores
            led_pwm.duty_u16(valor_adc)
            
            # Substitui o bloco if/else. Como a comparação retorna um Booleano (True/False), 
            # o MicroPython entende isso nativamente como 1 ou 0 no pino digital.
            led_comum.value(porcentagem > 50)
            
            # 4. Feedback no terminal
            print(f"Brilho: {porcentagem}%")
            
            # Delay para evitar sobrecarga (0.1s torna a resposta física mais rápida e fluida que 0.5s)
            sleep(0.1) 
            
    except KeyboardInterrupt:
        # Permite parar o script (Ctrl+C no Thonny) sem gerar um erro feio na tela
        print("\nPrograma encerrado pelo usuário.")
        
    finally:
        # Bloco de segurança: garante que os LEDs desliguem se o script der erro ou for parado
        led_pwm.duty_u16(0)
        led_comum.value(0)

# Garante que o script só rode se for executado diretamente
if __name__ == "__main__":
    main()
    '''
from machine import Pin
import time

# Configura o pino 18 como entrada. 
# Como você montou o pull-down físico, usar apenas Pin.IN é suficiente.
botao = Pin(18, Pin.IN)

print("Testando Pull-Down no pino 18...")
print("Aguardando ação...")

while True:
    estado = botao.value() # Lê o pino (0 ou 1)
    
    if estado == 1:
        print("1 - Botão PRESSIONADO! (HIGH)")
    else:
        print("0 - Botão solto (LOW)")
        
    time.sleep(0.5) # Espera meio segundo para não inundar o terminal
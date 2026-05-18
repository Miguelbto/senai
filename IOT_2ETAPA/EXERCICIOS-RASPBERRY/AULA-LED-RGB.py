from machine import Pin
from utime import sleep

# Configura os pinos 15 (R), 16 (G) e 17 (B)
leds = [Pin(i, Pin.OUT) for i in (15, 16, 17)]

# Estrutura: (Vermelho, Verde, Azul, Tempo de Espera)
sequencia = [
    (1, 0, 0, 0.5, "Vermelho"), # Vermelho aceso por 0.5s
    (0, 1, 0, 0.5, "verde"), # Verde aceso por 0.5s
    (0, 0, 1, 0.5, "azul"), # Azul aceso por 0.5s
    (1, 1, 1, 1.0, "branco")  # Branco (todos) por 1s
]

while True:
    for s in sequencia:
        cor_atual = s[4]
        print(f"cor atual:", cor_atual)
        # range(3) para percorrer os índices 0, 1 e 2 (R, G, B)
        for i in range(3):
            leds[i].value(s[i])
        
        # O tempo de espera é o quarto item da tupla (índice 3)
        sleep(s[3])
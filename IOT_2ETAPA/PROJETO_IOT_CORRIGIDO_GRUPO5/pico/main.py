# main.py

from machine import Pin, ADC
import time
import ujson
from umqtt.simple import MQTTClient
from config import WIFI_SSID, WIFI_PASS, BROKER_IP, TOPIC_TELEMETRIA, TOPIC_COMANDOS, MEU_NOME
from wifi_connect import connect_wifi

# Configuração dos pinos dos sensores (ajuste conforme seu hardware)
# Para simulação, estamos usando pinos genéricos. Substitua pelos seus pinos reais.

# Exemplo de pinos para simulação:
# Se você tiver um sensor DHT11/DHT22, precisará importar a biblioteca dht e usá-la.
# import dht
# sensor_temp_umid = dht.DHT11(Pin(16)) # Exemplo para DHT11 no GP16

ldr_pin = ADC(Pin(26)) # GP26 para LDR (simulando fumaça/luz)
gas_pin = ADC(Pin(27)) # GP27 para MQ-2 (simulando gás)

# Pinos para atuadores (ex: LED para alarme)
alarme_led = Pin(15, Pin.OUT) # Exemplo: LED de alarme no GP15

alarme_ativo = False

def sub_cb(topic, msg):
    global alarme_ativo
    print(f"[MQTT] Mensagem recebida no tópico {topic.decode()}: {msg.decode()}")
    comando = msg.decode()

    if comando == "LIGAR_ALARME":
        alarme_ativo = True
        alarme_led.value(1) # Liga o LED do alarme
        print("Alarme ativado!")
    elif comando == "DESLIGAR_ALARME":
        alarme_ativo = False
        alarme_led.value(0) # Desliga o LED do alarme
        print("Alarme desativado!")
    elif comando == "INICIAR_COMBATE":
        print("Comando INICIAR_COMBATE recebido. (Implementar lógica)")
    elif comando == "RESET_SISTEMA":
        print("Comando RESET_SISTEMA recebido. (Implementar lógica)")
    elif comando == "DESATIVAR_BOMBEIROS":
        print("Comando DESATIVAR_BOMBEIROS recebido. (Implementar lógica)")

def main():
    global alarme_ativo

    if not connect_wifi(WIFI_SSID, WIFI_PASS):
        print("Não foi possível conectar ao WiFi. Reiniciando em 5 segundos...")
        time.sleep(5)
        # machine.reset() # Descomente para reiniciar o Pico automaticamente
        return # Para evitar loop infinito no simulador

    client = MQTTClient(client_id=MEU_NOME, server=BROKER_IP)
    client.set_callback(sub_cb)

    try:
        client.connect()
        print(f"[MQTT] Conectado ao broker: {BROKER_IP}")
        client.subscribe(TOPIC_COMANDOS)
        print(f"[MQTT] Assinado no tópico de comandos: {TOPIC_COMANDOS}")
    except Exception as e:
        print(f"[MQTT] Falha ao conectar ou assinar: {e}")
        print("Reiniciando em 5 segundos...")
        time.sleep(5)
        # machine.reset() # Descomente para reiniciar o Pico automaticamente
        return # Para evitar loop infinito no simulador

    counter = 0
    while True:
        try:
            client.check_msg() # Verifica por mensagens MQTT recebidas

            # --- Leitura de Sensores (Simulados para Exemplo) ---
            # Substitua estas linhas pelas leituras dos seus sensores reais
            
            # Simulação de Temperatura e Umidade
            # Se usar DHT11/DHT22:
            # sensor_temp_umid.measure()
            # temperatura = sensor_temp_umid.temperature()
            # umidade = sensor_temp_umid.humidity()
            temperatura = 20.0 + (time.time() % 200) / 10.0 # Varia entre 20 e 40
            umidade = 40 + (time.time() % 30) # Varia entre 40 e 70

            # LDR (simulando fumaça/luz - valor alto = mais fumaça/luz)
            # O dashboard espera 'ldr' para fumaça, e 'fumaca' como booleano
            ldr_raw = ldr_pin.read_u16() # Valor de 0 a 65535
            ldr_value = int(ldr_raw / 256) # Escala para 0-255 para facilitar visualização
            fumaca_detectada = ldr_value > 150 # Limite de exemplo para fumaça

            # MQ-2 (simulando gás - valor alto = mais gás)
            gas_raw = gas_pin.read_u16() # Valor de 0 a 65535
            gas_value = int(gas_raw / 128) # Escala para 0-511 para facilitar visualização
            
            # Construir o payload JSON
            payload = {
                "temperatura": temperatura,
                "umidade": int(umidade),
                "ldr": ldr_value, # Valor numérico da fumaça/luz
                "gas": gas_value, # Valor numérico do gás
                "fumaca": fumaca_detectada, # Booleano para status de fumaça/fogo
                "alarme": alarme_ativo
            }

            client.publish(TOPIC_TELEMETRIA, ujson.dumps(payload))
            print(f"[PUB] Publicado: {payload}")

        except Exception as e:
            print(f"[ERRO] Falha na publicação ou leitura: {e}")
            print("Tentando reconectar em 5 segundos...")
            time.sleep(5)
            try:
                client.connect()
                client.subscribe(TOPIC_COMANDOS)
            except OSError as e_reconnect:
                print(f"[ERRO] Falha na reconexão: {e_reconnect}")
                print("Reiniciando em 5 segundos...")
                time.sleep(5)
                # machine.reset() # Descomente para reiniciar o Pico automaticamente
                return # Para evitar loop infinito no simulador

        time.sleep(5) # Publica a cada 5 segundos

if __name__ == "__main__":
    main()

# main.py — Código principal do Pico 2W
# ─────────────────────────────────────────────────────────────────
# Este arquivo é executado automaticamente quando o Pico liga.
# Ele conecta no WiFi, conecta no broker MQTT e fica publicando
# uma mensagem de texto a cada 3 segundos.
#
# É o exemplo mais simples possível de comunicação IoT completa.
# Para adicionar sensores, substitua a variável 'mensagem' pelos dados lidos.

from config import *              # importa todas as variáveis do config.py
from wifi_connect import conectar_wifi
from umqtt.simple import MQTTClient  # biblioteca MQTT nativa do MicroPython
from utime import sleep

# ── 1. Conexão WiFi ───────────────────────────────────────────────
# Se não conectar, não tem sentido tentar o MQTT
if not conectar_wifi(WIFI_SSID, WIFI_PASS):
    print("[MAIN] Sem WiFi. Reinicie o dispositivo.")

else:
    # ── 2. Cliente MQTT ───────────────────────────────────────────
    # Cria o objeto com as configurações do config.py
    # Ainda não conectou — só preparou as configurações
    cliente = MQTTClient(CLIENT_ID, BROKER_IP, port=BROKER_PORT)

    try:
        # Conecta ao broker — é aqui que o Pico "aperta a mão" com o Mosquitto
        cliente.connect()
        print(f"[MQTT] Conectado ao broker: {BROKER_IP}")
        print(f"[MQTT] Publicando em: {TOPIC_PUB}")

        # ── 3. Loop principal ─────────────────────────────────────
        contador = 1
        while True:
            # Monte sua mensagem aqui
            # Em projetos reais, substitua pelo dado do sensor:
            # ex: mensagem = f"temp:{sensor.temperature()}"
            mensagem = f"Olá, eu sou {MEU_NOME}! Mensagem #{contador}"

            # publish() envia a mensagem ao broker
            # encode() converte string para bytes — MQTT exige bytes
            cliente.publish(TOPIC_PUB, mensagem.encode())
            print(f"[PUB] {mensagem}")

            contador += 1
            sleep(3)  # aguarda 3 segundos antes da próxima publicação

    except Exception as e:
        # Captura qualquer erro (broker caiu, WiFi oscilou, etc.)
        print(f"[ERRO] {e}")
        print("[MQTT] Verifique o broker e a conexão WiFi.")

    finally:
        # finally executa SEMPRE — mesmo se der erro no try
        # Garante que a conexão é encerrada corretamente no broker
        try:
            cliente.disconnect()
            print("[MQTT] Desconectado.")
        except:
            pass

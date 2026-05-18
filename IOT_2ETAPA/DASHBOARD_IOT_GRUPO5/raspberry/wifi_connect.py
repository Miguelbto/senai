# wifi_connect.py — Conexão WiFi
# ─────────────────────────────────────────────────────────────────
# Arquivo reutilizável em qualquer projeto com Pico 2W.
# Importa no main.py e chama conectar_wifi() com SSID e senha.

import network
from utime import sleep

def conectar_wifi(ssid, senha, timeout=15):
    """
    Conecta o Pico 2W à rede WiFi.
    Retorna True se conectou, False se falhou.
    O timeout evita que o programa trave infinitamente.
    """

    wlan = network.WLAN(network.STA_IF)  # STA_IF = modo cliente (não cria rede própria)
    wlan.active(True)                    # liga o rádio WiFi

    # Evita reconectar se já estiver conectado
    if wlan.isconnected():
        print(f"[WiFi] Já conectado. IP: {wlan.ifconfig()[0]}")
        return True

    print(f"[WiFi] Conectando em '{ssid}'", end="")
    wlan.connect(ssid, senha)

    # Aguarda conexão — decrementa o timeout a cada segundo
    while not wlan.isconnected() and timeout > 0:
        sleep(1)
        timeout -= 1
        print(".", end="")  # end="" mantém os pontos na mesma linha

    print()  # quebra de linha após os pontos

    if wlan.isconnected():
        ip = wlan.ifconfig()[0]  # ifconfig() retorna (ip, mascara, gateway, dns)
        print(f"[WiFi] Conectado! IP do Pico: {ip}")
        return True
    else:
        print("[WiFi] ERRO: não conectou. Verifique SSID e senha.")
        return False

# wifi_connect.py

import network
import time

def connect_wifi(ssid, password):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, password)

    max_attempts = 20
    attempts = 0
    while not wlan.isconnected() and attempts < max_attempts:
        print(f"[WiFi] Conectando em \'{ssid}\'...")
        time.sleep(1)
        attempts += 1

    if wlan.isconnected():
        print("[WiFi] Conectado! IP do Pico:", wlan.ifconfig()[0])
        return True
    else:
        print("[WiFi] Falha na conexão WiFi.")
        return False

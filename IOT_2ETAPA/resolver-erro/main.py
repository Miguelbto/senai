
from config import * # importa todas as variáveis do config.py
from wifi_connect import conectar_wifi
from umqtt.simple import MQTTClient  # biblioteca MQTT nativa do MicroPython
from utime import sleep, ticks_ms, ticks_diff
import ujson

from machine import Pin, PWM, I2C
from dht import DHT22
from i2c_lcd import I2cLcd
from picozero import Speaker

# --- CONFIGURAÇÃO DOS COMPONENTES ---
pir = Pin(13, Pin.IN)
sensor_int = DHT22(Pin(15))
sensor_ext = DHT22(Pin(12))
botao = Pin(21, Pin.IN, Pin.PULL_DOWN)
buzzer = Speaker(14)

# CONFIGURAÇÃO DO SERVO VIA PWM NATIVO
servo = PWM(Pin(0))
servo.freq(50)  # Frequência padrão de 50Hz para servos

red = PWM(Pin(20))
green = PWM(Pin(19))
blue = PWM(Pin(18))
red.freq(1000)
green.freq(1000)
blue.freq(1000)

i2c = I2C(0, scl=Pin(17), sda=Pin(16), freq=400000)
I2C_ADDR = i2c.scan()[0]
lcd = I2cLcd(i2c, I2C_ADDR, 2, 16)

# --- VARIÁVEIS DE CONTROLE ---
temporizador = 0
cliques_botao = 0
MAX_CLIQUES = 4
TEMP_CRITICA = 15.0
TIMEOUT_PORTA = 120

tempo_ultimo_segundo = ticks_ms()
tempo_ultima_leitura = ticks_ms()
tempo_ultimo_debounce = ticks_ms()
tempo_ultimo_bipe = ticks_ms()
tempo_ultimo_check_pir = ticks_ms()

# Máquina de estados
ESTADO_PORTA_FECHADA = 0
ESTADO_ABRINDO = 1
ESTADO_PORTA_ABERTA = 2
ESTADO_FECHANDO = 3

# MODIFICADO PARA MODO DE TESTE: Inicia considerada como ABERTA
estado_atual_porta = ESTADO_PORTA_ABERTA
porta_aberta = True
tempo_porta_aberta = ticks_ms()

t_int = 0.0
t_ext = 0.0


# --- FUNÇÕES AUXILIARES (FORA DO LOOP) ---

def controlar_led(r, g, b):
    # Lógica direta para Cátodo Comum (Padrão Wokwi conectado ao GND)
    red.duty_u16(int(r * 65535))
    green.duty_u16(int(g * 65535))
    blue.duty_u16(int(b * 65535))


def abrir_porta():
    """Modo de teste: Apenas atualiza variáveis, o servo já começa aberto"""
    global estado_atual_porta, porta_aberta, tempo_porta_aberta
    print('🔓 Porta aberta (Variável atualizada)...')
    estado_atual_porta = ESTADO_PORTA_ABERTA
    porta_aberta = True
    tempo_porta_aberta = ticks_ms()


def fechar_porta():
    """Fecha a porta girando o servo apenas até 90° (1500000 ns)"""
    global estado_atual_porta, porta_aberta
    print('🔒 Fechando porta em 90 graus...')
    servo.duty_ns(1500000)  # Move apenas até 90° para fechar
    estado_atual_porta = ESTADO_FECHANDO
    porta_aberta = False
    sleep(1)
    estado_atual_porta = ESTADO_PORTA_FECHADA
    lcd.move_to(0, 1)
    lcd.putstr("Porta Fechada   ")


def tem_movimento_pir():
    """Retorna True se há movimento detectado"""
    return pir.value() == 1


def publicar_dados(cliente, t_int, t_ext, pir_estado, porta_aberta, temporizador):
    """Publica um único JSON com todos os dados do sistema.
    Se o MQTT cair no meio do programa, não trava o resto —
    só avisa no console e continua o loop normalmente.
    """
    payload = {
        "temp_int": round(t_int, 1),
        "temp_ext": round(t_ext, 1),
        "pir": pir_estado,
        "porta": porta_aberta,
        "timer": temporizador
    }
    mensagem = ujson.dumps(payload)
    try:
        cliente.publish(TOPIC_PUB, mensagem.encode())
        print(f"[PUB] {mensagem}")
    except Exception as e:
        print(f"[MQTT] Falha ao publicar: {e}")


# Função de Callback para processar comandos recebidos via MQTT
def mqtt_callback(topic, msg):
    """Essa função é chamada sempre que uma mensagem chega no TOPIC_COMANDOS"""
    comando = msg.decode().strip()
    print(f"[MQTT REC] Tópico: {topic.decode()} | Mensagem: {comando}")
    
    # Exemplo de lógica de comando de exemplo:
    if comando == "abrir":
        abrir_porta()
    elif comando == "fechar":
        fechar_porta()


# Configuração inicial do LCD e Servo
lcd.move_to(0, 0)
lcd.putstr("Inicializando...")
lcd.move_to(0, 1)
lcd.putstr("Porta Aberta    ")

# Servo inicia fisicamente ABERTO em 0° (500000 ns)
servo.duty_ns(500000)
controlar_led(0, 0, 1)  # Inicia Azul
sleep(1)

# ── CONEXÃO WIFI E MQTT (Trecho Adicionado/Ajustado) ──────────────────
print("Conectando WiFi...")
if not conectar_wifi(WIFI_SSID, WIFI_PASS):
    raise Exception("Falha no WiFi")

print("Conectando MQTT...")
cliente = MQTTClient(
    CLIENT_ID,
    BROKER_IP,
    port=BROKER_PORT
)

# Define a função que cuidará das mensagens recebidas
cliente.set_callback(mqtt_callback)

try:
    cliente.connect()
    cliente.subscribe(TOPIC_COMANDOS)
    print("MQTT conectado")
    print("Inscrito em:", TOPIC_COMANDOS)
except Exception as e:
    print(f"[ERRO] Falha ao configurar MQTT: {e}")
    raise SystemExit

sleep(1)

# --- LOOP PRINCIPAL ---

while True:
    agora = ticks_ms()

    # VERIFICAÇÃO DE MENSAGENS INBOUND (MQTT)
    # Executa a cada ciclo de forma não-bloqueante para checar se chegou algum comando
    try:
        cliente.check_msg()
    except Exception as e:
        print(f"[MQTT] Erro ao checar mensagens: {e}")

    # 1. ATUALIZAÇÃO DOS SENSORES, LCD E PUBLICAÇÃO MQTT (A cada 2 segundos)
    if ticks_diff(agora, tempo_ultima_leitura) >= 2000:
        tempo_ultima_leitura = agora
        try:
            sensor_int.measure()
            sensor_ext.measure()
            t_int = sensor_int.temperature()
            t_ext = sensor_ext.temperature()
        except Exception as e:
            print("Erro ao ler sensores...")

        lcd.move_to(0, 0)
        lcd.putstr(f"In:{t_int:.1f}C Ex:{t_ext:.1f}C")

        # Publica o estado atual no broker MQTT — sempre que lê os sensores
        publicar_dados(cliente, t_int, t_ext, tem_movimento_pir(), porta_aberta, temporizador)

        # Monitoramento de status quando o timer não está rodando
        if temporizador == 0:
            if t_int > TEMP_CRITICA:
                buzzer.play(800)
                controlar_led(1, 0, 0)  # Vermelho
                lcd.move_to(0, 1)
                lcd.putstr("ALERTA: CRITICO!")
            else:
                buzzer.off()
                if porta_aberta:
                    controlar_led(0, 0, 1)  # Azul
                    lcd.move_to(0, 1)
                    lcd.putstr("Porta Aberta    ")
                else:
                    controlar_led(0, 0, 1)
                    lcd.move_to(0, 1)
                    lcd.putstr("Porta Fechada   ")
        else:
            lcd.move_to(0, 1)
            lcd.putstr(f"T:{temporizador}s P.Aberta")

    # 2. CONTROLE DO BOTÃO (Soma tempo livremente até o limite de 4 cliques)
    if botao.value() == 1 and ticks_diff(agora, tempo_ultimo_debounce) > 300:
        tempo_ultimo_debounce = agora

        if cliques_botao < MAX_CLIQUES:
            temporizador += 30  # Soma +30s (30 -> 60 -> 90 -> 120)
            cliques_botao += 1

            # Se o botão for pressionado, garante o estado de porta aberta e cancela pendências de fechar
            if not porta_aberta:
                abrir_porta()

            # Atualiza imediatamente o visor
            lcd.move_to(0, 1)
            lcd.putstr(f"T:{temporizador}s P.Aberta ")

    # 3. ATUALIZAÇÃO DO CRONÔMETRO E BEEP DINÂMICO (A cada 1 segundo)
    if temporizador > 0 and ticks_diff(agora, tempo_ultimo_segundo) >= 1000:
        tempo_ultimo_segundo = agora
        temporizador -= 1

        lcd.move_to(0, 1)
        lcd.putstr(f"T:{temporizador}s P.Aberta   ")

        # Ritmo do buzzer e cor do LED conforme o tempo restante
        if temporizador > 25:
            controlar_led(0, 1, 0)  # Verde

            # 🟢 Ritmo Verde: Bipe lento (a cada 1.5 segundos)
            if ticks_diff(agora, tempo_ultimo_bipe) >= 1500:
                tempo_ultimo_bipe = agora
                buzzer.play(440)
                sleep(0.05)
                buzzer.off()

        elif 15 < temporizador <= 25:
            controlar_led(1, 1, 0)  # Amarelo

            # 🟡 Ritmo Amarelo: Bipe médio (a cada 1 segundo)
            if ticks_diff(agora, tempo_ultimo_bipe) >= 1000:
                tempo_ultimo_bipe = agora
                buzzer.play(440)
                sleep(0.05)
                buzzer.off()

        elif 0 < temporizador <= 15:
            controlar_led(1, 0, 0)  # Vermelho

            # 🔴 Ritmo Vermelho: Bipe BEM rápido (a cada 0.3 segundos)
            if ticks_diff(agora, tempo_ultimo_bipe) >= 300:
                tempo_ultimo_bipe = agora
                buzzer.play(440)
                sleep(0.05)
                buzzer.off()

    # 4. VERIFICAÇÃO DO PIR DURANTE A CONTAGEM (A cada 500ms)
    if ticks_diff(agora, tempo_ultimo_check_pir) >= 500:
        tempo_ultimo_check_pir = agora

        if porta_aberta and temporizador > 0:
            if tem_movimento_pir():
                print("🚨 MOVIMENTO DETECTADO!")
                controlar_led(1, 0, 1)  # Magenta para registrar o movimento
                buzzer.play(600)
                sleep(0.05)
                buzzer.off()
            else:
                # Retorna à cor respectiva do timer se não houver movimento
                if temporizador > 25:
                    controlar_led(0, 1, 0)  # Verde
                elif 15 < temporizador <= 25:
                    controlar_led(1, 1, 0)  # Amarelo
                else:
                    controlar_led(1, 0, 0)  # Vermelho

    # 5. FIM DO TEMPO / FECHAMENTO REAL DA PORTA
    if temporizador == 0 and cliques_botao > 0:
        if porta_aberta:
            if tem_movimento_pir():
                print("🚨 OBSTRUÇÃO DETECTADA! Postergando...")
                lcd.move_to(0, 1)
                lcd.putstr("PIR: OBSTRUCAO! ")
                controlar_led(1, 0, 0)  # Vermelho
                buzzer.play(600)
                temporizador = 10  # Prorroga por 10 segundos

                # Descontamos um clique para permitir que o usuário adicione mais tempo no botão durante a obstrução
                if cliques_botao >= MAX_CLIQUES:
                    cliques_botao = MAX_CLIQUES - 1
            else:
                # O motor só vai girar aqui para fechar!
                fechar_porta()
                cliques_botao = 0
                buzzer.off()
                controlar_led(0, 0, 1)  # Azul de volta ao repouso

                # Publica imediatamente o novo estado da porta (não espera os 2s)
                publicar_dados(cliente, t_int, t_ext, tem_movimento_pir(), porta_aberta, temporizador)

    # 6. PROTEÇÃO: TIMEOUT FORÇADO (>120s)
    if porta_aberta:
        tempo_aberta = ticks_diff(agora, tempo_porta_aberta) // 1000
        if tempo_aberta > TIMEOUT_PORTA:
            print(f"⚠️ TIMEOUT ALCANÇADO! Forçando fechamento...")
            fechar_porta()
            cliques_botao = 0
            buzzer.off()
            controlar_led(1, 0, 0)  # Vermelho

            lcd.clear()
            lcd.move_to(0, 0)
            lcd.putstr("TIMEOUT!")
            lcd.move_to(0, 1)
            lcd.putstr("Porta Fechada   ")
            sleep(2)

    sleep(0.1)
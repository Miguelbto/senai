# Dashboard IoT — Exemplo Base
### SENAI Ítalo Bologna | Curso Técnico em Desenvolvimento de Sistemas

Este repositório é um **modelo base** de comunicação IoT completa:
Raspberry Pi Pico 2W → Broker MQTT → Dashboard no navegador.

Não usa sensores — apenas envia uma mensagem de texto do Pico para o browser.
Use como ponto de partida para construir seu próprio projeto.

---

## Como funciona

```
[Pico 2W]
  conecta no WiFi
  publica "Olá, eu sou [nome]" no broker
       ↓ WiFi (porta 1883 / TCP)
[Broker Mosquitto]
  recebe a mensagem
  distribui para quem está assinando
       ↓ WebSocket (porta 8000)
[Dashboard no navegador]
  recebe a mensagem
  exibe na tela em tempo real
```

---

## Estrutura do projeto

```
dashboard_hello/
│
├── pico/                   ← arquivos que vão para dentro do Pico 2W
│   ├── config.py           ← credenciais WiFi, endereço do broker, nome do aluno
│   ├── wifi_connect.py     ← função de conexão WiFi (reutilizável)
│   └── main.py             ← código principal — conecta e publica a mensagem
│
├── dashboard/              ← arquivos que abrem no navegador
│   ├── index.html          ← estrutura visual da página
│   ├── style.css           ← aparência (cores, layout, tipografia)
│   └── script.js           ← lógica: conecta ao broker e exibe as mensagens
│
└── mosquitto.conf          ← configuração do broker Mosquitto
```

---

## Pré-requisitos

**Hardware:**
- Raspberry Pi Pico 2W
- Cabo USB
- Rede WiFi com acesso ao broker

**Software:**
- [Thonny](https://thonny.org) — para programar o Pico
- [Mosquitto](https://mosquitto.org/download) — broker MQTT local
- Qualquer navegador moderno — para o dashboard

---

## Passo a passo

### 1. Configurar o Mosquitto

Edite o arquivo `mosquitto.conf` e copie para:
```
C:\Program Files\mosquitto\mosquitto.conf
```

Reinicie o serviço:
```bash
net stop mosquitto
net start mosquitto
```

---

### 2. Descobrir o IP do seu notebook

Abra o terminal e execute:
```bash
ipconfig
```
Anote o **Endereço IPv4** da rede WiFi. Exemplo: `192.168.1.100`

---

### 3. Configurar o Pico

Abra o `pico/config.py` no Thonny e edite:
```python
WIFI_SSID  = "nome_da_sua_rede"
WIFI_PASS  = "senha_da_sua_rede"
BROKER_IP  = "192.168.1.100"  # IP do seu notebook
MEU_NOME   = "SeuNome"        # seu nome aqui
```

Salve os 3 arquivos dentro do Pico:
```
Thonny → Arquivo → Salvar como → Raspberry Pi Pico
```
Salve: `config.py`, `wifi_connect.py` e `main.py`

---

### 4. Configurar o dashboard

Abra o `dashboard/script.js` e edite:
```javascript
const BROKER = "ws://192.168.1.100:8000" // mesmo IP do notebook
```

---

### 5. Abrir o dashboard

Abra o arquivo `dashboard/index.html` direto no navegador.
O dashboard vai tentar conectar no broker automaticamente.

---

### 6. Executar o Pico

No Thonny, abra o `main.py` e clique em **Run (F5)**.

Você vai ver no console do Thonny:
```
[WiFi] Conectando em 'nome_da_rede'......
[WiFi] Conectado! IP do Pico: 192.168.1.XX
[MQTT] Conectado ao broker: 192.168.1.100
[PUB] Olá, eu sou SeuNome! Mensagem #1
[PUB] Olá, eu sou SeuNome! Mensagem #2
```

E no dashboard, as mensagens aparecem em tempo real.

---

## Ordem de inicialização — sempre respeite

```
1. Mosquitto (broker) → precisa estar rodando primeiro
2. Dashboard (browser) → abre e aguarda conexão
3. Pico (Run no Thonny) → conecta e começa a publicar
```

Se o Pico iniciar antes do broker, vai dar erro de conexão.

---

## Para usar como base no seu projeto

| O que mudar | Onde |
|---|---|
| Nome do aluno / grupo | `pico/config.py` → `MEU_NOME` |
| Rede WiFi | `pico/config.py` → `WIFI_SSID` e `WIFI_PASS` |
| IP do broker | `pico/config.py` → `BROKER_IP` e `dashboard/script.js` → `BROKER` |
| Tópico MQTT | `pico/config.py` → `TOPIC_PUB` e `dashboard/script.js` → `TOPICO` |
| Mensagem enviada | `pico/main.py` → variável `mensagem` |
| O que exibir na tela | `dashboard/script.js` → função `exibirMensagem()` |
| Visual do dashboard | `dashboard/style.css` |

---

## Dúvidas comuns

**O dashboard conecta mas não recebe mensagens**
→ Confirme que o tópico no `config.py` e no `script.js` são idênticos.

**Erro `ETIMEDOUT` no Pico**
→ O broker não está rodando ou o IP está errado no `config.py`.

**Dashboard não conecta (bolinha vermelha)**
→ Mosquitto não está rodando ou a porta 8000 não está configurada no `mosquitto.conf`.

**`umqtt not found` no Pico**
→ Thonny → Tools → Manage Packages → instalar `umqtt.simple`.

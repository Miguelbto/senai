# Projeto IoT — Sistema de Incêndio (Corrigido e Otimizado)

Este projeto é um sistema completo de monitoramento de incêndio e gás, utilizando um Raspberry Pi Pico 2W e um dashboard web via MQTT.

## Estrutura do Projeto

```
dashboard_iot_corrigido/
├── pico/                   ← Arquivos para o Raspberry Pi Pico 2W
│   ├── config.py           ← Configurações de Wi-Fi, Broker e Tópicos
│   ├── wifi_connect.py     ← Função de conexão Wi-Fi
│   └── main.py             ← Código principal (leitura de sensores e MQTT)
├── images/                 ← Imagens do dashboard
├── index.html              ← Interface do Dashboard
├── script.js               ← Lógica do Dashboard (JS)
├── style.css               ← Estilos do Dashboard (CSS)
└── mosquitto.conf          ← Configuração recomendada para o Broker Mosquitto
```

## Melhorias Realizadas

1.  **Exibição de Valores Numéricos:** O dashboard agora mostra os valores reais (em ppm/nível) dos sensores de fumaça (LDR) e gás (MQ-2), além do status textual.
2.  **Firmware Completo:** Adicionados os arquivos de firmware para o Pico 2W que estavam faltando.
3.  **Tratamento de Erros:** O dashboard e o firmware possuem melhor tratamento de erros de conexão e payloads malformados.
4.  **Interface Otimizada:** Estilos CSS atualizados para melhor visualização e responsividade.

## Como Usar

### 1. Configurar o Broker Mosquitto
- Instale o Mosquitto no seu computador.
- Use o arquivo `mosquitto.conf` fornecido para configurar as portas 1883 (MQTT) e 8000 (WebSockets).
- Reinicie o serviço do Mosquitto.

### 2. Configurar o Raspberry Pi Pico 2W
- Abra a pasta `pico/` no Thonny.
- Edite o arquivo `config.py` com o seu **SSID do Wi-Fi**, **Senha** e o **IP do seu computador**.
- Salve `config.py`, `wifi_connect.py` e `main.py` dentro do seu Raspberry Pi Pico 2W.
- No Thonny, execute o `main.py`.

### 3. Configurar o Dashboard
- Abra o arquivo `script.js`.
- Na primeira linha, altere o valor de `BROKER` para o IP do seu computador (o mesmo usado no Pico).
  - Exemplo: `const BROKER = "ws://192.168.1.100:8000";`
- Abra o arquivo `index.html` no seu navegador.

## Observações sobre Sensores
- O código no `main.py` está configurado com pinos de exemplo (GP26, GP27). **Certifique-se de ajustar os pinos no código conforme a sua montagem física.**
- Se estiver usando sensores diferentes, ajuste as fórmulas de leitura no `main.py`.

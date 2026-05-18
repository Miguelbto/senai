// script.js — Lógica do Dashboard
// ─────────────────────────────────────────────────────────────────
// Este arquivo faz a comunicação entre o browser e o broker MQTT.
// Ele conecta via WebSocket, assina um tópico e exibe as mensagens
// que chegam do Pico 2W em tempo real.
//
// Para adaptar ao seu projeto:
//   1. Mude o BROKER e o TOPICO abaixo
//   2. Edite a função exibirMensagem() para tratar seus dados

// ── Configuração ──────────────────────────────────────────────────
// ws:// = WebSocket sem criptografia (equivalente ao http://)
// O IP é o mesmo do BROKER_IP no config.py do Pico
// A porta 8000 é a porta WebSocket configurada no mosquitto.conf
const BROKER = "ws://192.168.1.XXX:8000"  // ← coloque o IP do seu notebook

// Deve ser igual ao TOPIC_PUB do config.py do Pico
const TOPICO = "senai/+/hello"  // o "+" é um wildcard — recebe de QUALQUER aluno

// ClientID único para este browser — o Math.random evita conflito
// se dois browsers abrirem o dashboard ao mesmo tempo
const CLIENT_ID = "dashboard_" + Math.random().toString(16).slice(2, 8)

// ── Elementos do HTML que vamos atualizar ────────────────────────
const statusDot      = document.getElementById("status-dot")
const statusTexto    = document.getElementById("status-texto")
const ultimaMensagem = document.getElementById("ultima-mensagem")
const horarioEl      = document.getElementById("horario")
const logEl          = document.getElementById("log")

// ── Funções auxiliares ────────────────────────────────────────────

// Adiciona uma linha no log com a hora atual
function adicionarLog(texto, cor = "#8b949e") {
    const hora = new Date().toLocaleTimeString("pt-BR")
    logEl.innerHTML += `<span style="color:${cor}">[${hora}] ${texto}</span>\n`
    logEl.scrollTop = logEl.scrollHeight  // mantém o scroll no final
}

// Atualiza o indicador visual de status (bolinha + texto)
function atualizarStatus(conectado, texto) {
    statusDot.className  = "status-dot" + (conectado ? " conectado" : "")
    statusTexto.textContent = texto
}

// ── Exibir mensagem recebida ──────────────────────────────────────
// Esta função é chamada toda vez que uma mensagem chega do Pico.
// Para projetos com sensores, faça o tratamento dos dados aqui.
// Exemplo: const partes = mensagem.split(",") → { temp, umid }
function exibirMensagem(topico, mensagem) {
    // Atualiza o cartão principal com a mensagem
    ultimaMensagem.textContent = mensagem

    // Registra a hora da última atualização
    horarioEl.textContent = "Recebido às " + new Date().toLocaleTimeString("pt-BR")

    // Adiciona a mensagem ao log com cor de destaque
    adicionarLog(`[${topico}] ${mensagem}`, "#ffaa00")
}

// ── Conexão MQTT ──────────────────────────────────────────────────
// mqtt.connect() cria a conexão WebSocket com o broker
// Retorna um objeto 'cliente' que usamos para pub/sub
adicionarLog(`Conectando em ${BROKER}...`)
const cliente = mqtt.connect(BROKER, {
    clientId: CLIENT_ID,
    clean: true  // não guarda sessão — começa do zero a cada conexão
})

// Evento: disparado quando a conexão com o broker é estabelecida
cliente.on("connect", () => {
    atualizarStatus(true, "Conectado ao broker")
    adicionarLog("Conectado com sucesso!", "#00ff88")

    // Assina o tópico para começar a receber mensagens do Pico
    // O callback confirma que o subscribe foi aceito pelo broker
    cliente.subscribe(TOPICO, (err) => {
        if (!err) {
            adicionarLog(`Assinando: "${TOPICO}"`)
        }
    })
})

// Evento: disparado toda vez que uma mensagem chega no tópico assinado
// 'payload' chega como bytes — toString() converte para texto
// É o inverso do .encode() que o Pico usa ao publicar
cliente.on("message", (topico, payload) => {
    const mensagem = payload.toString()
    exibirMensagem(topico, mensagem)
})

// Evento: disparado quando ocorre um erro de conexão
cliente.on("error", (err) => {
    atualizarStatus(false, "Erro de conexão")
    adicionarLog(`ERRO: ${err.message}`, "#ff4444")
})

// Evento: disparado quando a conexão é encerrada
cliente.on("close", () => {
    atualizarStatus(false, "Desconectado")
    adicionarLog("Conexão encerrada.", "#ff4444")
})

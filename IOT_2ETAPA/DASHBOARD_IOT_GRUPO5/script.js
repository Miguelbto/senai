// ── CONFIGURAÇÕES DO BROKER MQTT ──────────────────────────────────
const BROKER = "ws://192.168.1.XXX:8000"; // Substitua pelo IP do seu notebook/broker
const TOPIC_TELEMETRIA = "pico/incendio/telemetria";
const TOPIC_COMANDOS = "pico/incendio/comandos";

const CLIENT_ID = "dashboard_" + Math.random().toString(16).slice(2, 8);

// Conectando ao Broker via WebSockets
console.log(`Tentando conectar em ${BROKER}...`);
const client = mqtt.connect(BROKER, {
    clientId: CLIENT_ID, 
    clean: true          
});

const conexaoStatusEl = document.getElementById("conexao-status");

// ── EVENTOS DE CONEXÃO (Baseados no Script de Referência) ──────────
client.on("connect", () => {
    console.log("Conectado ao broker MQTT com sucesso!");
    conexaoStatusEl.className = "conexao-status conectado";
    conexaoStatusEl.querySelector("span").innerHTML = "Conectado<br><small>Raspberry Pi</small>";
    
    // Assina o tópico de telemetria
    client.subscribe(TOPIC_TELEMETRIA, (err) => {
        if (!err) console.log(`Assinado com sucesso no tópico: ${TOPIC_TELEMETRIA}`);
    });
});

client.on("error", (err) => {
    console.error("Erro de conexão MQTT:", err);
    conexaoStatusEl.className = "conexao-status";
    conexaoStatusEl.querySelector("span").innerHTML = "Erro de Conexão<br><small>Verifique o Broker</small>";
});

client.on("close", () => {
    console.log("Desconectado do Broker.");
    conexaoStatusEl.className = "conexao-status";
    conexaoStatusEl.querySelector("span").innerHTML = "Desconectado<br><small>Verifique a rede</small>";
});

// ── PROCESSAMENTO DE DADOS E ANÁLISE DE CRITICIDADE ────────────────
// ── PROCESSAMENTO DE DADOS RECEBIDOS E ANÁLISE DE CRITICIDADE ────────────────
client.on("message", (topic, message) => {
    if (topic === TOPIC_TELEMETRIA) {
        try {
            const dados = JSON.parse(message.toString());
            
            // Captura os valores de forma totalmente independente
            const valorLdr = dados.ldr;
            const valorGas = dados.gas !== undefined ? dados.gas : dados.mq2;
            
            // 1. ATUALIZAÇÃO DOS VALORES NUMÉRICOS NA TELA (Separados)
            if (dados.temperatura !== undefined) document.getElementById("txt-temperatura").innerText = dados.temperatura.toFixed(1);
            if (dados.umidade !== undefined) document.getElementById("txt-umidade").innerText = dados.umidade;
            if (valorLdr !== undefined) document.getElementById("txt-ldr").innerText = valorLdr;
            if (valorGas !== undefined) document.getElementById("txt-mq-2").innerText = valorGas;
            
            // Array para monitorar quais sensores estão críticos
            let alertasAtivos = [];

            // 2. VERIFICAÇÃO CONDICIONAL DA TEMPERATURA (Limite: >= 40°C)
            const cardTemp = document.getElementById("card-temperatura");
            const badgeTemp = cardTemp.querySelector(".badge");
            if (dados.temperatura >= 40) {
                alertasAtivos.push(`Temperatura Crítica (${dados.temperatura.toFixed(1)}°C)`);
                badgeTemp.innerText = "Crítico";
                badgeTemp.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
                badgeTemp.style.color = "#ef4444";
            } else {
                badgeTemp.innerText = "Normal";
                badgeTemp.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
                badgeTemp.style.color = "#10b981";
            }

            // 3. VERIFICAÇÃO CONDICIONAL DA UMIDADE (Limite: <= 30%)
            const cardUmid = document.getElementById("card-umidade");
            const badgeUmid = cardUmid.querySelector(".badge");
            if (dados.umidade <= 30) {
                alertasAtivos.push(`Umidade Baixa (${dados.umidade}%)`);
                badgeUmid.innerText = "Crítico";
                badgeUmid.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
                badgeUmid.style.color = "#ef4444";
            } else {
                badgeUmid.innerText = "Normal";
                badgeUmid.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
                badgeUmid.style.color = "#10b981";
            }

            // 4. VERIFICAÇÃO CONDICIONAL DE FUMAÇA / FOGO (Card do LDR)
            const cardFumaca = document.getElementById("card-fumaca");
            const badgeFumaca = cardFumaca.querySelector(".badge");
            const fumacaStatusEl = document.getElementById("txt-fumaca-status");
            
            if (dados.fumaca) {
                alertasAtivos.push("FUMAÇA/FOGO DETECTADO!");
                fumacaStatusEl.innerText = "DETECTADO!";
                fumacaStatusEl.style.color = "#ef4444";
                badgeFumaca.innerText = "Crítico";
                badgeFumaca.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
                badgeFumaca.style.color = "#ef4444";
            } else {
                fumacaStatusEl.innerText = "Não Detectado";
                fumacaStatusEl.style.color = "white";
                badgeFumaca.innerText = "Normal";
                badgeFumaca.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
                badgeFumaca.style.color = "#10b981";
            }

            // 5. VERIFICAÇÃO CONDICIONAL DO SENSOR DE GÁS (Card do MQ-2)
            const cardGas = document.getElementById("card-gas");
            const badgeGas = cardGas.querySelector(".badge");
            const gasStatusEl = document.getElementById("txt-gas-status");
            const LIMITE_MAX_GAS = 400; // Ajuste o limite analógico do seu MQ-2 aqui se necessário

            if (valorGas > LIMITE_MAX_GAS) {
                alertasAtivos.push(`Vazamento de Gás (${valorGas})`);
                gasStatusEl.innerText = "DETECTADO!";
                gasStatusEl.style.color = "#ef4444";
                badgeGas.innerText = "Crítico";
                badgeGas.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
                badgeGas.style.color = "#ef4444";
            } else {
                gasStatusEl.innerText = "Não Detectado";
                gasStatusEl.style.color = "white";
                badgeGas.innerText = "Normal";
                badgeGas.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
                badgeGas.style.color = "#10b981";
            }

            // 6. ATUALIZAÇÃO DO STATUS DO ALARME GERAL
            const alarmeStatusEl = document.getElementById("txt-alarme-status");
            const cardAlarme = document.getElementById("card-alarme");
            const badgeAlarme = cardAlarme.querySelector(".badge");
            
            if (dados.alarme) {
                alarmeStatusEl.innerText = "ATIVADO";
                alarmeStatusEl.className = "valor";
                alarmeStatusEl.style.color = "#ef4444";
                badgeAlarme.innerText = "Crítico";
                badgeAlarme.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
                badgeAlarme.style.color = "#ef4444";
            } else {
                alarmeStatusEl.innerText = "Desativado";
                alarmeStatusEl.className = "valor desativado";
                alarmeStatusEl.style.color = "#10b981";
                badgeAlarme.innerText = "Normal";
                badgeAlarme.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
                badgeAlarme.style.color = "#10b981";
            }

            // 7. ATUALIZAÇÃO DOS BANNERS GERAIS DINÂMICOS
            const validacaoSistema = document.getElementById("validacao-sistema");
            const areaAlerta = document.getElementById("area-alerta");
            const txtAlertaMensagem = document.getElementById("txt-alerta-mensagem");

            if (alertasAtivos.length > 0) {
                validacaoSistema.style.backgroundColor = "rgba(239, 68, 68, 0.15)";
                validacaoSistema.style.borderColor = "#ef4444";
                validacaoSistema.style.color = "#ef4444";
                validacaoSistema.querySelector(".status-titulo").innerText = "SISTEMA EM ALERTA";
                validacaoSistema.querySelector(".status-subtitulo").innerText = "Atenção aos sensores críticos";

                areaAlerta.style.backgroundColor = "rgba(239, 68, 68, 0.15)";
                areaAlerta.style.borderColor = "#ef4444";
                txtAlertaMensagem.innerText = "ATENÇÃO: " + alertasAtivos.join(" | ");
                txtAlertaMensagem.style.color = "#fca5a5";
            } else {
                validacaoSistema.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
                validacaoSistema.style.borderColor = "#10b981";
                validacaoSistema.style.color = "#10b981";
                validacaoSistema.querySelector(".status-titulo").innerText = "SISTEMA NORMAL";
                validacaoSistema.querySelector(".status-subtitulo").innerText = "Todos os sensores em condições seguras";

                areaAlerta.style.backgroundColor = "rgba(239, 68, 68, 0.05)";
                areaAlerta.style.borderColor = "rgba(239, 68, 68, 0.2)";
                txtAlertaMensagem.innerText = "Nenhuma anomalia detectada. Sistema operando normalmente.";
                txtAlertaMensagem.style.color = "#fca5a5";
            }

        } catch (e) {
            console.error("Erro ao processar JSON recebido do Pico:", e);
        }
    }
});

// ── ENVIO DE COMANDOS PARA O PICO 2W ──────────────────────────────
function enviarComando(comando) {
    if (client.connected) {
        client.publish(TOPIC_COMANDOS, comando);
        console.log(`Comando enviado para o Pico: ${comando}`);
    } else {
        alert("Não foi possível enviar o comando. Painel desconectado do Broker MQTT.");
    }
}

// Mapeamento dos botões da interface
document.getElementById("btn-ativar-alarme").addEventListener("click", () => enviarComando("LIGAR_ALARME"));
document.getElementById("btn-desativar-alarme").addEventListener("click", () => enviarComando("DESLIGAR_ALARME"));
document.getElementById("btn-acionar-combate").addEventListener("click", () => enviarComando("INICIAR_COMBATE"));
document.getElementById("btn-resetar-sistema").addEventListener("click", () => enviarComando("RESET_SISTEMA"));
document.getElementById("btn-ligar-autoridades").addEventListener("click", () => enviarComando("DESATIVAR_BOMBEIROS"));

document.getElementById("btn-alerta-residentes").addEventListener("click", () => {
    alert("Funcionalidade: Abrindo lista de contatos de emergência...");
});

// Atualização automática do Relógio do Header
setInterval(() => {
    const agora = new Date();
    document.getElementById("timestamp").innerText = agora.toLocaleString('pt-BR');
}, 1000);
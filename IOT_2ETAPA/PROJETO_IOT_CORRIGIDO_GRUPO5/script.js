// ── CONFIGURAÇÕES DO BROKER MQTT ──────────────────────────────────
const BROKER = "ws://192.168.1.XXX:8000"; // Substitua pelo IP do seu notebook/broker
const TOPIC_TELEMETRIA = "senai/grupo5/sensores";
const TOPIC_COMANDOS = "senai/grupo5/comandos";

const CLIENT_ID = "dashboard_" + Math.random().toString(16).slice(2, 8);

// Limites de criticidade para os sensores
const LIMITES = {
    temperatura: { critico: 40, unidade: "°C" },
    umidade: { minimo: 30, maximo: 60, unidade: "%" },
    fumaca: { critico: 250, unidade: "ppm" },
    gas: { critico: 400, unidade: "ppm" }
};

// Conectando ao Broker via WebSockets
console.log(`Tentando conectar em ${BROKER}...`);
const client = mqtt.connect(BROKER, {
    clientId: CLIENT_ID, 
    clean: true          
});

const conexaoStatusEl = document.getElementById("conexao-status");

// ── EVENTOS DE CONEXÃO ────────────────────────────────────────────
client.on("connect", () => {
    console.log("✓ Conectado ao broker MQTT com sucesso!");
    if (conexaoStatusEl) {
        conexaoStatusEl.className = "conexao-status conectado";
        const span = conexaoStatusEl.querySelector("span");
        if (span) span.innerHTML = "Conectado<br><small>Raspberry Pi</small>";
    }
    
    client.subscribe(TOPIC_TELEMETRIA, (err) => {
        if (!err) console.log(`✓ Assinado com sucesso no tópico: ${TOPIC_TELEMETRIA}`);
    });
});

client.on("error", (err) => {
    console.error("✗ Erro de conexão MQTT:", err);
    if (conexaoStatusEl) {
        conexaoStatusEl.className = "conexao-status";
        const span = conexaoStatusEl.querySelector("span");
        if (span) span.innerHTML = "Erro de Conexão<br><small>Verifique o Broker</small>";
    }
});

client.on("close", () => {
    console.log("✗ Desconectado do Broker.");
    if (conexaoStatusEl) {
        conexaoStatusEl.className = "conexao-status";
        const span = conexaoStatusEl.querySelector("span");
        if (span) span.innerHTML = "Desconectado<br><small>Verifique a rede</small>";
    }
});

// ── FUNÇÕES AUXILIARES ────────────────────────────────────────────

/**
 * Atualiza o status visual de um card baseado em condição crítica
 * @param {string} elementId - ID do elemento badge
 * @param {boolean} isCritico - Se o valor é crítico
 */
function atualizarBadge(elementId, isCritico) {
    const badge = document.getElementById(elementId);
    if (!badge) return;

    if (isCritico) {
        badge.innerText = "Crítico";
        badge.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
        badge.style.color = "#ef4444";
    } else {
        badge.innerText = "Normal";
        badge.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
        badge.style.color = "#10b981";
    }
}

/**
 * Atualiza o texto de um elemento com tratamento de erro
 * @param {string} elementId - ID do elemento
 * @param {any} value - Valor a ser exibido
 * @param {string} suffix - Sufixo opcional (ex: "°C")
 */
function atualizarTexto(elementId, value, suffix = "") {
    const element = document.getElementById(elementId);
    if (element && value !== undefined && value !== null) {
        element.innerText = typeof value === "number" ? value.toFixed(1) : value;
        if (suffix) element.innerText += suffix;
    }
}

// ── PROCESSAMENTO DE DADOS RECEBIDOS E ANÁLISE DE CRITICIDADE ──────
client.on("message", (topic, message) => {
    if (topic === TOPIC_TELEMETRIA) {
        try {
            const dados = JSON.parse(message.toString());
            console.log("📨 Dados recebidos:", dados);
            
            // Array para monitorar quais sensores estão críticos
            let alertasAtivos = [];

            // ─────────────────────────────────────────────────────────
            // 1. TEMPERATURA
            // ─────────────────────────────────────────────────────────
            if (dados.temperatura !== undefined) {
                const temp = dados.temperatura;
                atualizarTexto("txt-temperatura", temp, "");
                
                const isCritico = temp >= LIMITES.temperatura.critico;
                atualizarBadge("badge-temperatura", isCritico);
                
                if (isCritico) {
                    alertasAtivos.push(`Temperatura Crítica (${temp.toFixed(1)}°C)`);
                }
            }

            // ─────────────────────────────────────────────────────────
            // 2. UMIDADE
            // ─────────────────────────────────────────────────────────
            if (dados.umidade !== undefined) {
                const umid = dados.umidade;
                atualizarTexto("txt-umidade", umid, "");
                
                const isCritico = umid <= LIMITES.umidade.minimo || umid >= LIMITES.umidade.maximo;
                atualizarBadge("badge-umidade", isCritico);
                
                if (isCritico) {
                    alertasAtivos.push(`Umidade Crítica (${umid}%)`);
                }
            }

            // ─────────────────────────────────────────────────────────
            // 3. FUMAÇA / FOGO (LDR)
            // ─────────────────────────────────────────────────────────
            if (dados.ldr !== undefined) {
                const ldr = dados.ldr;
                atualizarTexto("txt-fumaca-valor", ldr, "");
                
                const isCritico = ldr >= LIMITES.fumaca.critico;
                atualizarBadge("badge-fumaca", isCritico);
                
                // Atualizar status textual
                const fumacaStatusEl = document.getElementById("txt-fumaca-status");
                if (fumacaStatusEl) {
                    if (isCritico) {
                        fumacaStatusEl.innerText = "DETECTADO!";
                        fumacaStatusEl.style.color = "#ef4444";
                        alertasAtivos.push(`FUMAÇA/FOGO DETECTADO! (${ldr} ppm)`);
                    } else {
                        fumacaStatusEl.innerText = "Não Detectado";
                        fumacaStatusEl.style.color = "#10b981";
                    }
                }
            }

            // ─────────────────────────────────────────────────────────
            // 4. GÁS (MQ-2)
            // ─────────────────────────────────────────────────────────
            const valorGas = dados.gas !== undefined ? dados.gas : dados.mq2;
            if (valorGas !== undefined) {
                atualizarTexto("txt-gas-valor", valorGas, "");
                
                const isCritico = valorGas > LIMITES.gas.critico;
                atualizarBadge("badge-gas", isCritico);
                
                // Atualizar status textual
                const gasStatusEl = document.getElementById("txt-gas-status");
                if (gasStatusEl) {
                    if (isCritico) {
                        gasStatusEl.innerText = "DETECTADO!";
                        gasStatusEl.style.color = "#ef4444";
                        alertasAtivos.push(`Vazamento de Gás (${valorGas} ppm)`);
                    } else {
                        gasStatusEl.innerText = "Não Detectado";
                        gasStatusEl.style.color = "#10b981";
                    }
                }
            }

            // ─────────────────────────────────────────────────────────
            // 5. ALARME GERAL
            // ─────────────────────────────────────────────────────────
            if (dados.alarme !== undefined) {
                const alarmeStatusEl = document.getElementById("txt-alarme-status");
                const badgeAlarme = document.getElementById("badge-alarme");
                
                if (alarmeStatusEl && badgeAlarme) {
                    if (dados.alarme) {
                        alarmeStatusEl.innerText = "ATIVADO";
                        alarmeStatusEl.className = "valor";
                        alarmeStatusEl.style.color = "#ef4444";
                        atualizarBadge("badge-alarme", true);
                    } else {
                        alarmeStatusEl.innerText = "Desativado";
                        alarmeStatusEl.className = "valor desativado";
                        alarmeStatusEl.style.color = "#10b981";
                        atualizarBadge("badge-alarme", false);
                    }
                }
            }

            // ─────────────────────────────────────────────────────────
            // 6. ATUALIZAÇÃO DOS BANNERS GERAIS DINÂMICOS
            // ─────────────────────────────────────────────────────────
            const validacaoSistema = document.getElementById("validacao-sistema");
            const areaAlerta = document.getElementById("area-alerta");
            const txtAlertaMensagem = document.getElementById("txt-alerta-mensagem");

            if (validacaoSistema && areaAlerta && txtAlertaMensagem) {
                if (alertasAtivos.length > 0) {
                    validacaoSistema.style.backgroundColor = "rgba(239, 68, 68, 0.15)";
                    validacaoSistema.style.borderColor = "#ef4444";
                    validacaoSistema.style.color = "#ef4444";
                    validacaoSistema.querySelector(".status-titulo").innerText = "⚠️ SISTEMA EM ALERTA";
                    validacaoSistema.querySelector(".status-subtitulo").innerText = "Atenção aos sensores críticos";

                    areaAlerta.style.backgroundColor = "rgba(239, 68, 68, 0.15)";
                    areaAlerta.style.borderColor = "#ef4444";
                    txtAlertaMensagem.innerText = "🚨 ATENÇÃO: " + alertasAtivos.join(" | ");
                    txtAlertaMensagem.style.color = "#fca5a5";
                } else {
                    validacaoSistema.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
                    validacaoSistema.style.borderColor = "#10b981";
                    validacaoSistema.style.color = "#10b981";
                    validacaoSistema.querySelector(".status-titulo").innerText = "✓ SISTEMA NORMAL";
                    validacaoSistema.querySelector(".status-subtitulo").innerText = "Todos os sensores em condições seguras";

                    areaAlerta.style.backgroundColor = "rgba(16, 185, 129, 0.05)";
                    areaAlerta.style.borderColor = "rgba(16, 185, 129, 0.2)";
                    txtAlertaMensagem.innerText = "✓ Nenhuma anomalia detectada. Sistema operando normalmente.";
                    txtAlertaMensagem.style.color = "#a7f3d0";
                }
            }

        } catch (e) {
            console.error("✗ Erro ao processar JSON recebido:", e);
            console.error("Payload recebido:", message.toString());
        }
    }
});

// ── ENVIO DE COMANDOS PARA O PICO 2W ──────────────────────────────
function enviarComando(comando) {
    if (client.connected) {
        client.publish(TOPIC_COMANDOS, comando);
        console.log(`📤 Comando enviado: ${comando}`);
    } else {
        alert("❌ Não foi possível enviar o comando. Painel desconectado do Broker MQTT.");
    }
}

// Mapeamento seguro usando Encadeamento Opcional (?.) para evitar quebras se o ID não existir no HTML
document.getElementById("btn-ativar-alarme")?.addEventListener("click", () => enviarComando("LIGAR_ALARME"));
document.getElementById("btn-desativar-alarme")?.addEventListener("click", () => enviarComando("DESLIGAR_ALARME"));
document.getElementById("btn-acionar-combate")?.addEventListener("click", () => enviarComando("INICIAR_COMBATE"));
document.getElementById("btn-resetar-sistema")?.addEventListener("click", () => enviarComando("RESET_SISTEMA"));
document.getElementById("btn-ligar-autoridades")?.addEventListener("click", () => enviarComando("DESATIVAR_BOMBEIROS"));

document.getElementById("btn-alerta-residentes")?.addEventListener("click", () => {
    alert("Funcionalidade: Abrindo lista de contatos de emergência...");
});

// ── ATUALIZAÇÃO AUTOMÁTICA DO RELÓGIO DO HEADER ────────────────────
setInterval(() => {
    const timestampEl = document.getElementById("timestamp");
    if (timestampEl) {
        const agora = new Date();
        timestampEl.innerText = agora.toLocaleString('pt-BR');
    }
}, 1000);

// ── LOG INICIAL ────────────────────────────────────────────────────
console.log("🚀 Dashboard IoT iniciado com sucesso!");
console.log(`📡 Broker: ${BROKER}`);
console.log(`📨 Tópico de Telemetria: ${TOPIC_TELEMETRIA}`);
console.log(`📤 Tópico de Comandos: ${TOPIC_COMANDOS}`);

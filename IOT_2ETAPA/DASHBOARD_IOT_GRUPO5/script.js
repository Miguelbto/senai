// CONFIGURAÇÕES DO BROKER MQTT
// Altere para o IP do seu Raspberry Pi Pico 2W ou broker local
const MQTT_BROKER = "ws://broker.hivemq.com:8000/mqtt"; 
const TOPIC_TELEMETRIA = "pico/incendio/telemetria";
const TOPIC_COMANDOS = "pico/incendio/comandos";

// Conectando ao Broker via WebSockets
const client = mqtt.connect(MQTT_BROKER);

const conexaoStatusEl = document.getElementById("conexao-status");

client.on("connect", () => {
    console.log("Conectado ao broker MQTT com sucesso!");
    conexaoStatusEl.className = "conexao-status conectado";
    conexaoStatusEl.querySelector("span").innerHTML = "Conectado<br><small>Raspberry Pi</small>";
    
    // Inscreve-se no tópico de telemetria dos sensores do Pico
    client.subscribe(TOPIC_TELEMETRIA);
});

client.on("close", () => {
    console.log("Desconectado do Broker.");
    conexaoStatusEl.className = "conexao-status";
    conexaoStatusEl.querySelector("span").innerHTML = "Desconectado<br><small>Verifique a rede</small>";
});

// PROCESSAMENTO DE DADOS RECEBIDOS
client.on("message", (topic, message) => {
    if (topic === TOPIC_TELEMETRIA) {
        try {
            // Espera um payload JSON do Pico: 
            // {"temperatura": 28.6, "umidade": 45, "ldr": 250, "fumaca": false, "alarme": false, "alerta": "Nenhuma anomalia"}
            const dados = JSON.parse(message.toString());
            
            // Atualizando o HTML dinamicamente
            document.getElementById("txt-temperatura").innerText = dados.temperatura.toFixed(1);
            document.getElementById("txt-umidade").innerText = dados.umidade;
            document.getElementById("txt-ldr").innerText = dados.ldr;
            
            const fumacaStatusEl = document.getElementById("txt-fumaca-status");
            if(dados.fumaca) {
                fumacaStatusEl.innerText = "DETECTADO!";
                fumacaStatusEl.style.color = "#ef4444";
            } else {
                fumacaStatusEl.innerText = "Não Detectado";
                fumacaStatusEl.style.color = "white";
            }

            const alarmeStatusEl = document.getElementById("txt-alarme-status");
            if(dados.alarme) {
                alarmeStatusEl.innerText = "ATIVADO";
                alarmeStatusEl.className = "valor";
                alarmeStatusEl.style.color = "#ef4444";
            } else {
                alarmeStatusEl.innerText = "Desativado";
                alarmeStatusEl.className = "valor desativado";
                alarmeStatusEl.style.color = "#10b981";
            }

            // Mensagem de alerta inferior
            document.getElementById("txt-alerta-mensagem").innerText = dados.alerta || "Sistema operando normalmente.";

        } catch (e) {
            console.error("Erro ao processar JSON recebido do Pico:", e);
        }
    }
});

// ENVIO DE COMANDOS PARA O PICO 2W
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
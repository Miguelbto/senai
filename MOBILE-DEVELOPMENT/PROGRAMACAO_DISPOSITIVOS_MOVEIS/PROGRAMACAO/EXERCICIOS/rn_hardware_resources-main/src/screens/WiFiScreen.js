import * as Network from "expo-network";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Traduz os tipos de rede retornados pela API para labels legiveis na tela
const NetworkTypeLabel = {
  [Network.NetworkStateType.WIFI]: "Wi-Fi",
  [Network.NetworkStateType.CELLULAR]: "Dados moveis",
  [Network.NetworkStateType.BLUETOOTH]: "Bluetooth",
  [Network.NetworkStateType.ETHERNET]: "Ethernet",
  [Network.NetworkStateType.VPN]: "VPN",
  [Network.NetworkStateType.OTHER]: "Outro",
  [Network.NetworkStateType.NONE]: "Sem conexao",
  [Network.NetworkStateType.UNKNOWN]: "Desconhecido",
};

export default function WiFiScreen() {
  // useNetworkState atualiza sozinho quando o tipo/estado da conexao muda
  const networkState = Network.useNetworkState();
  const [ipAddress, setIpAddress] = useState(null);
  const [airplaneMode, setAirplaneMode] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDetails();

    // Reconsulta IP e modo aviao sempre que a rede mudar (ex: Wi-Fi para dados moveis)
    const subscription = Network.addNetworkStateListener(() => {
      fetchDetails();
    });

    return () => subscription.remove();
  }, []);

  async function fetchDetails() {
    setLoading(true);
    try {
      const ip = await Network.getIpAddressAsync();
      setIpAddress(ip);

      const airplane = await Network.isAirplaneModeEnabledAsync();
      setAirplaneMode(airplane);
    } catch {
      setIpAddress("Indisponivel");
    } finally {
      setLoading(false);
    }
  }

  const typeLabel =
    networkState.type != null ? NetworkTypeLabel[networkState.type] : "-";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Section title="Estado da conexao">
        <InfoRow
          label="Conectado"
          value={
            networkState.isConnected == null
              ? "-"
              : networkState.isConnected
                ? "Sim"
                : "Nao"
          }
          highlight={networkState.isConnected}
        />
        <InfoRow label="Tipo" value={typeLabel} />
        <InfoRow
          label="Internet disponivel"
          value={
            networkState.isInternetReachable == null
              ? "-"
              : networkState.isInternetReachable
                ? "Sim"
                : "Nao"
          }
          highlight={networkState.isInternetReachable}
        />
      </Section>

      <Section title="Informacoes do dispositivo">
        <InfoRow label="Endereco IP" value={ipAddress ?? "-"} />
        <InfoRow
          label="Modo aviao"
          value={
            airplaneMode == null ? "-" : airplaneMode ? "Ativado" : "Desativado"
          }
        />
      </Section>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={fetchDetails}
        disabled={loading}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {loading ? "Atualizando..." : "Atualizar informacoes"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.hint}>
        O estado da conexao e atualizado automaticamente ao detectar mudancas de
        rede.
      </Text>
    </ScrollView>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function InfoRow({ label, value, highlight }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text
        style={[
          styles.value,
          highlight === true && styles.valueGreen,
          highlight === false && styles.valueRed,
        ]}
      >
        {String(value)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f5f5f5", flexGrow: 1 },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: { fontSize: 14, color: "#666" },
  value: { fontSize: 14, color: "#202124", fontWeight: "500" },
  valueGreen: { color: "#0f9d58" },
  valueRed: { color: "#db4437" },
  button: {
    backgroundColor: "#0f9d58",
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 14,
  },
  buttonDisabled: { backgroundColor: "#ccc" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  hint: { fontSize: 12, color: "#999", textAlign: "center" },
});

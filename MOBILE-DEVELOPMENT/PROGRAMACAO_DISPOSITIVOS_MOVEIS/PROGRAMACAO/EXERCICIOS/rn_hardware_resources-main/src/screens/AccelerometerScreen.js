import { Accelerometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Frequencia de leitura do sensor: a cada 200ms um novo valor de x, y, z chega
const UPDATE_INTERVAL_MS = 200;

export default function AccelerometerScreen() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [active, setActive] = useState(false);
  const [available, setAvailable] = useState(null);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    // Verifica se o dispositivo possui acelerometro antes de liberar o botao de leitura
    Accelerometer.isAvailableAsync().then(setAvailable);
    return () => subscriptionRef.current?.remove();
  }, []);

  function start() {
    Accelerometer.setUpdateInterval(UPDATE_INTERVAL_MS);
    // addListener registra um callback chamado a cada nova leitura do sensor
    subscriptionRef.current = Accelerometer.addListener((measurement) => {
      setData(measurement);
    });
    setActive(true);
  }

  function stop() {
    subscriptionRef.current?.remove();
    subscriptionRef.current = null;
    setActive(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Section title="Disponibilidade">
        <InfoRow
          label="Sensor disponivel"
          value={
            available == null ? "Verificando..." : available ? "Sim" : "Nao"
          }
          highlight={available}
        />
        <InfoRow
          label="Intervalo de atualizacao"
          value={`${UPDATE_INTERVAL_MS} ms`}
        />
      </Section>

      <Section title="Leituras (em g-force)">
        <AxisBar label="X" value={data.x} color="#db4437" />
        <AxisBar label="Y" value={data.y} color="#0f9d58" />
        <AxisBar label="Z" value={data.z} color="#1a73e8" />
      </Section>

      <Section title="Valores brutos">
        <InfoRow label="X" value={data.x.toFixed(4)} />
        <InfoRow label="Y" value={data.y.toFixed(4)} />
        <InfoRow label="Z" value={data.z.toFixed(4)} />
        <InfoRow
          label="Magnitude"
          value={Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2).toFixed(4)}
        />
      </Section>

      {active ? (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#db4437" }]}
          onPress={stop}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Parar leitura</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: available === false ? "#ccc" : "#f4b400" },
          ]}
          onPress={start}
          disabled={available === false}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: "#333" }]}>
            Iniciar leitura
          </Text>
        </TouchableOpacity>
      )}

      <Text style={styles.hint}>
        1 g = 9,81 m/s². Em repouso, o eixo Z deve marcar ~1 g.
      </Text>
    </ScrollView>
  );
}

function AxisBar({ label, value, color }) {
  // Limita a leitura a 2g e converte para uma porcentagem (0 a 1) usada na barra visual
  const clamped = Math.min(Math.abs(value), 2) / 2;
  return (
    <View style={styles.axisRow}>
      <Text style={[styles.axisLabel, { color }]}>{label}</Text>
      <View style={styles.barTrack}>
        <View
          style={[
            styles.barFill,
            { width: `${clamped * 100}%`, backgroundColor: color },
          ]}
        />
      </View>
      <Text style={styles.axisValue}>{value.toFixed(3)}</Text>
    </View>
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
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: { fontSize: 14, color: "#666" },
  value: { fontSize: 14, color: "#202124", fontWeight: "500" },
  valueGreen: { color: "#0f9d58" },
  valueRed: { color: "#db4437" },
  axisRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  axisLabel: { width: 20, fontSize: 15, fontWeight: "bold" },
  barTrack: {
    flex: 1,
    height: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    marginHorizontal: 8,
    overflow: "hidden",
  },
  barFill: { height: "100%", borderRadius: 6 },
  axisValue: { width: 60, fontSize: 12, color: "#555", textAlign: "right" },
  button: {
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 14,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  hint: { fontSize: 12, color: "#999", textAlign: "center" },
});

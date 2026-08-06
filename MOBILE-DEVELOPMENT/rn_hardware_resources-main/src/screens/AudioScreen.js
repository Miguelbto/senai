import {
  RecordingPresets,
  useAudioPlayer,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import * as AudioModule from "expo-audio";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function PlaybackControls({ uri }) {
  // useAudioPlayer cria um player vinculado ao arquivo gravado (uri)
  const player = useAudioPlayer(uri);

  return (
    <View style={styles.playbackRow}>
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: "#1a73e8" }]}
        onPress={() => player.play()}
        activeOpacity={0.8}
      >
        <Text style={styles.actionButtonText}>Reproduzir</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: "#f4b400" }]}
        onPress={() => player.pause()}
        activeOpacity={0.8}
      >
        <Text style={[styles.actionButtonText, { color: "#333" }]}>Pausar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: "#555" }]}
        onPress={() => player.seekTo(0)}
        activeOpacity={0.8}
      >
        <Text style={styles.actionButtonText}>Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function AudioScreen() {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [recordingUri, setRecordingUri] = useState(null);

  // recorder controla a gravacao; recorderState reflete seu status em tempo real (isRecording, duracao, etc.)
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);

  // Sem essa permissao concedida pelo usuario, o microfone nao pode ser acessado
  async function requestPermission() {
    const { status } = await AudioModule.requestRecordingPermissionsAsync();
    setPermissionStatus(status);
  }

  async function startRecording() {
    setRecordingUri(null);
    // prepareToRecordAsync configura o recorder antes de iniciar a captura de audio
    await recorder.prepareToRecordAsync();
    recorder.record();
  }

  async function stopRecording() {
    await recorder.stop();
    // Apos parar, recorder.uri aponta para o arquivo de audio salvo no dispositivo
    setRecordingUri(recorder.uri);
  }

  const granted = permissionStatus === "granted";
  const isRecording = recorderState.isRecording;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Section title="Permissao de microfone">
        <InfoRow label="Status" value={permissionStatus ?? "Nao solicitada"} />
        <TouchableOpacity
          style={styles.button}
          onPress={requestPermission}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Solicitar permissao</Text>
        </TouchableOpacity>
      </Section>

      <Section title="Gravacao">
        <InfoRow
          label="Gravando"
          value={isRecording ? "Sim" : "Nao"}
          highlight={isRecording}
        />
        <InfoRow
          label="Duracao"
          value={
            recorderState.durationMillis != null
              ? `${(recorderState.durationMillis / 1000).toFixed(1)} s`
              : "0,0 s"
          }
        />
        <InfoRow
          label="URI"
          value={recorder.uri ? ".../" + recorder.uri.split("/").pop() : "-"}
        />

        {isRecording ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#db4437" }]}
            onPress={stopRecording}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Parar gravacao</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: granted ? "#db4437" : "#ccc" },
            ]}
            onPress={startRecording}
            disabled={!granted}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Iniciar gravacao</Text>
          </TouchableOpacity>
        )}
      </Section>

      {recordingUri && (
        <Section title="Reproducao">
          <Text style={styles.uriText}>Arquivo gravado com sucesso.</Text>
          <PlaybackControls uri={recordingUri} />
        </Section>
      )}
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
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: { fontSize: 14, color: "#666" },
  value: {
    fontSize: 14,
    color: "#202124",
    fontWeight: "500",
    flexShrink: 1,
    textAlign: "right",
  },
  valueGreen: { color: "#0f9d58" },
  valueRed: { color: "#db4437" },
  button: {
    backgroundColor: "#1a73e8",
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  uriText: { fontSize: 13, color: "#555", marginBottom: 10 },
  playbackRow: { flexDirection: "row", gap: 8 },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: { color: "#fff", fontWeight: "bold", fontSize: 13 },
});

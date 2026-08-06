import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CameraScreen() {
  // useCameraPermissions ja retorna o status atual e uma funcao para solicitar acesso
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");
  const [photo, setPhoto] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);

  async function takePicture() {
    if (!cameraReady) return;
    // cameraRef.current e a referencia nativa da camera; takePictureAsync captura a foto
    const result = await cameraRef.current.takePictureAsync({ quality: 0.7 });
    setPhoto(result);
  }

  function toggleFacing() {
    // Alterna entre camera traseira e frontal
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  }

  // permission null = ainda carregando o status; permission.granted false = precisa solicitar
  if (!permission) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>Verificando permissoes...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>
          Permissao de camera necessaria para usar este modulo.
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
          activeOpacity={0.8}
        >
          <Text style={styles.permissionButtonText}>Solicitar permissao</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          onCameraReady={() => setCameraReady(true)}
        />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#555" }]}
          onPress={toggleFacing}
          activeOpacity={0.8}
        >
          <Text style={styles.actionButtonText}>
            Trocar: {facing === "back" ? "Traseira" : "Frontal"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: cameraReady ? "#ab47bc" : "#ccc" },
          ]}
          onPress={takePicture}
          disabled={!cameraReady}
          activeOpacity={0.8}
        >
          <Text style={styles.actionButtonText}>Tirar foto</Text>
        </TouchableOpacity>
      </View>

      {photo && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Foto capturada</Text>
          <Image
            source={{ uri: photo.uri }}
            style={styles.preview}
            resizeMode="contain"
          />
          <View style={styles.photoInfo}>
            <InfoRow label="Largura" value={`${photo.width} px`} />
            <InfoRow label="Altura" value={`${photo.height} px`} />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{String(value)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f5f5f5", flexGrow: 1 },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  message: {
    fontSize: 15,
    color: "#444",
    textAlign: "center",
    marginBottom: 16,
  },
  permissionButton: {
    backgroundColor: "#ab47bc",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  cameraContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 14,
    height: 340,
    backgroundColor: "#000",
  },
  camera: { flex: 1 },
  controls: { flexDirection: "row", gap: 10, marginBottom: 14 },
  actionButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
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
  preview: { width: "100%", height: 260, borderRadius: 8, marginBottom: 10 },
  photoInfo: { marginTop: 4 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: { fontSize: 14, color: "#666" },
  value: { fontSize: 14, color: "#202124", fontWeight: "500" },
});

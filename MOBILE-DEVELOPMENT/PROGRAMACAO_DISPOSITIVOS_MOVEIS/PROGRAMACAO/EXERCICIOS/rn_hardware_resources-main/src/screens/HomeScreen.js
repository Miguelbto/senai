import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Lista de modulos exibidos como cards na tela inicial.
// Cada item aponta para uma rota registrada na navegacao (App.js).
const modules = [
  {
    route: "GPS",
    label: "GPS",
    description: "Localização, coordenadas e rastreamento em tempo real",
    color: "#1a73e8",
  },
  {
    route: "WiFi",
    label: "Wi-Fi / Rede",
    description: "Tipo de conexão, IP e estado da rede",
    color: "#0f9d58",
  },
  {
    route: "Acelerometro",
    label: "Acelerometro",
    description: "Leitura dos eixos X, Y e Z em tempo real",
    color: "#f4b400",
  },
  {
    route: "Audio",
    label: "Audio",
    description: "Gravacao e reproducao de audio",
    color: "#db4437",
  },
  {
    route: "Camera",
    label: "Camera",
    description: "Preview ao vivo, captura de foto e troca de camera",
    color: "#ab47bc",
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subtitle}>Selecione um modulo para explorar</Text>
      {modules.map((mod) => (
        // navigation.navigate troca a tela atual pela rota do modulo escolhido
        <TouchableOpacity
          key={mod.route}
          style={[styles.card, { borderLeftColor: mod.color }]}
          onPress={() => navigation.navigate(mod.route)}
          activeOpacity={0.75}
        >
          <Text style={[styles.cardTitle, { color: mod.color }]}>
            {mod.label}
          </Text>
          <Text style={styles.cardDescription}>{mod.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 18,
    marginBottom: 14,
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: "#555",
  },
});

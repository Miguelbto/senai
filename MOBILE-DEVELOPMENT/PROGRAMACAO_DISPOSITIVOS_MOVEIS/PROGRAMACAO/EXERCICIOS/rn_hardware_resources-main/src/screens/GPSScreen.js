import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function GPSScreen() {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [location, setLocation] = useState(null);
  const [watching, setWatching] = useState(false);
  const [error, setError] = useState(null);
  const watchRef = useRef(null);

  // Ao desmontar a tela, cancela a assinatura de rastreamento para evitar leitura em segundo plano
  useEffect(() => {
    return () => {
      watchRef.current?.remove();
    };
  }, []);

  // Pede autorizacao do usuario para acessar o GPS enquanto o app esta em uso
  async function requestPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status);
    if (status !== "granted") {
      setError("Permissao de localizacao negada.");
    }
  }

  // Le a posicao atual uma unica vez (nao fica escutando mudancas)
  async function getLocation() {
    setError(null);
    try {
      const result = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(result);
    } catch (e) {
      setError("Nao foi possivel obter a localizacao.");
    }
  }

  // watchPositionAsync mantem uma assinatura ativa, chamando o callback a cada 1s ou 1m de deslocamento
  async function startWatching() {
    setError(null);
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (result) => setLocation(result),
    );
    watchRef.current = subscription;
    setWatching(true);
  }

  function stopWatching() {
    watchRef.current?.remove();
    watchRef.current = null;
    setWatching(false);
  }

  const granted = permissionStatus === "granted";

  // Delta pequeno gera um zoom mais proximo, centralizado na posicao atual
  const mapRegion = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }
    : null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Section title="Permissao">
        <InfoRow label="Status" value={permissionStatus ?? "Nao solicitada"} />
        <Button
          label="Solicitar permissao"
          onPress={requestPermission}
          color="#1a73e8"
        />
      </Section>

      <Section title="Localizacao atual">
        <Button
          label="Obter localizacao"
          onPress={getLocation}
          color="#1a73e8"
          disabled={!granted}
        />
      </Section>

      <Section title="Rastreamento em tempo real">
        {watching ? (
          <Button
            label="Parar rastreamento"
            onPress={stopWatching}
            color="#db4437"
          />
        ) : (
          <Button
            label="Iniciar rastreamento"
            onPress={startWatching}
            color="#0f9d58"
            disabled={!granted}
          />
        )}
      </Section>

      {error && <Text style={styles.error}>{error}</Text>}

      {location && (
        <>
          <Section title="Mapa">
            <MapView style={styles.map} region={mapRegion}>
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Voce esta aqui"
                description={`${location.coords.latitude.toFixed(5)}, ${location.coords.longitude.toFixed(5)}`}
              />
            </MapView>
          </Section>

          <Section title="Dados da localizacao">
            <InfoRow
              label="Latitude"
              value={location.coords.latitude.toFixed(6)}
            />
            <InfoRow
              label="Longitude"
              value={location.coords.longitude.toFixed(6)}
            />
            <InfoRow
              label="Altitude"
              value={
                location.coords.altitude != null
                  ? `${location.coords.altitude.toFixed(1)} m`
                  : "N/A"
              }
            />
            <InfoRow
              label="Precisao"
              value={`${location.coords.accuracy?.toFixed(1)} m`}
            />
            <InfoRow
              label="Velocidade"
              value={
                location.coords.speed != null && location.coords.speed >= 0
                  ? `${(location.coords.speed * 3.6).toFixed(1)} km/h`
                  : "N/A"
              }
            />
            <InfoRow
              label="Timestamp"
              value={new Date(location.timestamp).toLocaleTimeString("pt-BR")}
            />
          </Section>
        </>
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

function InfoRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{String(value)}</Text>
    </View>
  );
}

function Button({ label, onPress, color, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: disabled ? "#ccc" : color }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
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
  map: { width: "100%", height: 280, borderRadius: 8 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: { fontSize: 14, color: "#666" },
  value: { fontSize: 14, color: "#202124", fontWeight: "500" },
  button: {
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  error: { color: "#db4437", textAlign: "center", marginBottom: 12 },
});

// ============================================
// TELA: ConfigScreen
// ============================================

import { StyleSheet, Text, View } from "react-native";

export default function ConfigScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configuracoes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    padding: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

// ============================================
// COMPONENTE:
// ============================================
// SCAFFOLD - Arquivo base para a aula
// Os alunos recebem este arquivo ANTES da aula
// ============================================

import { View, Text, StyleSheet } from "react-native";

export default function Scaffold() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}></Text>

      {/* VAMOS CONSTRUIR AQUI */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4285f4",
    marginBottom: 8,
  },
  exemplo: {
    width: "80%",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
});

// ============================================
// COMPONENTE: ScrollView
// ============================================
// MOMENTO 1 - Conceitos fundamentais
// Live coding: professor escreve, alunos acompanham
// ============================================

import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function ScrollViewExemplos() {
  // Dados para os exemplos
  const itens = Array.from({ length: 6 }, (_, i) => `Item ${i + 1}`);
  const cores = ["#e53935", "#1565c0", "#2e7d32", "#ffa000"];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>ScrollView</Text>

      {/* ETAPA 1: Scroll vertical
          Dica: troque height: 120 por 80, 200
          ScrollView permite rolar conteudo que nao cabe na tela */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>1. Scroll vertical</Text>
        <ScrollView style={{ height: 120 }}>
          {itens.map((item) => (
            <View key={item} style={styles.item}>
              <Text>{item}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* ETAPA 2: Scroll horizontal
          Dica: troque width: 80 por 120, 60
          Use a prop horizontal para scroll na horizontal */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>2. Scroll horizontal</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cores.map((cor) => (
            <View key={cor} style={[styles.card, { backgroundColor: cor }]} />
          ))}
        </ScrollView>
      </View>
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
  item: {
    padding: 12,
    backgroundColor: "#f5f5f5",
    marginBottom: 4,
    borderRadius: 4,
  },
  card: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
});

// ============================================
// COMPONENTE: FlatList
// ============================================
// MOMENTO 1 - Conceitos fundamentais
// Live coding: professor escreve, alunos acompanham
// ============================================

import { View, Text, FlatList, StyleSheet } from "react-native";

export default function FlatListExemplos() {
  // Dados para os exemplos
  const alunos = [
    { id: "1", nome: "Ana", nota: 9.5 },
    { id: "2", nome: "Bruno", nota: 7.8 },
    { id: "3", nome: "Carla", nota: 6.5 },
  ];

  const cores = [
    { id: "1", cor: "#e53935" },
    { id: "2", cor: "#1565c0" },
    { id: "3", cor: "#2e7d32" },
    { id: "4", cor: "#ffa000" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>FlatList</Text>

      {/* ETAPA 1: FlatList basico (data + keyExtractor + renderItem)
          Dica: adicione mais alunos no array
          FlatList precisa de 3 props: data, keyExtractor e renderItem */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>1. FlatList basico</Text>
        <FlatList
          data={alunos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.linha}>
              <Text>{item.nome}</Text>
              <Text style={{ fontWeight: "bold" }}>{item.nota}</Text>
            </View>
          )}
          scrollEnabled={false}
        />
      </View>

      {/* ETAPA 2: numColumns (grid)
          Dica: troque numColumns por 2, 3, 4
          numColumns transforma a lista em grid */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>2. Grid (numColumns)</Text>
        <FlatList
          data={cores}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={[styles.gridItem, { backgroundColor: item.cor }]} />
          )}
          scrollEnabled={false}
        />
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
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f5f5f5",
    marginBottom: 4,
    borderRadius: 4,
  },
  gridItem: {
    flex: 1,
    height: 60,
    margin: 4,
    borderRadius: 8,
  },
});

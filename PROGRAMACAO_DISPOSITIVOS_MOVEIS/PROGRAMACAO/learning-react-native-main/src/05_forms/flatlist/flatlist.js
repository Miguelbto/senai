// ============================================
// COMPONENTE: FlatList
// ============================================
// MOMENTO 1 - Conceitos fundamentais
// Live coding: professor escreve, alunos acompanham
// ============================================

import { View, Text, FlatList, StyleSheet } from "react-native";

export default function FlatListExemplos() {
  // Dados para os exemplos
  // Lista grande para demonstrar o scroll da FlatList
  const alunos = [
    { id: "1", nome: "Ana", nota: 9.5 },
    { id: "2", nome: "Bruno", nota: 7.8 },
    { id: "3", nome: "Carla", nota: 6.5 },
    { id: "4", nome: "Joao", nota: 8.0 },
    { id: "5", nome: "Miguel", nota: 7.2 },
    { id: "6", nome: "Fernando", nota: 5.9 },
    { id: "7", nome: "Leticia", nota: 8.8 },
    { id: "8", nome: "Pedro", nota: 6.0 },
    { id: "9", nome: "Julia", nota: 9.0 },
    { id: "10", nome: "Lucas", nota: 7.5 },
    { id: "11", nome: "Maria", nota: 8.3 },
    { id: "12", nome: "Rafael", nota: 6.7 },
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
          FlatList precisa de 3 props: data, keyExtractor e renderItem
          scrollEnabled={false} trava o scroll — troque para true e veja a diferenca */}
      <View style={styles.exemploLista}>
        <Text style={styles.subtitulo}>
          1. FlatList basico (scrollEnabled=false)
        </Text>
        <FlatList
          data={alunos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.linha}>
              <Text>{item.nome}</Text>
              <Text style={{ fontWeight: "bold" }}>{item.nota}</Text>
            </View>
            // Componentizar
          )}
          scrollEnabled={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 60,
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

  exemploLista: {
    width: "80%",
    // height: 250,
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
});

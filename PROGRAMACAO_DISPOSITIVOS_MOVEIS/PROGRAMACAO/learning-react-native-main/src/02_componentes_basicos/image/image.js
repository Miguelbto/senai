// ============================================
// COMPONENTE: Image
// ============================================
// MOMENTO 1 - Conceitos fundamentais
// Live coding: professor escreve, alunos acompanham
// ============================================

import { View, Text, Image, StyleSheet } from "react-native";

export default function ImageExemplos() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Image</Text>

      {/* ETAPA 1: Imagem remota (URI)
          Dica: troque width: 200, height: 100 por outros valores
          Imagens remotas usam source={{ uri: "..." }} e PRECISAM de width e height */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>1. Imagem remota</Text>
        <Image
          source={{ uri: "https://picsum.photos/200/100" }}
          style={{ width: 200, height: 100, borderRadius: 8 }}
        />
      </View>

      {/* ETAPA 2: resizeMode
          Dica: troque "cover" por "contain", "stretch", "center"
          resizeMode controla como a imagem se ajusta ao espaco */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>2. resizeMode</Text>
        <Image
          source={{ uri: "https://picsum.photos/300/150" }}
          style={{ width: "100%", height: 100, borderRadius: 8 }}
          resizeMode="cover"
        />
        <Text style={styles.legenda}>resizeMode: cover</Text>
      </View>

      {/* ETAPA 3: Imagem circular (avatar)
          Dica: troque borderRadius: 40 por 0, 10, 20 e compare
          Para circulo perfeito: borderRadius = width / 2 */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>3. Avatar circular</Text>
        <Image
          source={{ uri: "https://picsum.photos/100/100" }}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
        <Text style={styles.legenda}>borderRadius: 40 (metade de 80)</Text>
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
    alignItems: "center",
  },
  legenda: {
    fontSize: 12,
    color: "#757575",
    marginTop: 8,
  },
});

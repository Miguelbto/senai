// ============================================
// COMPONENTE: View e Flexbox
// ============================================
// MOMENTO 1 - Conceitos fundamentais
// Live coding: professor escreve, alunos acompanham
// ============================================

import { View, Text, StyleSheet } from "react-native";

export default function ViewExemplos01() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>View e Flexbox</Text>

      {/* ETAPA 1: flexDirection
          Dica: troque "column" por "row"
          flexDirection define a direcao dos filhos: column (vertical) ou row (horizontal) */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>1. flexDirection</Text>
        <View style={{ flexDirection: "column", gap: 8 }}>
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
        </View>
      </View>

      {/* ETAPA 2: justifyContent
          Dica: troque "space-between" por "flex-start", "center", "flex-end", "space-around"
          justifyContent alinha os filhos no eixo principal */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>2. justifyContent</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            height: 60,
          }}
        >
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
        </View>
      </View>

      {/* ETAPA 3: alignItems
          Dica: troque "center" por "flex-start", "flex-end", "stretch"
          alignItems alinha os filhos no eixo cruzado */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>3. alignItems</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 80,
            gap: 8,
          }}
        >
          <View style={[styles.box, { height: 30 }]} />
          <View style={[styles.box, { height: 50 }]} />
          <View style={[styles.box, { height: 40 }]} />
        </View>
      </View>
      {/* 
      {/* ETAPA 4: gap
          Dica: troque 16 por 4, 8, 24
          gap define o espacamento entre os filhos 
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>4. gap</Text>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
        </View>
      </View> */}

      {/* ETAPA 5: padding e margin
          Dica: troque padding: 20 por 0, 10, 30
          padding = espaco interno, margin = espaco externo */}
      {/* <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>5. padding e margin</Text>
        <View style={{ backgroundColor: "#ddd", padding: 20 }}>
          <View style={[styles.box, { marginBottom: 20 }]} />
        </View>
      </View> */}
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
  box: {
    width: 50,
    height: 50,
    backgroundColor: "#4285f4",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

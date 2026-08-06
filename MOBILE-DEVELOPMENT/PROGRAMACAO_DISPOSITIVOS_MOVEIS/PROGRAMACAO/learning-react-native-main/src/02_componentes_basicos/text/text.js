// ============================================
// COMPONENTE: Text
// ============================================
// MOMENTO 1 - Conceitos fundamentais
// Live coding: professor escreve, alunos acompanham
// ============================================

import { View, Text, StyleSheet } from "react-native";

export default function TextExemplos() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Text</Text>

      {/* ETAPA 1: fontSize
          Dica: troque 12, 18, 24 por outros valores
          fontSize controla o tamanho do texto */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>1. fontSize</Text>
        <Text style={{ fontSize: 12 }}>fontSize: 12</Text>
        <Text style={{ fontSize: 18 }}>fontSize: 18</Text>
        <Text style={{ fontSize: 24 }}>fontSize: 24</Text>
      </View>

      {/* ETAPA 2: fontWeight e fontStyle
          Dica: troque "bold" por "normal", "italic" por "normal"
          fontWeight controla o peso, fontStyle o estilo */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>2. fontWeight e fontStyle</Text>
        <Text style={{ fontWeight: "bold" }}>fontWeight: bold</Text>
        <Text style={{ fontStyle: "italic" }}>fontStyle: italic</Text>
      </View>

      {/* ETAPA 3: textAlign
          Dica: troque "left", "center", "right"
          textAlign controla o alinhamento horizontal do texto */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>3. textAlign</Text>
        <Text style={{ textAlign: "left" }}>left</Text>
        <Text style={{ textAlign: "center" }}>center</Text>
        <Text style={{ textAlign: "right" }}>right</Text>
      </View>

      {/* ETAPA 4: textTransform
          Dica: troque "uppercase", "lowercase", "capitalize"
          textTransform transforma o texto automaticamente */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>4. textTransform</Text>
        <Text style={{ textTransform: "uppercase" }}>uppercase</Text>
        <Text style={{ textTransform: "capitalize" }}>capitalize aqui</Text>
      </View>

      {/* ETAPA 5: Text aninhado
          Dica: troque "bold" por "italic", "#e53935" por "#4285f4"
          Use Text dentro de Text para estilizar partes do texto */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>5. Text aninhado</Text>
        <Text>
          Palavra <Text style={{ fontWeight: "bold" }}>negrito</Text> e{" "}
          <Text style={{ color: "#e53935" }}>colorida</Text>
        </Text>
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
});

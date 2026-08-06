// ============================================
// COMPONENTE: StyleSheet
// ============================================
// MOMENTO 1 - Conceitos fundamentais
// Live coding: professor escreve, alunos acompanham
// ============================================

import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function StyleSheetExemplos() {
  const [ativo, setAtivo] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>StyleSheet</Text>

      {/* ETAPA 1: StyleSheet vs inline
          Dica: compare o codigo dos dois blocos
          StyleSheet.create e mais eficiente que estilos inline */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>1. StyleSheet vs inline</Text>
        <View style={{ backgroundColor: "#fff3e0", padding: 10, marginBottom: 8 }}>
          <Text>Inline (menos eficiente)</Text>
        </View>
        <View style={styles.box}>
          <Text>StyleSheet (recomendado)</Text>
        </View>
      </View>

      {/* ETAPA 2: Combinando estilos com array
          Dica: remova styles.boxDestacado e veja a diferenca
          Use array [...] para aplicar varios estilos ao mesmo componente */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>2. Combinando estilos</Text>
        <View style={[styles.box, styles.boxDestacado]}>
          <Text>Estilos combinados</Text>
        </View>
      </View>

      {/* ETAPA 3: Estilos condicionais
          Dica: toque no botao para alternar o estado
          Use condicao && styles.estilo para aplicar estilos dinamicamente */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>3. Estilos condicionais</Text>
        <TouchableOpacity
          style={[styles.botao, ativo && styles.botaoAtivo]}
          onPress={() => setAtivo(!ativo)}
        >
          <Text style={styles.textoBotao}>
            {ativo ? "Ativo" : "Inativo"}
          </Text>
        </TouchableOpacity>
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
  box: {
    backgroundColor: "#e8f5e9",
    padding: 10,
    borderRadius: 4,
  },
  boxDestacado: {
    backgroundColor: "#4285f4",
    borderWidth: 2,
    borderColor: "#1565c0",
  },
  botao: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderWidth: 2,
    borderColor: "#4285f4",
  },
  botaoAtivo: {
    backgroundColor: "#4285f4",
  },
  textoBotao: {
    fontWeight: "bold",
    color: "#333",
  },
});

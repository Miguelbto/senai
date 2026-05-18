// ============================================
// COMPONENTE: TouchableOpacity
// ============================================
// MOMENTO 1 - Conceitos fundamentais
// Live coding: professor escreve, alunos acompanham
// ============================================

import { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";

export default function TouchableExemplos() {
  const [contador, setContador] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>TouchableOpacity</Text>

      {/* ETAPA 1: onPress
          Dica: troque a mensagem do Alert.alert
          onPress executa uma funcao quando o usuario toca no botao */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>1. onPress</Text>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => Alert.alert("Toque", "Voce tocou!")}
        >
          <Text style={styles.textoBotao}>Toque aqui</Text>
        </TouchableOpacity>
      </View>

      {/* ETAPA 2: activeOpacity
          Dica: troque 0.7 por 0.2, 0.5, 0.9
          activeOpacity controla a transparencia ao tocar (padrao: 0.2) */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>2. activeOpacity</Text>
        <TouchableOpacity
          style={styles.botao}
          activeOpacity={0.7}
          onPress={() => {}}
        >
          <Text style={styles.textoBotao}>activeOpacity: 0.7</Text>
        </TouchableOpacity>
      </View>

      {/* ETAPA 3: Contador com useState
          Dica: troque +1 e -1 por +5 e -5
          Combinando TouchableOpacity com useState para criar interatividade */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>3. Contador</Text>
        <Text style={styles.contador}>{contador}</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            style={[styles.botao, { flex: 1 }]}
            onPress={() => setContador(contador - 1)}
          >
            <Text style={styles.textoBotao}>-1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.botao, { flex: 1 }]}
            onPress={() => setContador(contador + 1)}
          >
            <Text style={styles.textoBotao}>+1</Text>
          </TouchableOpacity>
        </View>
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
  botao: {
    backgroundColor: "#4285f4",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
  contador: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "bold",
  },
});

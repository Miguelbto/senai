// ============================================
// AULA: Renderizacao Condicional
// ============================================
// MOMENTO 1 - Conceitos fundamentais
// Live coding: professor escreve, alunos acompanham
// ============================================

import { View, Text, StyleSheet } from "react-native";

export default function Condicionais() {
  // Variaveis para os exemplos
  const logado = true;
  const temNotificacoes = false;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Condicionais</Text>

      {/* ETAPA 1: Ternario (? :)
          Dica: troque true por false na variavel "logado"
          Ternario escolhe entre dois valores: condicao ? valorA : valorB */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>1. Ternario</Text>
        <Text>Status: {logado ? "Logado" : "Deslogado"}</Text>
        <Text>
          {logado ? "Bem-vindo de volta!" : "Faca login para continuar"}
        </Text>
      </View>

      {/* ETAPA 2: Operador && (AND)
          Dica: troque false por true na variavel "temNotificacoes"
          && mostra o componente SOMENTE se a condicao for true */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>2. Operador &&</Text>
        <Text>Notificacoes:</Text>
        {temNotificacoes && (
          <Text style={styles.destaque}>Voce tem novas notificacoes!</Text>
        )}
        {!temNotificacoes && <Text>Nenhuma notificacao</Text>}
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
  destaque: {
    padding: 8,
    backgroundColor: "#fff3e0",
    borderRadius: 4,
    marginBottom: 8,
    fontWeight: "bold",
  },
});

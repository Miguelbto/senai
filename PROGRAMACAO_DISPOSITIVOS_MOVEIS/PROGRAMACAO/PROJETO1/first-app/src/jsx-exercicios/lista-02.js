import React from "react"; // Adicionado React
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function Lista02Exer() {
  
  // 1. Função corrigida com os retornos e fechamento de chaves
  function calcularNota(not) {
    if (not >= 7) {
      return <Text style={styles.Aprovado}>Aprovado</Text>;
    } else if (not >= 5 && not < 7) {
      return <Text style={styles.Recuperacao}>Recuperação</Text>;
    } else {
      return <Text style={styles.Reprovado}>Reprovado</Text>;
    }
  }

  const loja_aberta = true;
  const tem_promocao = true;
  const nota = 7.5;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Lista 02 - Miguel</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Exercício 1 - Operador Ternário</Text>
        {/* Correção do ternário aqui */}
        <Text style={styles.texto}>
          Status: {loja_aberta ? "Aberto" : "Fechado"}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Exercício 2 - Operador &&</Text>
        {tem_promocao && (
          <Text style={styles.texto}>Promoção ativa! Aproveite os descontos</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Exercício 3 - Múltiplas Condições</Text>
        {/* Chamando a função correta */}
        <View>{calcularNota(nota)}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingTop: 60 },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#212121",
  },
  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1565C0",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 8,
  },
  texto: { fontSize: 14, color: "#424242", lineHeight: 22 },
  Aprovado: { fontSize: 14, color: "green", fontWeight: "bold" },
  Recuperacao: { fontSize: 14, color: "orange", fontWeight: "bold" },
  Reprovado: { fontSize: 14, color: "red", fontWeight: "bold" },
});
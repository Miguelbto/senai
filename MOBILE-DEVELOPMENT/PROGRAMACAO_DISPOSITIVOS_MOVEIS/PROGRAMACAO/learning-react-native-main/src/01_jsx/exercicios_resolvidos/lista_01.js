import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function Lista01() {
  const linguagem = "Javascript";
  const ano = 2025;
  const preco = 49.9;

  function formatarPreco(value) {
    return `R$${value.toFixed(2)}`;
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Lista 01 - Daniel Manoel</Text>

      {/* Enunciado do Exercicio */}
      {/* ... */}

      <View style={styles.card}>
        <Text style={styles.label}>Exercício 1 - View com Text</Text>
        <Text>Olá</Text>
        <Text>Mundo</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}> Exercício 2 - Variáveis no JSX</Text>
        <Text>Linguagem: {linguagem}</Text>
        <Text> Ano: {ano}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}> Exercício 3 - Função no JSX</Text>
        <Text>Preço: {formatarPreco(100)}</Text>
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
});

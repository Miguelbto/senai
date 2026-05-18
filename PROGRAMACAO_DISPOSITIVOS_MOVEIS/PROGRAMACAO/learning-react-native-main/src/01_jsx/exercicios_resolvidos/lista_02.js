import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function Lista02() {
  const loja_aberta = true;
  const tem_promocao = true;
  const nota = 6;

  function calcNota(nota) {
    if (nota >= 7) {
      return <Text style={{ color: "green" }}>Aprovado!</Text>;
    } else if (nota >= 5 && nota < 7) {
      return <Text style={{ color: "orange" }}>Recuperação!</Text>;
    }
    return <Text style={{ color: "red" }}>Reprovado!</Text>;
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Lista 02 - Daniel Manoel</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Exercício 1 - Operador ternário</Text>
        <Text>{loja_aberta ? "Status: Aberto" : "Status: Fechado"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Exercício 2 - Operador &&</Text>
        {tem_promocao && <Text>Promoção Ativa! Aproveite os descontos</Text>}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Exercício 3 - Condicional com Múltiplas Condições
        </Text>
        {nota < 0 ? <Text>Nenhuma nota encontrada!</Text> : calcNota(nota)}
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

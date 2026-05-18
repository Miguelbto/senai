// ============================================
// EXERCICIO 01 - Props Basicas
// ============================================
// Crie um componente chamado "Apresentacao" que recebe
// as props "nome" e "profissao" e exibe:
//   "Meu nome e [nome] e sou [profissao]"
//
// Depois, use o componente 3 vezes com dados diferentes.
// ============================================

import { View, Text, StyleSheet } from "react-native";

// Crie o componente Apresentacao aqui

export default function Exercicio01() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Exercicio 01 - Props Basicas</Text>

      {/* Use o componente Apresentacao 3 vezes aqui */}
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    width: "80%",
  },
  texto: {
    fontSize: 16,
  },
});

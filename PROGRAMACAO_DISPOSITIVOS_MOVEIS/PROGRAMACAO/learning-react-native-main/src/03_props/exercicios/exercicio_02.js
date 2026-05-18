// ============================================
// EXERCICIO 02 - Props com Estilo Dinamico
// ============================================
// Crie um componente chamado "CaixaColorida" que recebe:
//   - texto (string)
//   - corFundo (string - cor de fundo)
//   - corTexto (string - cor do texto)
//
// Use o componente para criar 4 caixas com cores diferentes.
// ============================================

import { View, Text, StyleSheet } from "react-native";

// Crie o componente CaixaColorida aqui

export default function Exercicio02() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Exercicio 02 - Estilo Dinamico</Text>

      {/* Use o componente CaixaColorida 4 vezes aqui */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    gap: 12,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

// ============================================
// TELA: HomeScreen
// ============================================

import { StyleSheet, Text, View, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Home</Text>
      <Button
        title="Ir para tela de Detalhes"
        onPress={() =>
          navigation.navigate("Detalhe", {
            titulo: "Pedido 1",
            descricao: "Nhoque ao molho",
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    padding: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

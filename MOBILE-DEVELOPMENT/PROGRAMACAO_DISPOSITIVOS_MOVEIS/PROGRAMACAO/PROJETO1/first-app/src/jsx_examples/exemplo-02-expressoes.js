import { View, Text, StyleSheet } from "react-native";

export default function Exemplo02() {
    const nome = "Maria";
    const idade = 20;
    const preco = 40.6;

    const usuario = {
        nome: "Ana",
        cidade: "Salto",
    };
  return (
    <View style={styles.container} >
      <Text style={styles.titulo}>1. Variaveis</Text> 
      <Text style={styles.subtitulo}>Variaveis Comuns</Text> 
      <View style={styles.exemplo}>
        <Text style={styles.exemplo}>Nome: {nome.toUpperCase()}</Text>
        <Text style={styles.exemplo}>Idade: {idade}</Text>
        <Text style={styles.exemplo}>Preço: {preco}</Text>
      </View>
      <View style={styles.exemplo}>
        <Text style={styles.exemplo}>Nome: {usuario.nome}</Text>
        <Text style={styles.exemplo}>Cidade: {usuario.cidade}</Text>
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
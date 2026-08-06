// ============================================
// EXERCICIO 05 - Desafio: Cardapio Digital
// ============================================
// Monte a tela de um cardapio de restaurante.
//
// TAREFA 1: Crie um componente "ItemMenu" que recebe:
//   { nome, descricao, preco, vegetariano }
//   Use desestruturacao com valor padrao:
//   vegetariano = false
//
// TAREFA 2: Se o item for vegetariano, mostre uma
//   etiqueta verde "[V]" ao lado do nome.
//
// TAREFA 3: Crie um componente "SecaoMenu" que recebe:
//   { titulo, children }
//   Ele serve como agrupador (ex: "Entradas", "Pratos").
//   Pesquise sobre a prop especial "children" do React.
//
// TAREFA 4: Monte o cardapio com pelo menos 2 secoes
//   e 3 itens em cada uma.
// ============================================

import { View, Text, StyleSheet, ScrollView } from "react-native";

// Crie o componente SecaoMenu aqui

// Crie o componente ItemMenu aqui

export default function Exercicio05() {
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Exercicio 05 - Cardapio Digital</Text>

        {/* Monte o cardapio aqui usando SecaoMenu e ItemMenu */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 40,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  secao: {
    width: "85%",
    marginBottom: 20,
  },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#4285f4",
    paddingBottom: 4,
  },
  item: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemNome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemVeg: {
    color: "#34a853",
    fontWeight: "bold",
  },
  itemPreco: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4285f4",
  },
  itemDescricao: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
});

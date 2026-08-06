// ============================================
// EXERCICIO 03 - Desestruturacao
// ============================================
// Refatore o componente ProdutoCard abaixo:
//
// TAREFA 1: Troque "props.algo" por desestruturacao
//           no parametro da funcao.
// TAREFA 2: Adicione um valor padrao para "estoque"
//           (padrao: 0) e para "disponivel" (padrao: true).
// TAREFA 3: Quando estoque for 0, mostre "Esgotado"
//           em vermelho no lugar do numero.
// ============================================

import { View, Text, StyleSheet } from "react-native";

// REFATORE este componente usando desestruturacao
function ProdutoCard(props) {
  return (
    <View style={styles.card}>
      <Text style={styles.produtoNome}>{props.nome}</Text>
      <Text style={styles.produtoPreco}>R$ {props.preco}</Text>
      <Text style={styles.produtoEstoque}>Estoque: {props.estoque}</Text>
    </View>
  );
}

export default function Exercicio03() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Exercicio 03 - Desestruturacao</Text>

      <ProdutoCard nome="Camiseta" preco="49.90" estoque={12} />
      <ProdutoCard nome="Bone" preco="29.90" estoque={5} />
      <ProdutoCard nome="Mochila" preco="89.90" />
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
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    width: "80%",
  },
  produtoNome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  produtoPreco: {
    fontSize: 14,
    color: "#34a853",
    marginTop: 4,
  },
  produtoEstoque: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});

import { View, Text, StyleSheet } from "react-native";

export default function Exercicio20_2A() {
  return (
    <View style={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.label}>Promoção</Text>
      </View>

      {/* Cards: 1:1:2 */}
      <View style={styles.cardsRow}>
        <View style={[styles.cell, styles.green, { flex: 1 }]}>
          <Text style={styles.label}>Card A</Text>
        </View>
        <View style={[styles.cell, styles.blue, { flex: 1 }]}>
          <Text style={styles.label}>Card B</Text>
        </View>
        <View style={[styles.cell, styles.orange, { flex: 2 }]}>
          <Text style={styles.label}>Card C</Text>
        </View>
      </View>

      {/* Destaque */}
      <View style={[styles.cell, styles.darkBlue, styles.destaque]}>
        <Text style={styles.label}>Destaque</Text>
      </View>

      {/* Categorias */}
      <View style={styles.categoriesRow}>
        <View style={[styles.cell, styles.purple, { flex: 1 }]}>
          <Text style={styles.label}>Cat 1</Text>
        </View>
        <View style={[styles.cell, styles.teal, { flex: 1 }]}>
          <Text style={styles.label}>Cat 2</Text>
        </View>
        <View style={[styles.cell, styles.darkOrange, { flex: 1 }]}>
          <Text style={styles.label}>Cat 3</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 8,
    gap: 8,
    backgroundColor: "#ecf0f1",
  },
  banner: {
    height: 80,
    backgroundColor: "#e74c3c",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cardsRow: {
    height: 150,
    flexDirection: "row",
    gap: 8,
  },
  destaque: {
    flex: 1,
  },
  categoriesRow: {
    height: 100,
    flexDirection: "row",
    gap: 8,
  },
  cell: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  green: { backgroundColor: "#2ecc71" },
  blue: { backgroundColor: "#3498db" },
  orange: { backgroundColor: "#f39c12" },
  darkBlue: { backgroundColor: "#2c3e50" },
  purple: { backgroundColor: "#9b59b6" },
  teal: { backgroundColor: "#1abc9c" },
  darkOrange: { backgroundColor: "#e67e22" },
});

import { View, Text, StyleSheet } from "react-native";

export default function Exercicio13() {
  return (
    <View style={styles.container}>
      {/* Topo: proporções 1:3 */}
      <View style={styles.topRow}>
        <View style={[styles.cell, styles.yellow, { flex: 1 }]}>
          <Text style={styles.label}>Amarelo</Text>
        </View>
        <View style={[styles.cell, styles.darkBlue, { flex: 3 }]}>
          <Text style={styles.label}>Azul Escuro</Text>
        </View>
      </View>

      {/* Centro: verde | (rosa + laranja) */}
      <View style={styles.centerArea}>
        <View style={[styles.cell, styles.green, { flex: 1 }]}>
          <Text style={styles.label}>Verde</Text>
        </View>
        <View style={styles.rightColumn}>
          <View style={[styles.cell, styles.pink, { flex: 1 }]}>
            <Text style={styles.label}>Rosa</Text>
          </View>
          <View style={[styles.cell, styles.orange, { flex: 1 }]}>
            <Text style={styles.label}>Laranja</Text>
          </View>
        </View>
      </View>

      {/* Fundo: três colunas iguais */}
      <View style={styles.bottomRow}>
        <View style={[styles.cell, styles.red, { flex: 1 }]}>
          <Text style={styles.label}>Vermelho</Text>
        </View>
        <View style={[styles.cell, styles.teal, { flex: 1 }]}>
          <Text style={styles.label}>Teal</Text>
        </View>
        <View style={[styles.cell, styles.purple, { flex: 1 }]}>
          <Text style={styles.label}>Roxo</Text>
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
    backgroundColor: "#fff",
  },
  topRow: {
    height: 100,
    flexDirection: "row",
    gap: 8,
  },
  centerArea: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  rightColumn: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
  },
  bottomRow: {
    height: 90,
    flexDirection: "row",
    gap: 8,
  },
  cell: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  yellow: { backgroundColor: "#FFC107" },
  darkBlue: { backgroundColor: "#1A237E" },
  green: { backgroundColor: "#388E3C" },
  pink: { backgroundColor: "#E91E63" },
  orange: { backgroundColor: "#FF6F00" },
  red: { backgroundColor: "#D32F2F" },
  teal: { backgroundColor: "#00796B" },
  purple: { backgroundColor: "#7B1FA2" },
});

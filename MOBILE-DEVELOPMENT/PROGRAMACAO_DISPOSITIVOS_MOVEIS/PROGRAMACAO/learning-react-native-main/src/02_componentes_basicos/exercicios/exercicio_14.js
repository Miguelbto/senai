import { View, Text, StyleSheet } from "react-native";

export default function Exercicio141B() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.label}>Header</Text>
      </View>

      {/* Corpo */}
      <View style={styles.body}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.label}>Side</Text>
        </View>

        {/* Área Principal */}
        <View style={styles.mainArea}>
          {/* Seção Superior: 2 cards iguais */}
          <View style={styles.section}>
            <View style={[styles.card, styles.green]}>
              <Text style={styles.label}>Verde</Text>
            </View>
            <View style={[styles.card, styles.blue]}>
              <Text style={styles.label}>Azul</Text>
            </View>
          </View>
          <View style={styles.divider} />

          {/* Divisor */}

          {/* Seção Inferior: proporções 1:2:1 */}
          <View style={styles.section}>
            <View style={[styles.card, styles.red, { flex: 1 }]}>
              <Text style={styles.label}>Verm.</Text>
            </View>
            <View style={[styles.card, styles.orange, { flex: 2 }]}>
              <Text style={styles.label}>Laranja</Text>
            </View>
            <View style={[styles.card, styles.purple, { flex: 1 }]}>
              <Text style={styles.label}>Roxo</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.label}>Footer</Text>
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
    backgroundColor: "#1a1a1a",
  },
  header: {
    height: 60,
    backgroundColor: "#2c3e50",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  sidebar: {
    width: 80,
    backgroundColor: "#95a5a6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  mainArea: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
  },
  section: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  card: {
    flex: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 80,
    width: 80,
    backgroundColor: "#34495e",
    borderRadius: 100,
    alignSelf: "center",
  },
  footer: {
    height: 50,
    backgroundColor: "#2c3e50",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  green: { backgroundColor: "#27ae60" },
  blue: { backgroundColor: "#2980b9" },
  red: { backgroundColor: "#c0392b" },
  orange: { backgroundColor: "#e67e22" },
  purple: { backgroundColor: "#8e44ad" },
});

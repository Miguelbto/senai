import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function ExercicioView21_2A() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textStyle}>Header</Text>
      </View>

      <View style={styles.corpo}>
        <View style={styles.sidebar}>
          <Text style={styles.textStyle}>Side{"\n"}bar</Text>
        </View>

        <View style={styles.areaPrincipal}>
          <View style={styles.secaoTopo}>
            <View style={styles.cardA}>
              <Text style={styles.textStyle}>Card A</Text>
            </View>
            <View style={styles.cardB}>
              <Text style={styles.textStyle}>Card B</Text>
            </View>
          </View>

          <View style={styles.divisor} />

          <View style={styles.secaoFundo}>
            <View style={styles.cardC}>
              <Text style={styles.textStyle}>C</Text>
            </View>
            <View style={styles.cardD}>
              <Text style={styles.textStyle}>Card D</Text>
            </View>
            <View style={styles.cardE}>
              <Text style={styles.textStyle}>E</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.textStyle}>Footer</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: "column",
    gap: 8,
    padding: 8,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  header: {
    height: 60,
    backgroundColor: "#2c3e50",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  corpo: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },

  sidebar: {
    width: 80,
    backgroundColor: "#7f8c8d",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  areaPrincipal: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
  },

  secaoTopo: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  cardA: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  cardB: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  divisor: {
    height: 8,
    backgroundColor: "#2c3e50",
    borderRadius: 4,
  },

  secaoFundo: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  cardC: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  cardD: {
    flex: 2,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  cardE: {
    flex: 1,
    backgroundColor: "#8e44ad",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  footer: {
    height: 50,
    backgroundColor: "#2c3e50",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});

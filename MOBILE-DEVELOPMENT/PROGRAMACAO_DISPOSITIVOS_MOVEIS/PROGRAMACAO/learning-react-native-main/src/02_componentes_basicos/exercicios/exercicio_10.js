import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function ExercicioView10() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textStyle}>Header</Text>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.article1}>
          <Text> 1</Text>
        </View>
        <View style={styles.article2}>
          <Text>2</Text>
        </View>
        <View style={styles.article3}>
          <Text>3</Text>
        </View>
      </View>

      <View style={styles.main}>
        <View style={styles.mainContent1}>
          <Text>Painel Principal</Text>
        </View>
        <View style={styles.mainContent2}>
          <Text>Lateral</Text>
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
    paddingBottom: StatusBar.currentHeight,
    flex: 1,
    gap: 8,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    height: 50,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },

  rowContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    padding: 2,
  },
  article1: {
    height: 100,
    width: 100,
    backgroundColor: "red",
    flex: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  article2: {
    height: 100,
    width: 100,
    backgroundColor: "blue",
    flex: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  article3: {
    height: 100,
    width: 100,
    backgroundColor: "yellow",
    flex: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  main: {
    flexDirection: "row",
    flex: 1,
    gap: 8,
  },

  mainContent1: {
    flex: 2,
    backgroundColor: "pink",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContent2: {
    flex: 1,
    backgroundColor: "gray",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    height: 50,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});

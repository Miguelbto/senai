import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function ExercicioView06() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textStyle}>Header</Text>
      </View>

      <View style={styles.main}>
        <Text style={styles.textStyle}>Main Content</Text>
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
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },

  header: {
    height: 60,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },

  main: {
    flex: 1,
    backgroundColor: "gray",
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

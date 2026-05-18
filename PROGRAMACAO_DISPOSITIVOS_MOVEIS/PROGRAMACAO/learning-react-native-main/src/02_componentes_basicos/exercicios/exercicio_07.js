import { StatusBar, StyleSheet, View } from "react-native";

export default function ExercicioView07() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.greenBox}></View>
        <View style={styles.redBox}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.blueBox}></View>
        <View style={styles.orangeBox}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
    flexDirection: "column",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    gap: 20,
    flex: 1,
  },

  greenBox: {
    flex: 1,
    backgroundColor: "green",
  },
  redBox: {
    flex: 1,
    backgroundColor: "red",
  },
  blueBox: {
    flex: 1,
    backgroundColor: "blue",
  },
  orangeBox: {
    flex: 1,
    backgroundColor: "orange",
  },
});

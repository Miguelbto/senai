import { StyleSheet, Text, View } from "react-native";

export default function ExercicioView03() {
  return (
    <View style={styles.container}>
      <View style={styles.redBox}>
        <Text style={styles.textStyle}>R</Text>
      </View>

      <View style={styles.greenBox}>
        <Text style={styles.textStyle}>G</Text>
      </View>

      <View style={styles.blueBox}>
        <Text style={styles.textStyle}>B</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  redBox: {
    width: 70,
    height: 70,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  greenBox: {
    width: 70,
    height: 70,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  blueBox: {
    height: 70,
    width: 70,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { StyleSheet, Text, View } from "react-native";

export default function ExercicioView04() {
  return (
    <View style={styles.container}>
      <View style={styles.orangeBox}>
        <Text style={styles.textStyle}>Centro</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },

  orangeBox: {
    width: 120,
    height: 120,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
});

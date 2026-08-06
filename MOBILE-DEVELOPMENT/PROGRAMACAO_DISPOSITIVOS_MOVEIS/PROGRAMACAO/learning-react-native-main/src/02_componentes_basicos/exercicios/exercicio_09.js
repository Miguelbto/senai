import { StatusBar, StyleSheet, View } from "react-native";

export default function ExercicioView09() {
  return (
    <View style={styles.container}>
      <View style={styles.semaforoContainer}>
        <View style={styles.redLight} />
        <View style={styles.yellowLight} />
        <View style={styles.greenLight} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  semaforoContainer: {
    backgroundColor: "black",
    width: 150,
    height: 300,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  redLight: {
    backgroundColor: "red",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  yellowLight: {
    backgroundColor: "yellow",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  greenLight: {
    backgroundColor: "green",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

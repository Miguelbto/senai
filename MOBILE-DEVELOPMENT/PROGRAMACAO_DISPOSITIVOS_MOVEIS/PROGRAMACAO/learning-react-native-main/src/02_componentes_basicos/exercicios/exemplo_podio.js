import { StyleSheet, Text, View } from "react-native";

export default function ExemploPodio() {
  return (
    <View style={styles.container}>
      <View style={styles.podio}>
        <View style={styles.lugar2}>
          <Text style={styles.textStyle}>2</Text>
        </View>

        <View style={styles.lugar1}>
          <Text style={styles.textStyle}>1</Text>
        </View>

        <View style={styles.lugar3}>
          <Text style={styles.textStyle}>3</Text>
        </View>
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
  podio: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  lugar1: {
    width: 100,
    height: 200,
    backgroundColor: "gold",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 12,
  },
  lugar2: {
    width: 100,
    height: 150,
    backgroundColor: "silver",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 12,
  },
  lugar3: {
    width: 100,
    height: 120,
    backgroundColor: "#cd7f32",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 12,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
});

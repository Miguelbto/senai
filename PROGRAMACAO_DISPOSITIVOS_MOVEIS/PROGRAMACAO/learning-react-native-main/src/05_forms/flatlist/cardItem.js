import { Text, View, StyleSheet } from "react-native";

export default function CardItem({ nome, nota }) {
  return (
    <View style={styles.linha}>
      <Text>{nome}</Text>
      <Text style={{ fontWeight: "bold" }}>{nota}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f5f5f5",
    marginBottom: 4,
    borderRadius: 4,
  },
});

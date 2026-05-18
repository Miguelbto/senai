import { StatusBar, StyleSheet, View, Text } from "react-native";

export default function ExercicioView08() {
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Text>Sidebar</Text>
      </View>
      <View style={styles.cardsContainer}>
        <View style={styles.greenBox}>
          <Text>Card 1</Text>
        </View>
        <View style={styles.orangeBox}>
          <Text>Card 2</Text>
        </View>
        <View style={styles.blueBox}>
          <Text>Card 3</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },

  sidebar: {
    backgroundColor: "gray",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  cardsContainer: {
    padding: 10,
    flex: 1,
    gap: 8,
  },

  greenBox: {
    backgroundColor: "green",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  orangeBox: {
    backgroundColor: "orange",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  blueBox: {
    backgroundColor: "blue",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

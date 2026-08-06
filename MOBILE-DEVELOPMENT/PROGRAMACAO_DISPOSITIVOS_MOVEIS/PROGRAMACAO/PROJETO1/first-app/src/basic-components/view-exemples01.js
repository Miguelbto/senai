import { View, Text, StyleSheet } from "react-native";

export default function ViewExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>View e Flexbox</Text>

      <View style={styles.exemplo}>
        <View style={{ flexDirection: "row", gap: 8}}>
          <View style={styles.box}/>
          <View style={styles.box}/>
          <View style={styles.box}/>
        </View>
      </View>

      <Text style={styles.titulo}>Justify Content</Text>
      <View style={styles.exemplo}>
        <View style={{
          flexDirection: "column", height: 300, width:300, gap:8, justifyContent:"center", alignItems: "center",
        }}>
        <View style={{ flexDirection: "row", gap: 8}}>
          <View style={styles.box}/>
          <View style={styles.box}/>
          <View style={styles.box}/>
        </View>
      </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4285f4",
    marginBottom: 8,
  },
  exemplo: {
    width: "80%",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "#4285f4",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";

export default function TelaMoeda() {
  const [moedas, setMoedas] = useState(0);

  // O useEffect fica "vigiando" a variável 'moedas'
  useEffect(() => {
    if (moedas === 5) {
      Alert.alert("Sucesso!", "Você desbloqueou o baú de tesouro! 🎁");
    }
  }, [moedas]); // <-- Sempre que 'moedas' mudar, o useEffect acorda e checa o 'if'

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Moedas coletadas: {moedas}</Text>

      <Button title="Pegar Moeda 🪙" onPress={() => setMoedas(moedas + 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  texto: { fontSize: 24, marginBottom: 20 },
});

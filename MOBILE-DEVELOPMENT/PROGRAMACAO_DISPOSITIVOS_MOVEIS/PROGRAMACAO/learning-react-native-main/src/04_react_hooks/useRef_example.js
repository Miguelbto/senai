import React, { useRef } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

export default function TelaDeLogin() {
  // 1. Criamos a referência que vai "segurar" o campo de senha
  const senhaRef = useRef(null);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>

      {/* CAMPO DE E-MAIL */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        // Transforma o botão "Enter" do teclado no botão "Próximo"
        returnKeyType="next"
        // 2. Quando o usuário aperta "Próximo", disparamos o foco na referência da senha!
        onSubmitEditing={() => senhaRef.current?.focus()}
      />

      {/* CAMPO DE SENHA */}
      <TextInput
        // 3. Conectamos a referência a este input específico
        ref={senhaRef}
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry={true} // Esconde a senha com asteriscos
        returnKeyType="send" // Transforma o botão do teclado em "Enviar"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
});

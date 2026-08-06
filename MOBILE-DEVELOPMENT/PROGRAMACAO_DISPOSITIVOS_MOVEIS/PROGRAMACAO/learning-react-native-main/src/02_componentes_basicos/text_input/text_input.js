// ============================================
// COMPONENTE: TextInput
// ============================================
// MOMENTO 1 - Conceitos fundamentais
// Live coding: professor escreve, alunos acompanham
// ============================================

import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function TextInputExemplos() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>TextInput</Text>

      {/* ETAPA 1: Input basico com value + onChangeText
          Dica: troque o placeholder por outro texto
          value controla o valor exibido, onChangeText atualiza o estado */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>1. Input basico</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite seu nome"
        />
        <Text>Digitado: {nome}</Text>
      </View>

      {/* ETAPA 2: keyboardType
          Dica: troque "email-address" por "numeric", "phone-pad", "default"
          keyboardType muda o tipo de teclado exibido */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>2. keyboardType</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* ETAPA 3: secureTextEntry
          Dica: remova secureTextEntry e veja a diferenca
          secureTextEntry esconde o texto digitado (para senhas) */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>3. secureTextEntry</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Senha"
          secureTextEntry
        />
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
});

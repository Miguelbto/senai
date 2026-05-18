// ============================================
// COMPONENTE: TextInput - Formularios
// ============================================
// MOMENTO 2 - Formulario com multiplos campos
// Live coding: professor escreve, alunos acompanham
// ============================================

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

export default function FormularioExemplos() {
  // ETAPA 1: Um useState para cada campo do formulario
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  // ETAPA 3: Campos do formulario de tarefa
  const [tarefa, setTarefa] = useState("");
  const [prioridade, setPrioridade] = useState("");

  // ETAPA 3: Funcao de envio do formulario
  // Convenção: funções que respondem a eventos usam o prefixo "handle"
  function handleEnviar() {
    console.log("Nome:", nome, "Idade:", idade);
    setNome("");
    setIdade("");
  }

  // ETAPA 4: Funcao com validacao usando trim() e Alert
  function handleAdicionar() {
    // trim() remove espacos do inicio e fim
    // Sem trim(), o usuario poderia enviar so espacos como tarefa
    if (tarefa.trim() === "") {
      Alert.alert("Atencao", "O nome da tarefa nao pode ficar vazio!");
      return;
    }

    console.log("Tarefa:", tarefa, "Prioridade:", prioridade || "normal");
    setTarefa("");
    setPrioridade("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Formularios</Text>

      {/* ETAPA 3: Formulario completo com funcao de envio
          Dica: apos o envio, limpamos os campos com set("")
          handleEnviar segue a convencao de nomenclatura para funcoes de evento */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>3. Formulario com envio</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Seu nome"
        />
        <TextInput
          style={styles.input}
          value={idade}
          onChangeText={setIdade}
          placeholder="Sua idade"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.botao} onPress={handleEnviar}>
          <Text style={styles.textoBotao}>Enviar</Text>
        </TouchableOpacity>
      </View>

      {/* ETAPA 4: Validacao com trim() e Alert
          Dica: teste digitando so espacos e clicando "Adicionar"
          Alert.alert(titulo, mensagem) exibe alerta nativo do celular */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>4. Validacao</Text>
        <TextInput
          style={styles.input}
          value={tarefa}
          onChangeText={setTarefa}
          placeholder="Nome da tarefa"
        />
        <TextInput
          style={styles.input}
          value={prioridade}
          onChangeText={setPrioridade}
          placeholder="Prioridade (alta, media, baixa)"
        />
        <TouchableOpacity style={styles.botao} onPress={handleAdicionar}>
          <Text style={styles.textoBotao}>Adicionar</Text>
        </TouchableOpacity>
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
  botao: {
    backgroundColor: "#4285f4",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
});

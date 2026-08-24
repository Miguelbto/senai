import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import TarefaItem from "../components/TarefaItem";

export default function ListaTarefasScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.titulo}>Lista de Tarefas</Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          value={textoInput}
          onChangeText={setTextoInput}
          onSubmitEditing={}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={}
        >
          <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(tarefa) => tarefa.id}
        renderItem={({ item }) => (
          <TarefaItem
            tarefa={item}
            aoAlternarConcluida={}
            aoExcluir={}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>
            Nenhuma tarefa cadastrada ainda.
          </Text>
        }
        contentContainerStyle={styles.listaConteudo}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  formulario: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  botaoAdicionar: {
    backgroundColor: "#2e86de",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  textoBotaoAdicionar: {
    color: "#fff",
    fontWeight: "bold",
  },
  listaConteudo: {
    paddingBottom: 20,
  },
  listaVazia: {
    textAlign: "center",
    color: "#888",
    marginTop: 24,
  },
});

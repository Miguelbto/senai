import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { text } from "node:stream/consumers";

const STORAGE_KEY = "@my_works";

export default function ListaTarefasScreen() {
  const [work, setWork] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [textoInput, setTextoInput] = useState("");

  // Carrega os dados na montagem do componente
  useEffect(() => {
    async function loadStoredData() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setWork(JSON.parse(stored));
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      } finally {
        setIsLoaded(true); // Garante que a flag de carregado seja ativada
      }
    }

    loadStoredData();
  }, []);

  // Salva no storage automaticamente sempre que 'work' mudar (após o carregamento)
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(work)).catch((error) => {
        console.error("Erro ao salvar tarefas:", error);
      });
    }
  }, [work, isLoaded]);

  function addWork() {
    const text = textoInput.trim();
    if (text === "") return;

    const newWork = {
      id: Date.now().toString(),
      texto: text,
      concluida: false,
    };

    setWork((currentWorks) => [...currentWorks, newWork]);
    setTextoInput(""); // Limpa o input
  }

  function alterWorkReady(idWork) {
    setWork((currentWorks) =>
      currentWorks.map((item) =>
        item.id === idWork ? { ...item, concluida: !item.concluida } : item,
      ),
    );
  }

  function deleteWork(idWork) {
    setWork((currentWorks) =>
      currentWorks.filter((item) => item.id !== idWork),
    );
  }

  function clearAllWorks() {
    const currentWorks = [];
    setWork(currentWorks);
  }

  function editWork(idWork, newText) {
    const textFormatted = newText.trim();
    if (textFormatted === "") return; //não salva texto nulo
    setWork(() => {});

    setWork((currentWorks) =>
      currentWorks.map((item) =>
        item.id === idWork
          ? { ...item, text: textFormatted, texto: textFormatted }
          : item,
      ),
    );
  }

  if (!isLoaded) return null; // Aguarda carregar para evitar sobrescrita

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
          onSubmitEditing={addWork}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.botaoAdicionar} onPress={addWork}>
          <Text style={styles.textoBotaoAdicionar}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={work}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TarefaItem
            tarefa={item}
            aoAlternarConcluida={alterWorkReady}
            aoExcluir={deleteWork}
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

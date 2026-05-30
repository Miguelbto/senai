import { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { CardJogo } from "../components";

// Dados iniciais de simulação
const jogosMock = [
  {
    id: "1",
    titulo: "Elden Ring",
    genero: "Action RPG / Souls-like",
    plataforma: "PS5 / Xbox Series / PC",
    nota: "10/10",
  },
  {
    id: "3",
    titulo: "Baldur's Gate 3",
    genero: "RPG / Turn-Based",
    plataforma: "PC / PS5 / Xbox Series",
    nota: "10/10",
  },
];

export default function ListaScreen({ route }) {
  const [itensSalvos, setItensSalvos] = useState(jogosMock);

  // Sincronizar parâmetros enviados pela DetalheScreen (adicionar ou remover item)
  useEffect(() => {
    if (route.params?.novoJogo) {
      const novo = route.params.novoJogo;
      setItensSalvos((prev) => {
        // Evita a adição de jogos duplicados por ID
        if (prev.some((item) => item.id === novo.id)) {
          return prev;
        }
        return [...prev, novo];
      });
    }

    if (route.params?.removerJogoId) {
      const removeId = route.params.removerJogoId;
      setItensSalvos((prev) => prev.filter((item) => item.id !== removeId));
    }
  }, [route.params?.novoJogo, route.params?.removerJogoId]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho da tela de lista */}
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>MINHA PLAYLIST</Text>
        <Text style={styles.headerSubtitulo}>
          Seus jogos favoritos salvos para jogar
        </Text>
      </View>

      {/* FlatList renderizando os jogos salvos com CardJogo */}
      <FlatList
        data={itensSalvos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardJogo
            titulo={item.titulo}
            genero={item.genero}
            plataforma={item.plataforma}
            nota={item.nota}
          />
        )}
        ListEmptyComponent={
          <View style={styles.conteudoVazio}>
            <View style={styles.iconeContainer}>
              <Text style={styles.icone}>🎮</Text>
            </View>
            <Text style={styles.tituloVazio}>PlayList Vazia</Text>
            <Text style={styles.descricaoVazio}>
              Nenhum game foi adicionado ainda.
            </Text>
            <Text style={styles.dicaVazio}>
              Acesse a aba de Jogos, clique em um card e toque em "Adicionar à Lista" para guardá-lo aqui.
            </Text>
          </View>
        }
        contentContainerStyle={[
          styles.listaContainer,
          itensSalvos.length === 0 && styles.listaVazia,
        ]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0C10",
  },
  header: {
    backgroundColor: "#0D0E15",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 22,
    borderBottomWidth: 1.5,
    borderBottomColor: "#FF007F",
  },
  headerTitulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 2,
    textShadowColor: "rgba(255, 0, 127, 0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  headerSubtitulo: {
    fontSize: 13,
    color: "#C5C6C7",
    marginTop: 4,
    fontWeight: "500",
  },
  listaContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  listaVazia: {
    flex: 1,
    justifyContent: "center",
  },
  conteudoVazio: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  iconeContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#161923",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#00E5FF",
    shadowColor: "#00E5FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  icone: {
    fontSize: 44,
  },
  tituloVazio: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  descricaoVazio: {
    fontSize: 15,
    color: "#C5C6C7",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 16,
  },
  dicaVazio: {
    fontSize: 13,
    color: "#8A8C99",
    textAlign: "center",
    lineHeight: 20,
  },
});

import { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import {CardMusica} from "../components/";
// TODO: apos importar o componente CardMusica, adicione a linha abaixo:
// import { CardMusica } from '../components';

// Dados de exemplo para voce visualizar o renderItem funcionando
// Em um app real, esses itens chegariam via route.params enviados pela DetalheScreen
const musicasMock = [
  {
    id: "1",
    titulo: "Bohemian Rhapsody",
    genero: "Rock / Opera",
    plataforma: "Spotify / Apple Music",
    nota: "10/10",
  },
  {
    id: "3",
    titulo: "HUMBLE.",
    genero: "Hip-hop / Rap",
    plataforma: "Spotify / Apple Music",
    nota: "9/10",
  },
];
// passar Route como parâmetro para uso dos parametros de rota
export default function ListaScreen(route) {
  const [itensSalvos, setItensSalvos] = useState(musicasMock);

  // Para receber uma musica salva da DetalheScreen via route.params:
   useEffect(() => {
    if (route.params?.novaMusica) {
      setItensSalvos((prev) => [...prev, route.params.novaMusica]);
    }
  }, [route.params?.novaMusica]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Minha Lista</Text>
      </View>

      <FlatList
        data={itensSalvos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          // TODO: apos criar e importar CardMusica, substitua este bloco por:
          <CardMusica titulo={item.titulo}
          genero={item.genero} 
          plataforma={item.plataforma} 
          nota={item.nota} />
          // <View style={styles.card} />
        )}
        ListEmptyComponent={
          <View style={styles.conteudo}>
            <View style={styles.iconeContainer}>
              <Text style={styles.icone}>M</Text>
            </View>
            <Text style={styles.titulo}>Nenhuma musica salva</Text>
            <Text style={styles.descricao}>Sua lista aparecera aqui</Text>
            <Text style={styles.dica}>
              Acesse uma musica e toque em "Adicionar a Lista" para salva-la
              aqui.
            </Text>
          </View>
        }
        contentContainerStyle={itensSalvos.length === 0 && styles.listaVazia}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    backgroundColor: "#1E1E1E",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#282828",
  },
  headerTitulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  listaVazia: {
    flex: 1,
  },
  conteudo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingTop: 80,
  },
  iconeContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#1DB954",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  icone: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  descricao: {
    fontSize: 16,
    color: "#B3B3B3",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },
  dica: {
    fontSize: 13,
    color: "#6B6B6B",
    textAlign: "center",
    lineHeight: 20,
  },
  card: {
    backgroundColor: "#1E1E1E",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 16,
    minHeight: 72,
  },
});

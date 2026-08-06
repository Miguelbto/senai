// TODO: importar useState — adicione a linha abaixo no topo:
// import { useState } from 'react';
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Dados de fallback — usados enquanto a navegacao nao estiver configurada
const musicaMock = {
  titulo: "Bohemian Rhapsody",
  genero: "Rock / Opera",
  plataforma: "Spotify / Apple Music",
  nota: "10/10",
  sinopse:
    "Uma das composicoes mais iconicas do rock. Queen criou uma obra atemporal que mistura balada, opera e hard rock em uma unica faixa de seis minutos.",
};

// TODO: adicionar { route, navigation } como parametros quando a navegacao estiver configurada
// Os dados chegam via route.params quando o usuario toca em uma musica na HomeScreen
export default function DetalheScreen({route, navigation}) {
  // Defina os parametros de rota, pegando todos os campos presentes no objeto musicas definido na HomeScreen
  // const { passar parametros das musicas: plataforma, nota etc... } = route?.params ?? musicaMock;
  const { titulo, genero, plataforma, nota, sinopse} =route?.params ?? musicaMock

  // TODO: estado booleano para controlar se a musica foi salva na lista
  // const [isSalvo, setIsSalvo] = useState(false);
  const [isSalvo, setIsSalvo] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroIcone}>
            <Text style={styles.heroIconeTexto}>{titulo[0]}</Text>
          </View>
          <Text style={styles.heroTitulo}>{titulo}</Text>
          <Text style={styles.heroSubtitulo}>{genero}</Text>
          <View style={styles.heroMeta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Plataforma</Text>
              <Text style={styles.metaValor}>{plataforma}</Text>
            </View>
            <View style={styles.metaSeparador} />
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Nota</Text>
              <Text style={styles.metaValorNota}>{nota}</Text>
            </View>
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Sinopse</Text>
          <Text style={styles.detalheTexto}>{sinopse}</Text>
        </View>
        <TouchableOpacity style={[styles.botao, isSalvo && styles.botaoAtivo]} onPress={() => setIsSalvo(prev => !prev)}>
          <Text style={styles.botaoTexto}>{isSalvo ? 'Remover da Lista' : 'Adicionar a Lista'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  hero: {
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#282828",
  },
  heroIcone: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1DB954",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  heroIconeTexto: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  heroTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 6,
  },
  heroSubtitulo: {
    fontSize: 14,
    color: "#B3B3B3",
    marginBottom: 16,
  },
  heroMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#282828",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  metaItem: {
    alignItems: "center",
  },
  metaLabel: {
    fontSize: 11,
    color: "#6B6B6B",
    marginBottom: 2,
  },
  metaValor: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  metaValorNota: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1DB954",
  },
  metaSeparador: {
    width: 1,
    height: 28,
    backgroundColor: "#3A3A3A",
  },
  secao: {
    margin: 16,
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 16,
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  detalheTexto: {
    fontSize: 14,
    color: "#B3B3B3",
    lineHeight: 22,
  },
  botao: {
    margin: 16,
    marginTop: 4,
    backgroundColor: "#1DB954",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 32,
  },
  botaoAtivo: {
    backgroundColor: "#158A3E",
  },
  botaoTexto: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

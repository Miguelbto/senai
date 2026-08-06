import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const filmeMock = {
  titulo: "Interestelar",
  genero: "Ficcao Cientifica / Drama",
  plataforma: "Paramount+ / Apple TV",
  nota: "10/10",
  sinopse:
    "Um grupo de astronautas viaja atraves de um buraco de minhoca em busca de um novo lar para a humanidade. Christopher Nolan entrega uma obra sobre amor, tempo e sobrevivencia.",
};

// TODO: adicionar { route, navigation } como parametros
export default function DetalheScreen( {route, navigation} ) {
  // TODO: const { titulo, demais parametros} = route?.params ?? filmeMock;
  const { titulo, genero, plataforma, nota, sinopse } = route?.params ?? filmeMock

  const [isSalvo, setIsSalvo] = useState(false);

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

        {/* TODO: ao adicionar o filme, navegar para a aba "Lista" passando os dados do filme */}

        <TouchableOpacity
          style={[styles.botao, isSalvo && styles.botaoAtivo]}
          onPress={() => {
            if (!isSalvo) {
              navigation.navigate("Lista", {
                // novoFilme: {dados do filme},
                novoFilme: {titulo, genero, plataforma, nota, sinopse}
              });
            }
            setIsSalvo((prev) => !prev);
          }}
        >
          <Text style={styles.botaoTexto}>
            {isSalvo ? "Remover da Lista" : "Adicionar a Lista"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  hero: {
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },
  heroIcone: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: "#FF6B35",
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
    color: "#AAAAAA",
    marginBottom: 16,
  },
  heroMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#252525",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  metaItem: {
    alignItems: "center",
  },
  metaLabel: {
    fontSize: 11,
    color: "#666666",
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
    color: "#FF6B35",
  },
  metaSeparador: {
    width: 1,
    height: 28,
    backgroundColor: "#3A3A3A",
  },
  secao: {
    margin: 16,
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: "#FF6B35",
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  detalheTexto: {
    fontSize: 14,
    color: "#AAAAAA",
    lineHeight: 22,
  },
  botao: {
    margin: 16,
    marginTop: 4,
    backgroundColor: "#FF6B35",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 32,
  },
  botaoAtivo: {
    backgroundColor: "#CC5220",
  },
  botaoTexto: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

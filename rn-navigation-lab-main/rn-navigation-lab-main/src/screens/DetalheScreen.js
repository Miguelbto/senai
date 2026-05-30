import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BotaoAcao } from "../components";

// Dados de fallback — usados enquanto a navegacao nao estiver configurada ou caso abra diretamente
const jogoMock = {
  id: "mock",
  titulo: "The Legend of Zelda: Breath of the Wild",
  genero: "Aventura / Mundo Aberto",
  plataforma: "Nintendo Switch",
  nota: "10/10",
  sinopse:
    "Explore um vasto mundo aberto em Hyrule. Resolva puzzles, enfrente inimigos e descubra segredos em uma das aventuras mais aclamadas da historia dos games.",
};

export default function DetalheScreen({ route, navigation }) {
  // Pegando todos os campos passados via parâmetros de rota ou usando o Mock de fallback
  const { id, titulo, genero, plataforma, nota, sinopse } =
    route?.params ?? jogoMock;

  // Estado booleano para controlar se o jogo foi salvo na lista
  const [isSalvo, setIsSalvo] = useState(false);

  // Manipular salvamento e comunicação reversa com a ListaScreen
  const handleToggleSalvar = () => {
    setIsSalvo((prev) => {
      const novoEstado = !prev;
      if (novoEstado) {
        // Adiciona à lista de jogos salvos enviando parâmetros para a ListaScreen
        navigation.navigate("Lista", {
          novoJogo: { id, titulo, genero, plataforma, nota },
        });
      } else {
        // Envia o id para a remoção na ListaScreen
        navigation.navigate("Lista", {
          removerJogoId: id,
        });
      }
      return novoEstado;
    });
  };

  // Primeira letra para exibição no avatar do cabeçalho
  const inicial = titulo ? titulo.trim().charAt(0).toUpperCase() : "G";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Seção Hero com estilo Cyberpunk Premium */}
        <View style={styles.hero}>
          <View style={styles.heroIcone}>
            <Text style={styles.heroIconeTexto}>{inicial}</Text>
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
              <Text style={styles.metaValor}>{nota}</Text>
            </View>
          </View>
        </View>

        {/* Bloco de Sinopse */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Sinopse</Text>
          <Text style={styles.detalheTexto}>{sinopse}</Text>
        </View>

        {/* Botão de Ação Utilizando o Componente Reutilizável */}
        <View style={styles.botaoWrapper}>
          <BotaoAcao
            texto={isSalvo ? "Remover da Lista" : "Adicionar à Lista"}
            onPress={handleToggleSalvar}
            ativo={isSalvo}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0C10",
  },
  hero: {
    backgroundColor: "#0D0E15",
    alignItems: "center",
    paddingVertical: 36,
    paddingHorizontal: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: "#FF007F",
  },
  heroIcone: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#FF007F",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#FF007F",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 8,
  },
  heroIconeTexto: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  heroTitulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  heroSubtitulo: {
    fontSize: 14,
    color: "#C5C6C7",
    marginBottom: 20,
    fontWeight: "500",
  },
  heroMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#161923",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: "#252B3B",
  },
  metaItem: {
    alignItems: "center",
    minWidth: 90,
  },
  metaLabel: {
    fontSize: 11,
    color: "#8A8C99",
    marginBottom: 4,
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  metaValor: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00E5FF",
    textAlign: "center",
  },
  metaSeparador: {
    width: 1,
    height: 28,
    backgroundColor: "#252B3B",
  },
  secao: {
    margin: 16,
    backgroundColor: "#161923",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1.5,
    borderColor: "#252B3B",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  secaoTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#FF007F",
    paddingLeft: 8,
  },
  detalheTexto: {
    fontSize: 14,
    color: "#C5C6C7",
    lineHeight: 22,
    fontWeight: "400",
  },
  botaoWrapper: {
    marginTop: 8,
    marginBottom: 32,
  },
});

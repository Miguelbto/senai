// TODO: estilizar esta tela com as cores e identidade visual do seu tema
// TODO: importar useState — adicione a linha abaixo no topo:
// import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";

// Dados de fallback — usados enquanto a navegacao nao estiver configurada
const jogoMock = {
  titulo: "The Legend of Zelda: Breath of the Wild",
  genero: "Aventura / Mundo Aberto",
  plataforma: "Nintendo Switch",
  nota: "10/10",
  sinopse:
    "Explore um vasto mundo aberto em Hyrule. Resolva puzzles, enfrente inimigos e descubra segredos em uma das aventuras mais aclamadas da historia dos games.",
};

// TODO: adicionar { route, navigation } como parametros quando a navegacao estiver configurada
// Os dados chegam via route.params quando o usuario toca em um jogo na HomeScreen
export default function DetalheScreen({route, navigation}) {
  // Defina os parâmetros de rota, pegando todos os campos presentes no objeto JOGOS definido na HomeScreen
  // const { titulo... } = route?.params ?? jogoMock;
  const {titulo, genero, plataforma, nota, sinopse} = route?.params ?? jogoMock

  // TODO: estado booleano para controlar se o jogo foi salvo na lista
  // const [isSalvo, setIsSalvo] = useState(false);
  const [isSalvo, setIsSalvo] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          {/* TODO: substituir pela inicial do titulo ou outro elemento do seu tema */}
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
              <Text style={styles.metaValor}>{nota}</Text>
            </View>
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Sinopse</Text>
          <Text style={styles.detalheTexto}>{sinopse}</Text>
        </View>

        {/* TODO: quando implementar o estado isSalvo, use:
            onPress={() => setIsSalvo(prev => !prev)}
            style={[styles.botao, isSalvo && styles.botaoAtivo]}
            texto: isSalvo ? 'Remover da Lista' : 'Adicionar a Lista' */}
        <TouchableOpacity style={[styles.botao, isSalvo && styles.botaoAtivo]} onPress={() => setIsSalvo(prev => !prev)}>
          <Text style={styles.botaoTexto}>{isSalvo ? 'Remover da lista' : 'Adicionar a Lista'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// TODO: estilizar com as cores e identidade visual do seu tema
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  hero: {
    backgroundColor: "#333333",
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 20,
  },
  heroIcone: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#555555",
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
    color: "#CCCCCC",
    marginBottom: 16,
  },
  heroMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  metaItem: {
    alignItems: "center",
  },
  metaLabel: {
    fontSize: 11,
    color: "#AAAAAA",
    marginBottom: 2,
  },
  metaValor: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  metaSeparador: {
    width: 1,
    height: 28,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  secao: {
    margin: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  detalheTexto: {
    fontSize: 14,
    color: "#555555",
    lineHeight: 22,
  },
  botao: {
    margin: 16,
    marginTop: 4,
    backgroundColor: "#333333",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 32,
  },
  // TODO: estilizar o estado ativo do botao com a cor do seu tema
  botaoAtivo: {
    backgroundColor: "#555555",
  },
  botaoTexto: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

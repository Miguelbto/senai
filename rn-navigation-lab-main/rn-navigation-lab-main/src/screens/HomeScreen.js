import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Lista de Jogos com os títulos escolhidos para o tema premium de Games
const jogos = [
  {
    id: "1",
    titulo: "Elden Ring",
    genero: "Action RPG / Souls-like",
    plataforma: "PS5 / Xbox Series / PC",
    nota: "10/10",
    sinopse:
      "Embarque em uma jornada pelas Terras Intermédias para restaurar o Anel Prístino e se tornar o Lorde Prístino, enfrentando semideuses lendários e desbravando um mundo de fantasia sombria criado por Hidetaka Miyazaki e George R. R. Martin.",
  },
  {
    id: "2",
    titulo: "Cyberpunk 2077",
    genero: "Action RPG / Sci-Fi",
    plataforma: "PS5 / Xbox Series / PC",
    nota: "9.5/10",
    sinopse:
      "Explore a vibrante metrópole de Night City como V, um mercenário cibernético em busca de um implante único que carrega a chave para a imortalidade. Um RPG com gráficos incríveis de nova geração e escolhas impactantes.",
  },
  {
    id: "3",
    titulo: "Baldur's Gate 3",
    genero: "RPG / Turn-Based",
    plataforma: "PC / PS5 / Xbox Series",
    nota: "10/10",
    sinopse:
      "Reúna seu grupo e retorne aos Reinos Esquecidos em uma história de companheirismo e traição, sacrifício e sobrevivência, e a atração pelo poder absoluto. Escolha suas ações e determine o destino do mundo.",
  },
  {
    id: "4",
    titulo: "Hades II",
    genero: "Rogue-like / Action",
    plataforma: "PC / Consoles",
    nota: "9.5/10",
    sinopse:
      "Batalhe além do Submundo usando feitiçaria sombria para enfrentar o Titã do Tempo nesta sequência eletrizante do aclamado rogue-like dungeon crawler. Descubra segredos e divindades mitológicas.",
  },
  {
    id: "5",
    titulo: "Hollow Knight",
    genero: "Metroidvania / Indie",
    plataforma: "PC / Switch / PS4 / Xbox",
    nota: "10/10",
    sinopse:
      "Explore o vasto e arruinado reino subterrâneo de Hallownest, enfrente criaturas corrompidas e faça amizade com insetos bizarros em uma das maiores obras-primas indie de exploração e combate preciso.",
  },
  {
    id: "6",
    titulo: "Persona 5 Royal",
    genero: "JRPG / Estilizado",
    plataforma: "PS4 / PS5 / Switch / PC",
    nota: "10/10",
    sinopse:
      "Prepare-se para uma experiência de RPG premiada nesta edição definitiva de Persona 5 Royal. Vista a máscara dos Phantom Thieves, realize assaltos épicos e mude o coração dos corrompidos em Tóquio.",
  },
];

export default function HomeScreen({ navigation }) {
  // Estado para o texto digitado na busca
  const [busca, setBusca] = useState("");

  // Estado com os jogos exibidos na lista — inicia com todos os jogos
  const [jogosFiltrados, setJogosFiltrados] = useState(jogos);

  // Filtrar os jogos sempre que o valor de 'busca' mudar
  useEffect(() => {
    const resultado = jogos.filter((jogo) =>
      jogo.titulo.toLowerCase().includes(busca.toLowerCase())
    );
    setJogosFiltrados(resultado);
  }, [busca]);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        // Navegar para a tela de Detalhes passando todos os dados do jogo atual
        onPress={() => navigation.navigate("Detalhe", { ...item })}
        activeOpacity={0.7}
      >
        {/* Ícone com a primeira letra e glow rosa neon */}
        <View style={styles.cardIcone}>
          <Text style={styles.cardIconeTexto}>{item.titulo[0]}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitulo} numberOfLines={1} ellipsizeMode="tail">
            {item.titulo}
          </Text>
          <Text style={styles.cardSubtitulo} numberOfLines={1} ellipsizeMode="tail">
            {item.genero}
          </Text>
        </View>
        <View style={styles.cardSeta}>
          <Text style={styles.cardSetaTexto}>➔</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header com branding Neo-Cyberpunk */}
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>CYBER ARCADE</Text>
        <Text style={styles.headerSubtitulo}>
          Selecione um game para ver detalhes
        </Text>
      </View>

      {/* Campo de busca com design escuro/borda ciano */}
      <View style={styles.buscaContainer}>
        <View style={styles.buscaInputWrapper}>
          <TextInput
            style={styles.buscaInput}
            placeholder="Buscar game no catálogo..."
            placeholderTextColor="#8A8C99"
            value={busca}
            onChangeText={setBusca}
            autoCorrect={false}
          />
        </View>
      </View>

      {/* Lista de jogos filtrada */}
      <FlatList
        data={jogosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.listaVazia}>
            <Text style={styles.listaVaziaTexto}>Nenhum jogo encontrado</Text>
          </View>
        }
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
  buscaContainer: {
    backgroundColor: "#0B0C10",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  buscaInputWrapper: {
    backgroundColor: "#161923",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#252B3B",
    paddingHorizontal: 14,
    paddingVertical: 2,
  },
  buscaInput: {
    height: 44,
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  lista: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161923",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: "#252B3B",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  cardIcone: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FF007F",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    shadowColor: "#FF007F",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
  },
  cardIconeTexto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cardInfo: {
    flex: 1,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  cardSubtitulo: {
    fontSize: 13,
    color: "#8A8C99",
  },
  cardSeta: {
    paddingHorizontal: 4,
  },
  cardSetaTexto: {
    fontSize: 18,
    color: "#00E5FF",
    fontWeight: "bold",
  },
  listaVazia: {
    paddingVertical: 60,
    alignItems: "center",
  },
  listaVaziaTexto: {
    color: "#8A8C99",
    fontSize: 15,
    fontWeight: "600",
  },
});

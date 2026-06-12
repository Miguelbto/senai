import { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const filmes = [
  {
    id: '1',
    titulo: 'Interestelar',
    genero: 'Ficcao Cientifica / Drama',
    plataforma: 'Paramount+ / Apple TV',
    nota: '10/10',
    sinopse:
      'Um grupo de astronautas viaja atraves de um buraco de minhoca em busca de um novo lar para a humanidade. Christopher Nolan entrega uma obra sobre amor, tempo e sobrevivencia.',
  },
  {
    id: '2',
    titulo: 'O Poderoso Chefao',
    genero: 'Crime / Drama',
    plataforma: 'Paramount+ / Max',
    nota: '10/10',
    sinopse:
      'A historia da familia Corleone e uma das mais poderosas ja contadas no cinema. Francis Ford Coppola dirigiu um dos filmes mais aclamados de todos os tempos.',
  },
  {
    id: '3',
    titulo: 'Clube da Luta',
    genero: 'Drama / Thriller',
    plataforma: 'Max / Amazon Prime',
    nota: '10/10',
    sinopse:
      'Um homem insone conhece um vendedor de sabao carismatico e juntos fundam um clube de luta clandestino. David Fincher dirige um dos thrillers mais provocadores do cinema.',
  },
  {
    id: '4',
    titulo: 'A Origem',
    genero: 'Acao / Sci-fi',
    plataforma: 'Netflix / Max',
    nota: '9/10',
    sinopse:
      'Um ladrao especializado em roubar segredos do subconsciente e contratado para implantar uma ideia na mente de um alvo. Um quebra-cabeca cinematografico fascinante.',
  },
  {
    id: '5',
    titulo: 'Pulp Fiction',
    genero: 'Crime / Drama',
    plataforma: 'Max / Amazon Prime',
    nota: '10/10',
    sinopse:
      'Historias entrelaçadas de criminosos, um boxeador e um par de assassinos em Los Angeles. Quentin Tarantino redefiniu o cinema independente nos anos 90.',
  },
  {
    id: '6',
    titulo: 'Forrest Gump',
    genero: 'Drama / Romance',
    plataforma: 'Paramount+ / Netflix',
    nota: '10/10',
    sinopse:
      'A vida extraordinaria de um homem simples que cruza os maiores eventos historicos americanos do seculo XX. Tom Hanks entrega uma das atuacoes mais memoraveis do cinema.',
  },
];

// TODO: adicionar { navigation } como parametro
export default function HomeScreen({ navigation }) {
  const [busca, setBusca] = useState('');
  const [filmesFiltrados, setFilmesFiltrados] = useState(filmes);

  useEffect(() => {
    const resultado = filmes.filter((filme) =>
      filme.titulo.toLowerCase().includes(busca.toLowerCase())
    );
    setFilmesFiltrados(resultado);
  }, [busca]);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        // TODO: onPress={() => navigation.navigate('Detalhe', { ...item })}
        onPress={() => navigation.navigate('Detalhe', { ...item })}
      >
        <View style={styles.cardIcone}>
          <Text style={styles.cardIconeTexto}>{item.titulo[0]}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitulo}>{item.titulo}</Text>
          <Text style={styles.cardSubtitulo}>{item.genero}</Text>
        </View>
        <View style={styles.notaBadge}>
          <Text style={styles.notaTexto}>{item.nota}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Catalogo de Filmes</Text>
        <Text style={styles.headerSubtitulo}>
          Escolha um filme para ver os detalhes
        </Text>
      </View>
      <View style={styles.buscaContainer}>
        <TextInput
          style={styles.buscaInput}
          placeholder="Buscar filme..."
          placeholderTextColor="#666666"
          value={busca}
          onChangeText={setBusca}
        />
      </View>
      <FlatList
        data={filmesFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  headerTitulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitulo: {
    fontSize: 13,
    color: '#AAAAAA',
    marginTop: 4,
  },
  buscaContainer: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  buscaInput: {
    backgroundColor: '#252525',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 14,
    color: '#FFFFFF',
  },
  lista: {
    paddingVertical: 12,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B35',
  },
  cardIcone: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardIconeTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitulo: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardSubtitulo: {
    fontSize: 13,
    color: '#AAAAAA',
  },
  notaBadge: {
    backgroundColor: '#252525',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  notaTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF6B35',
  },
});

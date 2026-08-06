// TODO: importar useState e useEffect — adicione a linha abaixo no topo:
// import { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const musicas = [
  {
    id: '1',
    titulo: 'Bohemian Rhapsody',
    genero: 'Rock / Opera',
    plataforma: 'Spotify / Apple Music',
    nota: '10/10',
    sinopse:
      'Uma das composicoes mais iconicas do rock. Queen criou uma obra atemporal que mistura balada, opera e hard rock em uma unica faixa de seis minutos.',
  },
  {
    id: '2',
    titulo: 'Blinding Lights',
    genero: 'Pop / Synth-pop',
    plataforma: 'Spotify / Amazon Music',
    nota: '10/10',
    sinopse:
      'The Weeknd entregou um dos maiores hits dos anos 2020. Com influencia dos anos 80 e uma linha de sintetizador irresistivel, a musica conquistou o mundo inteiro.',
  },
  {
    id: '3',
    titulo: 'HUMBLE.',
    genero: 'Hip-hop / Rap',
    plataforma: 'Spotify / Apple Music',
    nota: '9/10',
    sinopse:
      'Kendrick Lamar consolida sua posicao como um dos maiores rappers vivos. Com producao minimalista de Mike Will Made-It, a faixa e direta, intensa e poderosa.',
  },
  {
    id: '4',
    titulo: 'Shape of You',
    genero: 'Pop / Dance-pop',
    plataforma: 'Spotify / YouTube Music',
    nota: '9/10',
    sinopse:
      'Ed Sheeran criou uma das musicas mais ouvidas da historia do Spotify. Um hit pegajoso que mistura elementos tropicais com pop britanico.',
  },
  {
    id: '5',
    titulo: 'Redbone',
    genero: 'R&B / Soul',
    plataforma: 'Spotify / Apple Music',
    nota: '9/10',
    sinopse:
      'Childish Gambino entrega uma das faixas mais marcantes dos ultimos anos. Com groove funk dos anos 70 e vocal emotivo, a musica tem uma atmosfera unica e hipnotica.',
  },
  {
    id: '6',
    titulo: 'Smells Like Teen Spirit',
    genero: 'Rock / Grunge',
    plataforma: 'Spotify / Amazon Music',
    nota: '10/10',
    sinopse:
      'O anthem de uma geracao. Nirvana redefiniu o rock no inicio dos anos 90 com esse riff inconfundivel que ainda ressoa decadas depois.',
  },
];

// TODO: adicionar { navigation } como parametro quando a navegacao estiver configurada
export default function HomeScreen( {navigation} ) {
  // TODO: estado para o texto digitado na busca
  // const [busca, setBusca] = useState('');
  const [busca, setBusca] = useState('')

  // TODO: estado com as musicas exibidas na lista — inicia com todas
  // const [musicasFiltradas, setMusicasFiltradas] = useState(musicas);
  const [musicasFiltradas, setMusicasFiltradas] = useState(musicas)

  // TODO: filtrar as musicas sempre que o valor de 'busca' mudar
  // useEffect(() => {
  //   const resultado = musicas.filter((musica) =>
  //     musica.titulo.toLowerCase().includes(busca.toLowerCase())
  useEffect(() => {
    const resultado = musicas.filter((musica) =>
      musica.titulo.toLowerCase().includes(busca.toLowerCase())
    );
    setMusicasFiltradas(resultado);
  }, [busca]);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        // TODO: implementar onPress com navigation.navigate passando os dados da musica
        // onPress={() => navigation.navigate('Detalhe', { ...item })}
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
        <Text style={styles.headerTitulo}>Catalogo de Musicas</Text>
        <Text style={styles.headerSubtitulo}>
          Escolha uma musica para ver os detalhes
        </Text>
      </View>

      {/* Campo de busca — TODO: adicionar value={busca} e onChangeText={setBusca} */}
      <View style={styles.buscaContainer}>
        <TextInput
          style={styles.buscaInput}
          placeholder="Buscar musica..."
          placeholderTextColor="#6B6B6B"
          // value={busca}
          // onChangeText={setBusca}
          value={busca}
          onChangeText={setBusca}

        />
      </View>

      {/* TODO: trocar data={musicas} por data={musicasFiltradas} apos implementar o estado */}
      <FlatList
        data={musicasFiltradas}
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
    backgroundColor: '#121212',
  },
  header: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  headerTitulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitulo: {
    fontSize: 13,
    color: '#B3B3B3',
    marginTop: 4,
  },
  buscaContainer: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  buscaInput: {
    backgroundColor: '#282828',
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
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  cardIcone: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1DB954',
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
    color: '#B3B3B3',
  },
  notaBadge: {
    backgroundColor: '#282828',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 10,
  },
  notaTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1DB954',
  },
});

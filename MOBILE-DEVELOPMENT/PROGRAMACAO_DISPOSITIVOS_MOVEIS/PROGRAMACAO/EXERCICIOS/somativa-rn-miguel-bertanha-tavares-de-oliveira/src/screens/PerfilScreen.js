import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function PerfilScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Perfil</Text>
      </View>

      <View style={styles.cartao}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>U</Text>
        </View>
        <Text style={styles.nome}>Nome do Usuario</Text>
        <Text style={styles.email}>usuario@email.com</Text>

        <View style={styles.separador} />

        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Filmes salvos</Text>
          <Text style={styles.infoValor}>0</Text>
        </View>
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Filmes favoritos</Text>
          <Text style={styles.infoValor}>0</Text>
        </View>
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Cinefilo desde</Text>
          <Text style={styles.infoValor}>Maio 2026</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Editar perfil</Text>
      </TouchableOpacity>
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
  cartao: {
    margin: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#CC5220',
    marginBottom: 16,
  },
  avatarTexto: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  separador: {
    width: '100%',
    height: 1,
    backgroundColor: '#2A2A2A',
    marginBottom: 16,
  },
  infoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  infoValor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  botao: {
    marginHorizontal: 16,
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  botaoTexto: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

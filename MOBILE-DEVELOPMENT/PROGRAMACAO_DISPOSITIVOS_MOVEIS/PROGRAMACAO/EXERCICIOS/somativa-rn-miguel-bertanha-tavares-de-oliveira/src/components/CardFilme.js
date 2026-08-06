import { StyleSheet, Text, View } from 'react-native';

export default function CardFilme({ titulo, genero, plataforma, nota }) {
  return (
    <View style={styles.card}>
      <View style={styles.icone}>
        <Text style={styles.iconeTexto}>{titulo[0]}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={1}>{titulo}</Text>
        <Text style={styles.genero}>{genero}</Text>
        <Text style={styles.plataforma} numberOfLines={1}>{plataforma}</Text>
      </View>
      <View style={styles.notaBadge}>
        <Text style={styles.notaTexto}>{nota}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B35',
  },
  icone: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconeTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  info: {
    flex: 1,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  genero: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 2,
  },
  plataforma: {
    fontSize: 11,
    color: '#666666',
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

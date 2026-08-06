// Componente reutilizavel: BotaoAcao
// Exemplo de componente extraido para a pasta components/
// TODO: estilizar com as cores do seu tema
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function BotaoAcao({ texto, onPress, ativo }) {
  return (
    <TouchableOpacity
      style={[styles.botao, ativo && styles.botaoAtivo]}
      onPress={onPress}
    >
      <Text style={styles.texto}>{texto}</Text>
    </TouchableOpacity>
  );
}

// TODO: ajustar as cores para o tema do seu app
const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  botaoAtivo: {
    backgroundColor: '#555555',
  },
  texto: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

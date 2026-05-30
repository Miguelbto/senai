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
    backgroundColor: "#161923",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: "#FF007F",
    shadowColor: "#FF007F",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  botaoAtivo: {
    backgroundColor: "#FF007F",
    borderColor: "#FF007F",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  texto: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
});

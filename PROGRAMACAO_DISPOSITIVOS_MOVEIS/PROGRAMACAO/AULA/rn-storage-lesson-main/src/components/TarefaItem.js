import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Componente responsável por renderizar UM item da lista de tarefas.
// Recebe a tarefa e duas funções (callbacks) vindas do componente pai (a screen)
// para avisar quando o usuário quer concluir ou excluir essa tarefa.
export default function TarefaItem({ tarefa, aoAlternarConcluida, aoExcluir }) {
  return (
    <View style={styles.item}>
      {/* Ao tocar no texto, a tarefa alterna entre concluída/pendente */}
      <TouchableOpacity
        style={styles.textoContainer}
        onPress={() => aoAlternarConcluida(tarefa.id)}
      >
        <Text style={[styles.texto, tarefa.concluida && styles.textoConcluido]}>
          {tarefa.texto}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={() => aoExcluir(tarefa.id)}
      >
        <Text style={styles.textoBotaoExcluir}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    // Sombra leve só para destacar o card (funciona em iOS e Android)
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  textoContainer: {
    flex: 1,
    marginRight: 10,
  },
  texto: {
    fontSize: 16,
    color: '#222',
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  botaoExcluir: {
    backgroundColor: '#e74c3c',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  textoBotaoExcluir: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

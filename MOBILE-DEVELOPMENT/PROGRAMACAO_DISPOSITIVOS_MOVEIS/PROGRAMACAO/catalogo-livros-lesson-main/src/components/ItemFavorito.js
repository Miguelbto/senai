import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function ItemFavorito({ item, cores, onRemover, onEditar }) {
  const [observacao, setObservacao] = useState(item.observacao || '');
  const [salvando, setSalvando] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const livro = item.livro;

  async function handleSalvar() {
    if (observacao === item.observacao) return;
    // TODO: chamar onEditar(item.id, observacao) e atualizar os estados salvando e feedback
  }

  function handleRemover() {
    Alert.alert(
      'Remover favorito',
      `Deseja remover "${livro?.titulo}" dos favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: () => onRemover(item.id) },
      ]
    );
  }

  const corFeedback = feedback?.tipo === 'sucesso' ? cores.success : cores.error;

  return (
    <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
      <View style={styles.cabecalho}>
        {livro?.capa ? (
          <Image source={{ uri: livro.capa }} style={styles.capa} resizeMode="cover" />
        ) : null}
        <View style={styles.infoLivro}>
          <Text style={[styles.titulo, { color: cores.text }]} numberOfLines={2}>
            {livro?.titulo ?? 'Livro desconhecido'}
          </Text>
          <Text style={[styles.autor, { color: cores.textSecondary }]} numberOfLines={1}>
            {livro?.autor}
          </Text>
          <Text style={[styles.preco, { color: cores.primary }]}>
            R$ {livro?.preco?.toFixed(2)}
          </Text>
        </View>
      </View>

      <TextInput
        style={[styles.input, { backgroundColor: cores.background, borderColor: cores.border, color: cores.text }]}
        placeholder="Adicione uma observacao..."
        placeholderTextColor={cores.textSecondary}
        value={observacao}
        onChangeText={setObservacao}
        multiline
        returnKeyType="done"
        blurOnSubmit
        onSubmitEditing={handleSalvar}
      />

      <View style={styles.acoes}>
        <TouchableOpacity
          style={[styles.botaoSalvar, { backgroundColor: cores.primary }]}
          onPress={handleSalvar}
          disabled={salvando}
        >
          <Text style={{ color: cores.primaryText, fontWeight: '600', fontSize: 13 }}>
            {salvando ? 'Salvando...' : 'Salvar'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botaoRemover, { borderColor: cores.error }]}
          onPress={handleRemover}
        >
          <Text style={{ color: cores.error, fontWeight: '600', fontSize: 13 }}>Remover</Text>
        </TouchableOpacity>
      </View>

      {feedback && (
        <Text style={[styles.feedback, { color: corFeedback }]}>{feedback.texto}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cabecalho: {
    flexDirection: 'row',
    gap: 12,
  },
  capa: {
    width: 60,
    height: 90,
    borderRadius: 6,
  },
  infoLivro: {
    flex: 1,
    justifyContent: 'center',
    gap: 3,
  },
  titulo: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
  },
  autor: {
    fontSize: 12,
  },
  preco: {
    fontSize: 13,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  acoes: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoSalvar: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoRemover: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  feedback: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
  },
});

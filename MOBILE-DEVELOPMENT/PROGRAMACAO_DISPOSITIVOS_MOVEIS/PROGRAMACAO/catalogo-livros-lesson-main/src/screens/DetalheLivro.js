import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useTema } from '../context/ThemeContext';
import { buscarLivroPorId, adicionarFavorito } from '../services/api';

export default function DetalheLivro({ route }) {
  const { livroId } = route.params;
  const { cores } = useTema();

  const [livro, setLivro] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const [adicionando, setAdicionando] = useState(false);
  const [jaFavoritado, setJaFavoritado] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const carregar = useCallback(async () => {
    // TODO: chamar buscarLivroPorId(livroId) e atualizar os estados livro, carregando e erro
  }, [livroId]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function handleAdicionarFavorito() {
    // TODO: chamar adicionarFavorito(livro.id, '') e tratar os estados adicionando, jaFavoritado e feedback
  }

  if (carregando) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <ActivityIndicator size="large" color={cores.primary} />
        <Text style={[styles.texto, { color: cores.textSecondary }]}>Carregando...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <Text style={[styles.texto, { color: cores.error }]}>Erro: {erro}</Text>
        <TouchableOpacity style={[styles.botao, { backgroundColor: cores.primary }]} onPress={carregar}>
          <Text style={{ color: cores.primaryText, fontWeight: '600' }}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!livro) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <Text style={[styles.texto, { color: cores.textSecondary, textAlign: 'center' }]}>
          Implemente buscarLivroPorId() em services/api.js{'\n'}e chame-a dentro de carregar()
        </Text>
      </View>
    );
  }

  const corFeedback = feedback?.tipo === 'sucesso' ? cores.success : cores.error;

  return (
    <ScrollView style={{ backgroundColor: cores.background }} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: livro.capa }} style={styles.capa} resizeMode="cover" />
      <View style={styles.conteudo}>
        <Text style={[styles.titulo, { color: cores.text }]}>{livro.titulo}</Text>
        <Text style={[styles.autor, { color: cores.textSecondary }]}>{livro.autor}</Text>
        <Text style={[styles.preco, { color: cores.primary }]}>R$ {livro.preco.toFixed(2)}</Text>
        <Text style={[styles.labelSinopse, { color: cores.text }]}>Sinopse</Text>
        <Text style={[styles.sinopse, { color: cores.textSecondary }]}>{livro.sinopse}</Text>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: jaFavoritado || adicionando ? cores.border : cores.primary }]}
          onPress={handleAdicionarFavorito}
          disabled={adicionando || jaFavoritado}
          activeOpacity={0.8}
        >
          <Text style={{ color: cores.primaryText, fontWeight: '700', fontSize: 15 }}>
            {adicionando ? 'Adicionando...' : jaFavoritado ? 'Ja nos Favoritos' : 'Adicionar aos Favoritos'}
          </Text>
        </TouchableOpacity>

        {feedback && (
          <Text style={[styles.feedback, { color: corFeedback }]}>{feedback.texto}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centrado: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },
  container: { paddingBottom: 40 },
  capa: { width: '100%', height: 340 },
  conteudo: { padding: 20, gap: 8 },
  titulo: { fontSize: 22, fontWeight: '800', lineHeight: 28 },
  autor: { fontSize: 15 },
  preco: { fontSize: 20, fontWeight: '700', marginTop: 4 },
  labelSinopse: { fontSize: 16, fontWeight: '700', marginTop: 12 },
  sinopse: { fontSize: 14, lineHeight: 22 },
  botao: { marginTop: 20, paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  feedback: { textAlign: 'center', fontSize: 14, fontWeight: '600' },
  texto: { fontSize: 15, textAlign: 'center' },
});

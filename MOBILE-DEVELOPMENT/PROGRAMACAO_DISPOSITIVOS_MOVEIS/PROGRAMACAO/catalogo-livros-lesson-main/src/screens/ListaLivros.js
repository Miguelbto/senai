import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useTema } from '../context/ThemeContext';
import { buscarLivros } from '../services/api';
import CardLivro from '../components/CardLivro';

export default function ListaLivros({ navigation }) {
  const { cores } = useTema();

  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    // TODO: chamar buscarLivros() e atualizar os estados livros, carregando e erro
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  if (carregando) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <ActivityIndicator size="large" color={cores.primary} />
        <Text style={[styles.mensagem, { color: cores.textSecondary }]}>Carregando livros...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <Text style={[styles.mensagem, { color: cores.error }]}>Erro: {erro}</Text>
        <TouchableOpacity
          style={[styles.botaoTentar, { backgroundColor: cores.primary }]}
          onPress={carregar}
        >
          <Text style={{ color: cores.primaryText, fontWeight: '600' }}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: cores.background }]}>
      <FlatList
        data={livros}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CardLivro
            livro={item}
            cores={cores}
            onPress={(id) => navigation.navigate('DetalheLivro', { livroId: id })}
          />
        )}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={[styles.mensagem, { color: cores.textSecondary, marginTop: 48 }]}>
            Nenhum livro carregado ainda.{'\n'}Implemente buscarLivros() em services/api.js
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centrado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 24,
  },
  lista: {
    padding: 16,
    gap: 12,
  },
  mensagem: {
    fontSize: 15,
    textAlign: 'center',
  },
  botaoTentar: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
});

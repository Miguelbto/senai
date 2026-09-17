import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function CardLivro({ livro, onPress, cores }) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}
      onPress={() => onPress(livro.id)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: livro.capa }} style={styles.capa} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={[styles.titulo, { color: cores.text }]} numberOfLines={2}>
          {livro.titulo}
        </Text>
        <Text style={[styles.autor, { color: cores.textSecondary }]} numberOfLines={1}>
          {livro.autor}
        </Text>
        <Text style={[styles.preco, { color: cores.primary }]}>
          R$ {livro.preco.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  capa: {
    width: 80,
    height: 120,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    gap: 4,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  autor: {
    fontSize: 13,
  },
  preco: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
});

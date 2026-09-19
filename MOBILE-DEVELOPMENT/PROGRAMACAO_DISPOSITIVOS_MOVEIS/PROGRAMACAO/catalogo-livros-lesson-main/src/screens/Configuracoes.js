import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTema } from '../context/ThemeContext';

export default function Configuracoes() {
  const { cores, modoEscuro, alternarTema } = useTema();

  return (
    <View style={[styles.container, { backgroundColor: cores.background }]}>
      <View style={[styles.card, { backgroundColor: cores.card, borderColor: cores.border }]}>
        <View style={styles.linha}>
          <View style={styles.labelGroup}>
            <Text style={[styles.labelTitulo, { color: cores.text }]}>Tema escuro</Text>
            <Text style={[styles.labelDesc, { color: cores.textSecondary }]}>
              {modoEscuro ? 'Ativado' : 'Desativado'} — preferencia salva automaticamente
            </Text>
          </View>
          <Switch
            value={modoEscuro}
            onValueChange={alternarTema}
            trackColor={{ false: cores.border, true: cores.primary }}
            thumbColor={cores.primaryText}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  labelGroup: {
    flex: 1,
    gap: 3,
  },
  labelTitulo: {
    fontSize: 15,
    fontWeight: '600',
  },
  labelDesc: {
    fontSize: 13,
  },
});

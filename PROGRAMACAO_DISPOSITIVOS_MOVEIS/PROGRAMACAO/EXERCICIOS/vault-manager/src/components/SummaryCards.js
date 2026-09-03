import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SummaryCards({ saldo = 0, receitas = 0, despesas = 0 }) {
  // Função auxiliar para formatar em Real (R$)
  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <View style={styles.container}>
      {/* Card Principal: Saldo Atual */}
      <View style={styles.mainCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.mainCardLabel}>Saldo Atual</Text>
          <Ionicons name="wallet-outline" size={24} color="#FFF" />
        </View>
        <Text style={styles.mainCardValue}>{formatCurrency(saldo)}</Text>
      </View>

      {/* Sub-cards: Receitas e Despesas */}
      <View style={styles.row}>
        {/* Card Receitas */}
        <View style={styles.subCard}>
          <View style={styles.subCardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#D1FAE5' }]}>
              <Ionicons name="arrow-down" size={18} color="#10B981" />
            </View>
            <Text style={styles.subCardLabel}>Receitas</Text>
          </View>
          <Text style={[styles.subCardValue, { color: '#10B981' }]}>
            {formatCurrency(receitas)}
          </Text>
        </View>

        {/* Card Despesas */}
        <View style={styles.subCard}>
          <View style={styles.subCardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="arrow-up" size={18} color="#EF4444" />
            </View>
            <Text style={styles.subCardLabel}>Despesas</Text>
          </View>
          <Text style={[styles.subCardValue, { color: '#EF4444' }]}>
            {formatCurrency(despesas)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  mainCard: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mainCardLabel: {
    color: '#E0E7FF',
    fontSize: 14,
    fontWeight: '500',
  },
  mainCardValue: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  subCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  subCardLabel: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '500',
  },
  subCardValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
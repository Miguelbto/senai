import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import TransactionItem from '../components/TransactionItem';
import TransactionModal from '../components/TransactionModal';
import {
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from '../database/transactionRepository';

export default function HistoryScreen() {
    
    const [ filtro, setFiltro ] = useState('Todos')
    const [ transacoes, setTransacoes ] = useState([])
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ itemToEdit, setItemToEdit ] = useState(null)

    //Busca as transações filtradas no SQLite
    const loadTransactions = useCallback(async (tipoFiltro) => {
        try {
            const data = await getTransactions(tipoFiltro)
            setTransacoes(data)
        } catch (error) {
            console.error('Erro ao buscar histórico', error)
        }
    }, [])

    useFocusEffect(
        useCallback(() => {
            loadTransactions(filtro)
        }, [filtro, loadTransactions])
    )

    //Troca a pipula de filtro selecionada 
    const handleSelectFilter = (novoFiltro) => {
        setFiltro(novoFiltro)
        loadTransactions(novoFiltro)
    }

    // Salva a edição do item selecionado
    const handleSaveEdit = async (data) => {
        try {
            if (data.id) {
                await updateTransaction(
                    data.id,
                    data.descricao,
                    data.valor,
                    data.tipo,
                    data.categoria,
                    data.data
                )
                loadTransactions(filtro)
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar a transação')
        }
    }

    //Confirmação e remoção no banco
    const handleDelete = (id) => {
        Alert.alert(
            'Confirmar Exclusão',
            'Tem certeza que deseja apagar este registro do histórico ?',
            [
                { text: 'Confirmar', style: 'cancel'},
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteTransaction(id)
                            loadTransactions(filtro)
                        } catch (error) {
                            Alert.alert('Erro', 'Erro ao excluir transação')
                        }
                    }
                }
            ]
        )
    }

    const handleopenEdit = (item) => {
        setItemToEdit(item)
        setModalVisible(true)
    }

    return (
        <View style={styles.container}>
            {/* Pílulas de filtros */}
            <View style={styles.filterContainer}>
                {['Todos', 'Receitas', 'Despesas'].map((item) => {
                    const isSelected = filtro === item
                    return (
                        <TouchableOpacity
                        key={item}
                        style={[styles.filterPill, isSelected && styles.filterPillActive]}
                        onPress={() => handleSelectFilter(item)}
                        >
                            <Text style={[styles.filterText, isSelected && styles.filterTextActive]}>{item}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>


            {/* Lista Principal de Histórico */}
            <FlatList 
            data={transacoes}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma transação encontrada nesta categoria.</Text>
          </View>
        }
            renderItem={({ item }) => (
                <TransactionItem 
                item={item}
                onEdit={handleopenEdit}
                onDelete={handleDelete}
                />
            )}
            />

            {/* Modal reaproveitado para Edição */}
            <TransactionModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSave={handleSaveEdit}
            itemToEdit={itemToEdit}
            />

        </View>
    )



}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'flex-start',
  },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 10,
  },
  filterPillActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 14,
  },
});
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export default function TransactionModal({ visible, onClose, onSave, itemToEdit = null }) {

  const [tipo, setTipo] = useState('despesa')
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [categoria, setCategoria] = useState('Alimentação')
  const [data, setData] = useState('')

  //preenche os campos se estiver em modo de edição ou reseta para novo cadastro
  useEffect(() => {
    if (itemToEdit) {
      setTipo(itemToEdit.tipo)
      setDescricao(itemToEdit.descricao)
      setValor(itemToEdit.valor.toString())
      setCategoria(itemToEdit.categoria)
      setData(itemToEdit.data)
    } else {
      setTipo('despesa')
      setDescricao('')
      setValor('')
      setCategoria('Alimentação')
      //Data atual
      const today = new Date().toISOString().split('T')[0]
      setData(today)
    }
  }, [itemToEdit, visible])

  const handleSave = () => {
    if (!descricao || !descricao.trim()) {
      Alert.alert('Erro, por favor insira uma descrição')
      return
    }

    const valorNumerico = parseFloat(valor.replace(',', '.'))
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Erro, insira um valor númerico válido')
      return
    }

    //Retorna os dados para a tela pai salvar no SQLite
    onSave({
      id: itemToEdit ? itemToEdit.id : null,
      descricao: descricao.trim(),
      valor: valorNumerico,
      tipo,
      categoria,
      data: data || new Date().toISOString().split('T')[0]
    })

    onClose()
  }

  return (
    <Modal visible={visible} animationType='slide' transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* header do Modal */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {itemToEdit ? 'Editar Transaação' : 'Nova Transação'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name='close-circle-outline' size={28} color='#94A3B8' />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Seletor Tipo: Receita / Despesa */}
            <View style={styles.typeSelector}>
              <TouchableOpacity style={[styles.typeButton, tipo === 'receita' && styles.typeReceitaActive]} onPress={() => setTipo('receita')} >
                <Ionicons name='arrow-down-circle' size={20} color={tipo === 'receita' ? '#FFF' : '#10B981'} />
                <Text style={[styles.typeText, tipo === 'receita' && styles.typeTextActive]}>
                  Receita
                </Text>
              </TouchableOpacity>


              <TouchableOpacity style={[styles.typeButton, tipo === 'despesa' && styles.typeDespesaActive]} onPress={() => setTipo('despesa')} >
                <Ionicons name='arrow-up-circle' size={20} color={tipo === 'despesa' ? '#FFF' : '#EF4444'} />
                <Text style={[styles.typeText, tipo === 'despesa' && styles.typeTextActive]}>
                  Despesa
                </Text>
              </TouchableOpacity>
            </View>

            {/* Input Valor */}
            <Text style={styles.label}>Valor (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder={'0,00'}
              keyboardType='numeric'
              value={valor}
              onChangeText={setValor}
            />

            {/* Input Descrição */}
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={styles.input}
              placeholder='Ex: Supermercado, Salário'
              value={descricao}
              onChangeText={setDescricao}
            />

            {/* Selecionar categoria */}
            <Text style={styles.label}>Categoria</Text>
            <View style={styles.pickerContainer}>
              <Picker
                mode='dropdown'
                selectedValue={categoria}
                onValueChange={(itemValue) => setCategoria(itemValue)}
              >
                <Picker.Item label='Alimentação' value='Alimentação' />
                <Picker.Item label='Transporte' value='transporte' />
                <Picker.Item label='Renda / Salário' value='Renda' />
                <Picker.Item label='Lazer' value='Lazer' />
                <Picker.Item label='Outros' value='Outros' />
              </Picker>
            </View>

            {/* Input Data */}
            <Text style={styles.label}>Data (AAAA-MM-DD)</Text>
            <TextInput style={styles.input}
              placeholder='2026-08-29'
              value={data}
              onChangeText={setData}
            />

            {/* Botão Salvar */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave} >
              <Ionicons name='checkmark-sharp' size={20} color='#FFF' style={{ marginRight: 8 }} />
              <Text style={styles.saveButtonText}>
                {itemToEdit ? 'Atualizar Transação' : 'Salvar Transação'}
              </Text>
            </TouchableOpacity>
            
          </ScrollView>

        </View>

      </View>

    </Modal>
  )

}




const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  typeReceitaActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  typeDespesaActive: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  typeText: {
    marginLeft: 8,
    fontWeight: '600',
    color: '#64748B',
  },
  typeTextActive: {
    color: '#FFFFFF',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    marginBottom: 16,
  },
  pickerContainer: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  saveButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
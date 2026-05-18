/**
 * ============================================
 * EXERCÍCIO — Componente de Recados
 * ============================================
 *
 * OBJETIVO:
 * Criar um componente onde o usuário digita uma
 * mensagem e clica em Enviar para exibi-la na tela.
 *
 * COMPORTAMENTOS ESPERADOS:
 * 1. O usuário digita no campo de texto
 * 2. Ao clicar em Enviar, a mensagem aparece abaixo
 * 3. O campo de texto é limpo após o envioconst styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  texto: { fontSize: 24, marginBottom: 20 },
});
 *
 * NOVIDADE — onChangeText:
 * O TextInput tem uma prop chamada onChangeText.
 * Ela funciona como o onPress do TouchableOpacity,
 * mas para texto: toda vez que o usuário digita
 * uma letra, ela chama uma função passando o
 * valor atual do campo como argumento.
 *
 * Exemplo:
 *   <TextInput
 *     onChangeText={texto => console.log(texto)}
 *   />
 *
 * DICA — dois estados:
 * Você vai precisar de dois useState:
 *   - Um para guardar o que está sendo digitado
 *   - Um para guardar o que foi enviado
 *
 * Por quê dois? Se você usar só um, a mensagem
 * aparece letra por letra enquanto o usuário digita.
 * Com dois, ela só aparece quando o botão for clicado.
 *
 * DICA — limpar o campo:
 * Para limpar o TextInput após o envio, basta
 * atualizar o estado do texto para string vazia ''.
 * Use a prop value={} no TextInput para conectar
 * o estado ao campo visualmente.
 *
 * ============================================
 */

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function Recados() {

  // TODO 1 — Crie um estado para o texto que está sendo digitado
  // Dica: valor inicial é uma string vazia ''


  // TODO 2 — Crie um estado para o recado que foi enviado
  // Dica: valor inicial é uma string vazia ''


  // TODO 3 — Crie a função handleEnviar
  // Ela deve:
  //   - Atualizar o recado enviado com o texto atual
  //   - Limpar o campo de texto (setar texto para '')


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📝 Recados</Text>

      {/*
        TODO 4 — Complete o TextInput:
        - Conecte o estado do texto na prop value={}
        - Use onChangeText para atualizar o estado
          a cada letra digitada

        Exemplo de onChangeText:
          onChangeText={texto => setTexto(texto)}
      */}
      <TextInput
        style={styles.input}
        placeholder="Digite sua mensagem..."
        value={/* seu estado aqui */}
        onChangeText={/* sua função aqui */}
      />

      {/*
        TODO 5 — Conecte o botão à função handleEnviar
      */}
      <TouchableOpacity style={styles.botao} onPress={/* sua função aqui */}>
        <Text style={styles.botaoTexto}>Enviar</Text>
      </TouchableOpacity>

      {/*
        TODO 6 — Exiba o recado enviado APENAS se ele não for vazio
        Dica: use a renderização condicional
          {recadoEnviado !== '' && (...)}
      */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  botao: {
    backgroundColor: '#cc0000',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 24,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#cc0000',
  },
  label: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
  recado: {
    fontSize: 18,
    color: '#222222',
  },
});

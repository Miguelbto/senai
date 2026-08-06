// ============================================
// AULA: Expressoes JavaScript no JSX
// ============================================
// MOMENTO 1 - Conceitos fundamentais
// Live coding: professor escreve, alunos acompanham
// ============================================

import { View, Text, StyleSheet } from "react-native";

export default function ExpressoesJSX() {
  // Variaveis para os exemplos
  const nome = "Maria";
  const idade = 25;
  const preco = 49.9;

  const usuario = {
    nome: "Ana",
    cidade: "Rio de Janeiro",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Expressoes JSX</Text>

      {/* ETAPA 1: Variaveis dentro de chaves {}
          Dica: troque "Maria" por outro nome, 25 por outra idade
          Use chaves {} para inserir qualquer variavel JavaScript no JSX */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>1. Variaveis</Text>
        <Text>Nome: {nome}</Text>
        <Text>Idade: {idade}</Text>
      </View>

      {/* ETAPA 2: Chamando funcoes
          Dica: troque toUpperCase() por toLowerCase()
          Qualquer funcao JavaScript funciona dentro de {} */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>2. Funcoes</Text>
        <Text>Maiusculas: {nome.toUpperCase()}</Text>
        <Text>Soma: {2 + 2}</Text>
      </View>

      {/* ETAPA 3: Operacoes matematicas
          Dica: troque toFixed(2) por toFixed(0), toFixed(3)
          Expressoes com calculos funcionam dentro de {} */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>3. Operacoes</Text>
        <Text>Preco: R$ {preco.toFixed(2)}</Text>
        <Text>Dobro: R$ {(preco * 2).toFixed(2)}</Text>
      </View>

      {/* ETAPA 4: Acessando objetos
          Dica: troque usuario.nome por usuario.cidade
          Acesse propriedades de objetos com ponto (.) */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>4. Objetos</Text>
        <Text>{usuario.nome}</Text>
        <Text>{usuario.cidade}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4285f4",
    marginBottom: 8,
  },
  exemplo: {
    width: "80%",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
});

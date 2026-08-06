// ============================================
// AULA: Listas e o Metodo .map()
// ============================================
// MOMENTO 1 - Conceitos fundamentais
// Live coding: professor escreve, alunos acompanham
// ============================================

import { View, Text, StyleSheet } from "react-native";

export default function ListasEMap() {
  // Dados para os exemplos
  const frutas = ["Maca", "Banana", "Laranja"];

  const alunos = [
    { id: 1, nome: "Ana", nota: 9.5 },
    { id: 2, nome: "Bruno", nota: 7.8 },
    { id: 3, nome: "Carla", nota: 6.5 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Listas e .map()</Text>

      {/* ETAPA 1: .map() com array de strings
          Dica: adicione mais frutas no array e veja a lista crescer
          .map() transforma cada item do array em um elemento JSX */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>1. map() com strings</Text>
        {frutas.map((fruta, indice) => (
          <Text key={indice}>
            {indice + 1}. {fruta}
          </Text>
        ))}
      </View>

      {/* ETAPA 2: .map() com array de objetos
          Dica: adicione mais alunos no array
          Use o id do objeto como key (melhor que indice) */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>2. map() com objetos</Text>
        {alunos.map((aluno) => (
          <View key={aluno.id} style={styles.linha}>
            <Text>{aluno.nome}</Text>
            <Text style={{ fontWeight: "bold" }}>{aluno.nota}</Text>
          </View>
        ))}
      </View>

      {/* ETAPA 3: .filter() + .map()
          Dica: troque 7 por 8, 6, 9 para mudar o filtro
          Use filter() antes do map() para mostrar apenas alguns itens */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>3. filter() + map()</Text>
        {alunos
          .filter((a) => a.nota >= 7)
          .map((a) => (
            <Text key={a.id}>Aprovado: {a.nome}</Text>
          ))}
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
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
});

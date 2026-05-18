// ============================================
// AULA: Estrutura Basica do JSX
// ============================================
// MOMENTO 1 - Conceitos fundamentais
// Live coding: professor escreve, alunos acompanham
// ============================================

import { View, Text, StyleSheet } from "react-native";

export default function EstruturaJSX() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Estrutura JSX</Text>

      {/* ETAPA 1: Elemento raiz unico
          Dica: tente remover a View pai e veja o erro
          Todo JSX precisa de UM elemento envolvendo tudo */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>1. Elemento Raiz</Text>
        <Text>Linha 1</Text>
        <Text>Linha 2</Text>
      </View>

      {/* ETAPA 2: Fragment
          Dica: troque <></> por <View></View> e compare
          Fragment agrupa elementos sem criar uma View extra na tela */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>2. Fragment</Text>
        <>
          <Text>Com Fragment</Text>
          <Text>Sem View adicional</Text>
        </>
      </View>

      {/* ETAPA 3: Auto-fechamento
          Dica: troque width: 50, height: 50 por outros valores
          Componentes sem filhos usam /> para fechar */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>3. Auto-fechamento</Text>
        <View style={styles.box} />
        <Text>Box vazia acima</Text>
      </View>

      {/* ETAPA 4: camelCase nos atributos
          Dica: troque fontSize para 12, 20, 28
          Em JSX usamos camelCase: fontSize, fontWeight, backgroundColor */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>4. camelCase</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          fontSize, fontWeight
        </Text>
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
  box: {
    width: 50,
    height: 50,
    backgroundColor: "#4285f4",
    borderRadius: 4,
    marginBottom: 8,
  },
});

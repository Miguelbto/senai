// ============================================
// COMPONENTE: View e Flexbox
// ============================================
// MOMENTO 2 - Conceitos avancados
// Professor demonstra PRIMEIRO, alunos replicam DEPOIS
// ============================================

import { View, Text, StyleSheet } from "react-native";

export default function ViewExemplos02() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>View e Flexbox</Text>

      {/* ETAPA 1: flex (proporcao)
          Dica: troque os valores flex: 1, 2, 1 por 1, 1, 1 ou 1, 3, 1
          flex define a proporcao de espaco que cada filho ocupa */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>1. flex (proporcao)</Text>
        <View style={{ flexDirection: "row", height: 60, gap: 8 }}>
          <View style={[styles.box, { flex: 1 }]}>
            <Text style={styles.textBox}>1</Text>
          </View>
          <View style={[styles.box, { flex: 2 }]}>
            <Text style={styles.textBox}>2</Text>
          </View>
          <View style={[styles.box, { flex: 1 }]}>
            <Text style={styles.textBox}>1</Text>
          </View>
        </View>
      </View>

      {/* ETAPA 2: flexWrap
          Dica: troque "wrap" por "nowrap" e veja a diferenca
          flexWrap faz os itens quebrarem para a proxima linha */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>2. flexWrap</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          <View style={[styles.box, { width: 80 }]} />
          <View style={[styles.box, { width: 80 }]} />
          <View style={[styles.box, { width: 80 }]} />
          <View style={[styles.box, { width: 80 }]} />
        </View>
      </View>

      {/* ETAPA 3: alignSelf
          Dica: troque "center" por "flex-start", "flex-end", "stretch"
          alignSelf sobrescreve o alignItems do pai para UM item especifico */}
      {/* <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>3. alignSelf</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            height: 80,
            gap: 8,
          }}
        >
          <View style={[styles.box, { height: 30 }]} />
          <View style={[styles.box, { height: 30, alignSelf: "center" }]}>
            <Text style={styles.textBox}>center</Text>
          </View>
          <View style={[styles.box, { height: 30 }]} />
        </View>
      </View> */}

      {/* ETAPA 4: position absolute
          Dica: troque top: 10, right: 10 por bottom: 10, left: 10
          position absolute remove o item do fluxo e posiciona em relacao ao pai */}
      {/* <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>4. position absolute</Text>
        <View
          style={{
            position: "relative",
            height: 100,
            backgroundColor: "#f0f0f0",
            borderRadius: 8,
          }}
        >
          <View
            style={[styles.box, { position: "absolute", top: 10, right: 10 }]}
          >
            <Text style={styles.textBox}>abs</Text>
          </View>
        </View>
      </View> */}
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
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

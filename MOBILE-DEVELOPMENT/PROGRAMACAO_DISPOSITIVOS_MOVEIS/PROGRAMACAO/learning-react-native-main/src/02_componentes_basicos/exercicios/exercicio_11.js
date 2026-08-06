import { StatusBar, StyleSheet, Text, View } from "react-native";

// EXERCICIO 11 - DIFICULDADE MEDIA
// Reproduza o layout abaixo usando apenas View, Text e Flexbox:
//
// +------------------------------------------+
// | Azul (1/4) | Vermelho (2/4) | Verde (1/4)|  <- altura 120
// +------------------------------------------+
// |                                          |
// |              Laranja (flex: 1)           |  <- ocupa todo espaco restante
// |                                          |
// +-------------------+----------------------+
// |   Roxo (flex: 1)  |  Cinza (flex: 1)    |  <- altura 80
// +-------------------+----------------------+
//
// Dicas:
// - Use flexDirection "row" nas linhas com multiplas colunas
// - Lembre que flex: 2 ocupa o dobro do espaco de flex: 1 na mesma linha
// - O container principal deve ser flexDirection "column"

export default function ExercicioView11() {
  return (
    <View style={styles.container}>
      <View style={styles.topoRow}>
        <View style={styles.topoAzul}>
          <Text style={styles.textStyle}>Azul</Text>
        </View>
        <View style={styles.topoVermelho}>
          <Text style={styles.textStyle}>Vermelho</Text>
        </View>
        <View style={styles.topoVerde}>
          <Text style={styles.textStyle}>Verde</Text>
        </View>
      </View>

      <View style={styles.meioLaranja}>
        <Text style={styles.textStyle}>Laranja</Text>
      </View>

      <View style={styles.fundoRow}>
        <View style={styles.fundoRoxo}>
          <Text style={styles.textStyle}>Roxo</Text>
        </View>
        <View style={styles.fundoCinza}>
          <Text style={styles.textStyle}>Cinza</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: "column",
    gap: 8,
    padding: 8,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },

  topoRow: {
    flexDirection: "row",
    height: 120,
    gap: 8,
  },
  topoAzul: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  topoVermelho: {
    flex: 2,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  topoVerde: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  meioLaranja: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  fundoRow: {
    flexDirection: "row",
    height: 80,
    gap: 8,
  },
  fundoRoxo: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  fundoCinza: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});

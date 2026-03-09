import { ReturnDocument } from "mongodb";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function Lista02() {

  function calcularNota(nota) {
    if(nota >= 7) {
      return <Text style={{color: "green"}}>Aprovado</Text>
    }if (nota >= 5 && nota < 7){<Text style={[styles.texto, styles.Recuperacao]}>Recuperação</Text>}
    else {
      <Text style={[styles.texto, styles.Reprovado]}>Reprovado</Text>
    }

  const loja_aberta = true;
  const tem_promocao = true;
  const nota = 7.5;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Lista 02 - Miguel</Text>

        <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.label}>Exercício 1 - Operador Ternário</Text>
        <Text style={styles.texto}>Status: {loja_aberta} ? "Aberto" : "Fechado"</Text>
      </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Exercício 2 - Operador &&</Text>
        {tem_promocao && <Text style={styles.texto}>Promoção ativa! Aproveite os descontos</Text>}
        {!loja_aberta && <Text style={styles.texto}></Text>}
      </View>
      
      <View style={styles.card}>
        <Text style={styles.label}>Exercício 2 - Operador &&</Text>

        <Text>{calcularStatus(nota)}</Text>


      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Exercício 1 - Operador Ternàrio</Text>
        
        <Text style={styles.texto}>
          Status: {loja_aberta ? "Aberto" : "Fechado"}
        </Text>
      </View>

        <View style={styles.card}>
        <Text style={styles.label}>Exercício 2 - Operador &&</Text>

        {tem_promocao && (
          <Text style={styles.textoPromocao}>
            Promoção ativa! Aproveite os descontos.
          </Text>
        )}

      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Exercício 3 - Múltiplas Condições</Text>

        <Text style={styles.label}>{calcularNota(nota)}</Text>

        
        {/*{nota >= 7 ? (
          <Text style={[styles.texto, styles.aprovado]}>
            Aprovado
          </Text>
        ) : nota >= 5 ? (
          <Text style={[styles.texto, styles.recuperacao]}>
            Recuperação
          </Text>
        ) : (
          <Text style={[styles.texto, styles.reprovado]}>
            Reprovado
          </Text>
        )*/}

      </View>

      

    </ScrollView>
  );
  
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingTop: 60 },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#212121",
  },
  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1565C0",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 8,
  },
  texto: { fontSize: 14, color: "#424242", lineHeight: 22 },
  Aprovado: {
    fontSize: 14, color: "#008000", lineHeight: 22
  },
  Recuperacao: {
    fontSize: 14, color: "#FFFF00", lineHeight: 22
  },
  Reprovado: {
    fontSize: 14, color: "#FF0000", lineHeight: 22
  }
});}
import { ReturnDocument } from "mongodb";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function Lista03() {

  const frutas = ["Maça", "Banana", "Laranja", "Uva"];

  const produtos = [
    {id: 1, nome: "Camiseta", preco: 49.90},
    {id: 2, nome: "Calça", preco: 89.90},
    {id: 3, nome: "Tênis", preco: 199.90},
  ];
  
  const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const numerosPares = numeros.filter(numero => numero % 2 === 0);


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Lista 01 - Miguel</Text>

       <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.label}>Exercício 1 - Listas de Frutas</Text>
        {frutas.map((frutas, index) =>(
            <Text key={index}>
                {index + 1} - {frutas}
            </Text>
        ))}
      </View>
      </View>

      <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.label}>Exercício 2 - Listas de Produtos</Text>
        {frutas.map((produtos) =>(
            <Text key={produtos.id}>
                {produtos.nome} - {produtos.preco}
            </Text>
        ))}
      </View>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.label}>Exercício 2 - Operador &&</Text>

        <Text>{VerificarNota(nota)}</Text>

      </View>

      <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.label}>Exercício 2 - Exercício 3 - Filtrar Números</Text>
        {numeros
        .filter((numeros) => produtos / 2)
        .map((produtos) =>(
            <Text key={produtos.id}>
                {produtos.nome} - R${produtos.preco.toFixed(2)}
            </Text>
        ))}
      </View>
      </View>


      <View style={styles.card}>
      <Text style={styles.label}>Exercício 3 - Números Pares</Text>

      {numerosPares.map((numero) => (
        <Text key={numero} style={styles.texto}>
          {numero}
        </Text>
      ))}

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
});
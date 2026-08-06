import { View, Text, StyleSheet } from "react-native";


export default function Exemplo04() {

    const frutas = ["Laranja", "Acerola", "Abacaxi"];

    const alunos = [
        {id: 1, nome: "Marlon", nota:8},
        {id: 2, nome: "Daniel", nota:10},
        {id: 3, nome: "Celso", nota:6.9},
    ]
    

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Listas e Map</Text>
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>Map comum</Text>
        {frutas.map((frutas, index) => (
            <Text key={index}>
                {index + 1} - {frutas}
            </Text>
        ))}
      </View>

      <View style={styles.container}>
      <Text style={styles.titulo}>Map em objeto</Text>
      {alunos.map((alunos) => (
        <Text key={alunos.id}>
            {alunos.nome} - {alunos.nota}
        </Text>
      ))}
      
    </View>

    <View style={styles.container}>
      <Text style={styles.titulo}>Map com Filter</Text>
      {alunos
      .filter((alunos) => alunos.nota >= 7)
      .map((aluno) => (
        <Text key={aluno.id}>
            Aprovado: {aluno.nome} - Nota: {aluno.nota}
        </Text>
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
});
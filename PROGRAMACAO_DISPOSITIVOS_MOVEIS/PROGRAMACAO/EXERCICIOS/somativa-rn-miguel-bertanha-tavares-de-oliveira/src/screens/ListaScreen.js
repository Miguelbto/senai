import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { CardFilme } from "../components";

const filmesMock = [
  {
    id: "1",
    titulo: "Interestelar",
    genero: "Ficcao Cientifica / Drama",
    plataforma: "Paramount+ / Apple TV",
    nota: "10/10",
  },
  {
    id: "3",
    titulo: "Clube da Luta",
    genero: "Drama / Thriller",
    plataforma: "Max / Amazon Prime",
    nota: "10/10",
  },
];

// TODO: adicionar { route } como parametro da funcao
export default function ListaScreen({ route }) {
  const [itensSalvos, setItensSalvos] = useState(filmesMock);

  // TODO: utilizar useEffect para observar route.params e adicionar o novo filme ao estado da lista
  // useEffect(() => {
  //   if (route.params?.novoFilme) {
  //     setItensSalvos(...);
  //   }
  // }, [... colocar a variavel de estado]);

    useEffect(() => {
      
      if (route.params?.novoFilme) {
        setItensSalvos(itensSalvos);
      }
    }, [...filmesMock]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Minha Lista</Text>
      </View>

      <FlatList
        data={itensSalvos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardFilme
            titulo={item.titulo}
            genero={item.genero}
            plataforma={item.plataforma}
            nota={item.nota}
          />
        )}
        ListEmptyComponent={
          <View style={styles.conteudo}>
            <View style={styles.iconeContainer}>
              <Text style={styles.icone}>F</Text>
            </View>
            <Text style={styles.titulo}>Nenhum filme salvo</Text>
            <Text style={styles.descricao}>Sua lista aparecera aqui</Text>
            <Text style={styles.dica}>
              Acesse um filme e toque em "Adicionar a Lista" para salva-lo aqui.
            </Text>
          </View>
        }
        contentContainerStyle={itensSalvos.length === 0 && styles.listaVazia}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  header: {
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },
  headerTitulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  listaVazia: {
    flex: 1,
  },
  conteudo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingTop: 80,
  },
  iconeContainer: {
    width: 96,
    height: 96,
    borderRadius: 16,
    backgroundColor: "#FF6B35",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  icone: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  descricao: {
    fontSize: 16,
    color: "#AAAAAA",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },
  dica: {
    fontSize: 13,
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
  },
});

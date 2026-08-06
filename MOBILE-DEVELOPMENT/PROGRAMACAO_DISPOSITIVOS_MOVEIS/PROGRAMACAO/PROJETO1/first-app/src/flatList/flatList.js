import { useState } from "react"
import { TextInput, View, Alert, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import CardItem from "./cardItem";

export default function FlatListExemplos() {
    const alunos = [
        {id:"1", nome: "Ana", nota: 9.5},
        {id:"2", nome: "Miguel", nota: 9.5},
        {id:"3", nome: "Láis", nota: 9.5},
        {id:"4", nome: "Brenda", nota: 9.5},
        {id:"5", nome: "Yago", nota: 9.5},
        {id:"6", nome: "Rodrigo", nota: 9.5},
    ]


    return (

        <View style={styles.container}>
            <Text style={styles.titulo}>FlatList</Text>
            <View style={styles.exemplo}>
                <Text style={styles.subtitulo}>1. FlatList básico</Text>
                <FlatList data={alunos} keyExtractor={(item) => item.id} renderItem={({item: aluno}) => <CardItem nome={aluno.nome} nota={aluno.nota}/>}
                
                />
            </View>
        </View>
        
    )
}

```

Exemplo FlatList
```
const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: "center",
backgroundColor: "#f5f5f5",
paddingTop: 60,
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

exemploLista: {
width: "80%",
// height: 250,
padding: 16,
marginBottom: 16,
backgroundColor: "#fff",
borderRadius: 8,
},
linha: {
flexDirection: "row",
justifyContent: "space-between",
padding: 10,
backgroundColor: "#f5f5f5",
marginBottom: 4,
borderRadius: 4,
},
});

```
Exemplo Formulários
```
```
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
input: {
borderWidth: 1,
borderColor: "#ddd",
borderRadius: 8,
padding: 12,
marginBottom: 8,
},
botao: {
backgroundColor: "#4285f4",
padding: 12,
borderRadius: 8,
alignItems: "center",
marginTop: 4,
},
textoBotao: {
color: "#fff",
fontWeight: "bold",
},
});

```
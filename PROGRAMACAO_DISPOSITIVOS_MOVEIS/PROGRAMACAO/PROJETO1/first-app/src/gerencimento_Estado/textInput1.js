import { useEffect, useState } from "react";
import {Text, View, StyleSheet, Alert, Button } from "react-native"

export default function TelaMoeda(){
    const[moedas, setMoedas] = useState(0)
    useEffect(()=>{
        console.log("Executou");
        if (moedas === 5){
            Alert.alert ("Sucesso, você desbloqueou o baú")
        }
    }, [])

    return(
        <View style={styles.container}>
            <Text style={styles.texto}>Moedas coletadas:{moedas}</Text>
            <Button title="Pegar moeda" onPress={()=> setMoedas(moedas+1)}/>
        </View>
    );
}
```
Exemplo useState
```

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: "center",
justifyContent: "center",
},

button: {
backgroundColor: "#4285f4",
padding: 12,
borderRadius: 8,
marginTop: 16,
},

text: {
color: "#fff",
},
});

```
Exemplo useRef
```
const styles = StyleSheet.create({
container: {
flex: 1,
padding: 20,
justifyContent: "center",
},
titulo: {
fontSize: 24,
fontWeight: "bold",
marginBottom: 20,
textAlign: "center",
},
input: {
borderWidth: 1,
borderColor: "#ccc",
borderRadius: 8,
padding: 15,
marginBottom: 15,
fontSize: 16,
},
});
```

Exemplo useEffect
```
const styles = StyleSheet.create({
container: { flex: 1, justifyContent: "center", alignItems: "center" },
texto: { fontSize: 24, marginBottom: 20 },
});

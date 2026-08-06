import {useState} from "react";
import {TextInput, View, StyleSheet, Text } from "react-native"

export default function TelaDeLogin(){
    const senhaRef = useRef(null);

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Login</Text>
            <TextInput 
            style={styles.input}
            placeholder="digite o seu email"
            keyboardType= "email-address"
            returnKeyType="next"
            onSubmitEditing={()=> senhaRef.current?.focus()}/>

            <TextInput 
            style={styles.input}
            placeholder="digite sua senha"
            secureTextEntry={true}
            returnKeyType="send"
            ref={senhaRef}/>

        </View>
    )

}

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
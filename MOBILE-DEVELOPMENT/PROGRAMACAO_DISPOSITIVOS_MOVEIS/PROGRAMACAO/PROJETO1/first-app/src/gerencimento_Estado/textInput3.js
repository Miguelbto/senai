import {useState} from "react";
import {Text, TouchableOpacity, View, StyleSheet } from "react-native"


export default function ContadorExample(){
    return(
        <View style={styles.container}>
            <Text>{contador}</Text>
            <TouchableOpacity 
            onPress= {()=> setContador ((prev)=>prev+1)}
            style={styles.button}>
                <Text style={styles.text}>Clique para acrescentar o valor</Text>
            </TouchableOpacity>
        </View>
    ); 
}

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
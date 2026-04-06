 import { View, Text, StyleSheet } from "react-native";

export default function Botao({titulo}) {
    return (<TouchableOpacity style={{alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,}}>
        <Text style={{color: '#fff', textAlign: 'center' }}
        > {titulo} </Text>

    </TouchableOpacity>)
}


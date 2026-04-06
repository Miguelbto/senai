 import { View, Text, StyleSheet } from "react-native";

export default function CardUsuario({nome, email}) {
    return <Text>{nome} - {email} </Text>
}
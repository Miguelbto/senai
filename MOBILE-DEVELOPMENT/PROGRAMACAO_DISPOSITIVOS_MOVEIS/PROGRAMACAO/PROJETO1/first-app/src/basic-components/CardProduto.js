 import { View, Text, StyleSheet } from "react-native";

export default function CardProduto({nome, preco}) {
    return <Text>{nome} - R${preco} reais</Text>
}
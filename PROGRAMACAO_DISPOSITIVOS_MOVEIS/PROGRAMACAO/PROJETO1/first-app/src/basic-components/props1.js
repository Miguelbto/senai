import { StyleSheet, Text, View } from "react-native";

// Adicione o "export default" antes da função
export default function CartaoPerfilp(props) {
    return (
        <View style={styles.card}> 
            <Text>Nome: {props.nome}</Text>
            <Text>Idade: {props.idade}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
});
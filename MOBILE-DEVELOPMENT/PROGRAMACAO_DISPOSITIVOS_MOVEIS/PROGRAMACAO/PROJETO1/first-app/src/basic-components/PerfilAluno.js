 import { View, Text, StyleSheet } from "react-native";

export default function PerfilAluno({nome, turma, matricula}) {
    return <Text>
    Nome:{nome}
    Turma:{turma}
    Matrícula: {matricula}</Text>
}
import { Text, View } from "react-native";

// Passe os parametros de forma correta e realize a estilização do componente
export default function CardJogo({titulo, genero, plataforma, nota}) {
  return (
    <View>
      <Text>Titulo: {titulo}</Text>
      <Text>Genero: {genero}</Text>
      <Text>Plataforma: {genero}</Text>
      <Text>Nota: {nota}</Text>
    </View>
  );
}


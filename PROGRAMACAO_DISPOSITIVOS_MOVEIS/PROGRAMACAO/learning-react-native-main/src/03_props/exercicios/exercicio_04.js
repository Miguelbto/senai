// ============================================
// EXERCICIO 04 - Composicao com Props
// ============================================
// Crie uma tela de "Lista de Contatos" usando composicao.
//
// TAREFA 1: Crie um componente "Avatar" que recebe
//           "inicial" (string) e "cor" (string),
//           e mostra um circulo colorido com a letra.
//
// TAREFA 2: Crie um componente "Contato" que recebe
//           "nome", "telefone" e "cor".
//           Internamente, ele deve USAR o componente Avatar.
//
// TAREFA 3: Use desestruturacao em todos os componentes.
//
// TAREFA 4: Renderize pelo menos 4 contatos diferentes.
// ============================================

import { View, Text, StyleSheet } from "react-native";

// Crie o componente Avatar aqui

// Crie o componente Contato aqui (usando Avatar internamente)

export default function Exercicio04() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Exercicio 04 - Lista de Contatos</Text>

      {/* Renderize os componentes Contato aqui */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    gap: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  contato: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    width: "80%",
    gap: 12,
  },
  contatoNome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contatoTelefone: {
    fontSize: 13,
    color: "#666",
  },
});

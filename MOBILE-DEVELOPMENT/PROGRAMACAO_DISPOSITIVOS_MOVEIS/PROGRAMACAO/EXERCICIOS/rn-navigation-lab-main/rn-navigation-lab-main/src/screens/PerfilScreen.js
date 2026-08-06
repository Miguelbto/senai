import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BotaoAcao } from "../components";

export default function PerfilScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho da tela de perfil */}
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>PERFIL GAMER</Text>
        <Text style={styles.headerSubtitulo}>
          Suas informações e conquistas
        </Text>
      </View>

      {/* Cartão de Perfil Principal */}
      <View style={styles.cartao}>
        {/* Avatar customizado com inicial do nome e brilho neon rosa */}
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>M</Text>
        </View>

        {/* Nome do usuário e Email temáticos */}
        <Text style={styles.nome}>Ana Gamer</Text>
        <Text style={styles.email}>anaferraz@cyberarcade.com</Text>

        <View style={styles.separador} />

        {/* Estatísticas customizadas do Perfil */}
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Level do Jogador</Text>
          <Text style={styles.infoValor}>LV 42</Text>
        </View>
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Conquistas Desbloqueadas</Text>
          <Text style={styles.infoValor}>158</Text>
        </View>
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>GamerScore Total</Text>
          <Text style={styles.infoValor}>9,250 XP</Text>
        </View>
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Membro desde</Text>
          <Text style={styles.infoValor}>Maio 2026</Text>
        </View>
      </View>

      {/* Botão de Ação Utilizando o Componente Reutilizável */}
      <View style={styles.botaoWrapper}>
        <BotaoAcao
          texto="Editar Perfil"
          onPress={() => alert("Editar perfil em breve!")}
          ativo={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0C10",
  },
  header: {
    backgroundColor: "#0D0E15",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 22,
    borderBottomWidth: 1.5,
    borderBottomColor: "#FF007F",
  },
  headerTitulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 2,
    textShadowColor: "rgba(255, 0, 127, 0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  headerSubtitulo: {
    fontSize: 13,
    color: "#C5C6C7",
    marginTop: 4,
    fontWeight: "500",
  },
  cartao: {
    margin: 16,
    backgroundColor: "#161923",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#252B3B",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FF007F",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 16,
    shadowColor: "#FF007F",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  avatarTexto: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  nome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  email: {
    fontSize: 14,
    color: "#00E5FF",
    fontWeight: "600",
    marginBottom: 22,
  },
  separador: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#252B3B",
    marginBottom: 16,
  },
  infoLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1C2130",
  },
  infoLabel: {
    fontSize: 14,
    color: "#8A8C99",
    fontWeight: "500",
  },
  infoValor: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  botaoWrapper: {
    marginTop: 8,
  },
});

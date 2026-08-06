import { StyleSheet, Text, View } from "react-native";

export default function CardJogo({ titulo, genero, plataforma, nota }) {
  // Garantir fallback para valores indefinidos
  const displayTitulo = titulo || "Título do Jogo";
  const displayGenero = genero || "Gênero";
  const displayPlataforma = plataforma || "Plataforma";
  const displayNota = nota || "N/A";
  const inicial = displayTitulo.trim().charAt(0).toUpperCase();

  return (
    <View style={styles.card}>
      {/* Círculo do Ícone do Jogo com efeito Cyber-Pink Glow */}
      <View style={styles.cardIcone}>
        <Text style={styles.cardIconeTexto}>{inicial}</Text>
      </View>

      {/* Informações textuais do Jogo */}
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitulo} numberOfLines={1} ellipsizeMode="tail">
          {displayTitulo}
        </Text>
        <Text style={styles.cardSubtitulo} numberOfLines={1} ellipsizeMode="tail">
          {displayGenero}
        </Text>
        <View style={styles.plataformaBadge}>
          <Text style={styles.plataformaTexto}>{displayPlataforma}</Text>
        </View>
      </View>

      {/* Badge da Nota do Jogo no lado direito com neon ciano */}
      <View style={styles.cardNotaContainer}>
        <Text style={styles.cardNota}>{displayNota}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161923",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: "#252B3B",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  cardIcone: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FF007F",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#FF007F",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },
  cardIconeTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cardInfo: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  cardSubtitulo: {
    fontSize: 13,
    color: "#8A8C99",
    marginBottom: 6,
  },
  plataformaBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#1F2833",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#2D3748",
  },
  plataformaTexto: {
    fontSize: 10,
    color: "#00E5FF",
    fontWeight: "bold",
  },
  cardNotaContainer: {
    backgroundColor: "rgba(0, 229, 255, 0.08)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: "#00E5FF",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 46,
    shadowColor: "#00E5FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  cardNota: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#00E5FF",
  },
});

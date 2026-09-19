import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTema } from "../context/ThemeContext";
import {
  listarFavoritos,
  editarFavorito,
  removerFavorito,
} from "../services/api";
import ItemFavorito from "../components/ItemFavorito";

export default function Favoritos() {
  const { cores } = useTema();

  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    // TODO: chamar listarFavoritos() e atualizar os estados favoritos, carregando e erro
  }, []);

  // useFocusEffect: roda toda vez que a aba ganha foco, nao apenas na montagem.
  // Isso garante que a lista atualize ao voltar da tela de detalhes.
  // useCallback envolve o callback para evitar que o effect rode em loop.
  // O callback nao pode ser async — funcoes async retornam Promise, causando erro.
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar]),
  );

  async function handleEditar(id, observacao) {
    // TODO: chamar editarFavorito(id, observacao) e atualizar o item no estado favoritos
  }

  async function handleRemover(id) {
    // TODO: chamar removerFavorito(id) e retirar o item do estado favoritos
  }

  if (carregando) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <ActivityIndicator size="large" color={cores.primary} />
        <Text style={[styles.textoCentro, { color: cores.textSecondary }]}>
          Carregando favoritos...
        </Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <Text style={[styles.textoCentro, { color: cores.error }]}>
          Erro: {erro}
        </Text>
        <TouchableOpacity
          style={[styles.botaoTentar, { backgroundColor: cores.primary }]}
          onPress={carregar}
        >
          <Text style={{ color: cores.primaryText, fontWeight: "600" }}>
            Tentar novamente
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (favoritos.length === 0) {
    return (
      <View style={[styles.centrado, { backgroundColor: cores.background }]}>
        <Text style={[styles.textoCentro, { color: cores.textSecondary }]}>
          Nenhum favorito ainda.{"\n"}Implemente listarFavoritos() em
          services/api.js
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: cores.background }]}>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ItemFavorito
            item={item}
            cores={cores}
            onEditar={handleEditar}
            onRemover={handleRemover}
          />
        )}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centrado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 24,
  },
  lista: {
    padding: 16,
    gap: 12,
  },
  textoCentro: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  botaoTentar: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
});

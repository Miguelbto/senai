// ============================================
// COMPONENTE: Props - Desestruturacao
// ============================================
// MOMENTO 2 - Desestruturacao de props
// Live coding: professor escreve, alunos acompanham
// ============================================
//
// ANALOGIA: Imagine que voce recebe uma caixa (props) com varios itens
// dentro. Em vez de abrir a caixa toda vez que precisa de algo
// (props.nome, props.idade), voce TIRA tudo da caixa de uma vez
// e coloca na mesa: const { nome, idade } = props;
//
// Desestruturacao e um recurso do JavaScript (nao e exclusivo do React).
// Ela torna o codigo mais limpo e facil de ler.
// ============================================

import { View, Text, StyleSheet } from "react-native";

// ============================================
// ETAPA 1: ANTES - Acessando props com "props.algo"
// Funciona, mas fica repetitivo quando temos muitas props.
// ============================================
function CartaoSemDesestruturacao(props) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardNome}>{props.nome}</Text>
      <Text style={styles.cardDetalhe}>Turma: {props.turma}</Text>
      <Text style={styles.cardDetalhe}>Nota: {props.nota}</Text>
    </View>
  );
}

// ============================================
// ETAPA 2: DEPOIS - Desestruturacao no corpo da funcao
// Extraimos as props em variaveis separadas.
// O codigo fica mais curto e legivel.
// ============================================
function CartaoComDesestruturacao(props) {
  const { nome, turma, nota } = props;

  return (
    <View style={styles.card}>
      <Text style={styles.cardNome}>{nome}</Text>
      <Text style={styles.cardDetalhe}>Turma: {turma}</Text>
      <Text style={styles.cardDetalhe}>Nota: {nota}</Text>
    </View>
  );
}

// ============================================
// ETAPA 3: Desestruturacao DIRETO no parametro
// A forma mais comum no React. Em vez de receber "props",
// ja extraimos os valores na assinatura da funcao.
// Este e o padrao que voce vai ver na maioria dos projetos.
// ============================================
function CartaoDirecto({ nome, turma, nota }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardNome}>{nome}</Text>
      <Text style={styles.cardDetalhe}>Turma: {turma}</Text>
      <Text style={styles.cardDetalhe}>Nota: {nota}</Text>
    </View>
  );
}

// ============================================
// ETAPA 4: Desestruturacao com valores padrao
// Podemos definir valores padrao diretamente na desestruturacao.
// Se a prop nao for passada, o valor padrao e usado.
// ============================================
function Perfil({ nome = "Anonimo", papel = "Aluno", ativo = true }) {
  return (
    <View style={[styles.perfil, { opacity: ativo ? 1 : 0.4 }]}>
      <View
        style={[
          styles.perfilBadge,
          { backgroundColor: ativo ? "#34a853" : "#999" },
        ]}
      >
        <Text style={styles.perfilInicial}>{nome[0]}</Text>
      </View>
      <View>
        <Text style={styles.cardNome}>{nome}</Text>
        <Text style={styles.cardDetalhe}>{papel}</Text>
      </View>
    </View>
  );
}

// ============================================
// ETAPA 5: Desestruturacao com rest operator (...)
// O operador "..." coleta TODAS as props restantes
// em um objeto. Util quando voce quer repassar props
// para um componente filho sem listar uma a uma.
// ============================================
function BotaoCustomizado({ texto, cor = "#4285f4", ...estiloExtra }) {
  return (
    <View
      style={[
        styles.botao,
        { backgroundColor: cor },
        estiloExtra,
      ]}
    >
      <Text style={styles.botaoTexto}>{texto}</Text>
    </View>
  );
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function PropsDesestruturacao() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Props - Momento 2</Text>
      <Text style={styles.tituloSub}>Desestruturacao</Text>

      {/* ETAPA 1: Sem desestruturacao */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>1. Sem desestruturacao (props.algo)</Text>
        <CartaoSemDesestruturacao nome="Maria" turma="3A" nota={8.5} />
      </View>

      {/* ETAPA 2: Desestruturacao no corpo */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>2. Desestruturacao no corpo</Text>
        <CartaoComDesestruturacao nome="Joao" turma="2B" nota={9.0} />
      </View>

      {/* ETAPA 3: Desestruturacao no parametro */}
      {/* Dica: compare o codigo das 3 versoes - qual e mais limpa? */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>3. Desestruturacao no parametro</Text>
        <CartaoDirecto nome="Ana" turma="1C" nota={7.5} />
      </View>

      {/* ETAPA 4: Com valores padrao */}
      {/* Dica: remova a prop "papel" do segundo Perfil */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>4. Valores padrao</Text>
        <Perfil nome="Carlos" papel="Professor" />
        <Perfil nome="Laura" />
        <Perfil ativo={false} />
      </View>

      {/* ETAPA 5: Rest operator */}
      {/* Dica: adicione borderRadius={20} como prop */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>5. Rest operator (...)</Text>
        <View style={{ gap: 8 }}>
          <BotaoCustomizado texto="Padrao" />
          <BotaoCustomizado texto="Vermelho" cor="#e53935" />
          <BotaoCustomizado texto="Com borda" cor="#ff9800" borderRadius={20} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tituloSub: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4285f4",
    marginBottom: 8,
  },
  exemplo: {
    width: "80%",
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
  },
  cardNome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDetalhe: {
    fontSize: 13,
    color: "#666",
  },
  perfil: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  perfilBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  perfilInicial: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  botao: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

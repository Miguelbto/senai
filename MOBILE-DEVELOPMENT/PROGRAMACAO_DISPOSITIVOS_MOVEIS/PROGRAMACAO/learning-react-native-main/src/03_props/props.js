// ============================================
// COMPONENTE: Props
// ============================================
// MOMENTO 1 - O que sao props?
// Live coding: professor escreve, alunos acompanham
// ============================================
//
// ANALOGIA: Pense em um componente como uma maquina de fazer camisetas.
// A maquina e sempre a mesma, mas voce ENVIA informacoes diferentes:
// cor, tamanho, estampa. Essas informacoes sao as PROPS.
//
// Props = "propriedades" que um componente PAI envia para um componente FILHO.
// O filho RECEBE e USA, mas NAO MODIFICA.
// ============================================

import { View, Text, StyleSheet } from "react-native";

// ============================================
// ETAPA 1: Componente SEM props (estatico)
// Este componente sempre mostra a mesma coisa.
// Problema: e se quisermos mostrar nomes diferentes?
// ============================================
function SaudacaoEstatica() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTexto}>Ola, Maria!</Text>
    </View>
  );
}

// ============================================
// ETAPA 2: Componente COM props (dinamico)
// Agora o componente recebe o nome de FORA.
// "props" e um objeto que chega como parametro da funcao.
// Dica: troque o valor de "nome" la embaixo para ver a mudanca.
// ============================================
function SaudacaoDinamica(props) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTexto}>Ola, {props.nome}!</Text>
    </View>
  );
}

// ============================================
// ETAPA 3: Multiplas props
// Um componente pode receber VARIAS props de uma vez.
// Cada prop e um campo do objeto "props".
// ============================================
function CartaoAluno(props) {
  return (
    <View style={[styles.card, { borderLeftColor: props.cor, borderLeftWidth: 4 }]}>
      <Text style={styles.cardNome}>{props.nome}</Text>
      <Text style={styles.cardDetalhe}>Turma: {props.turma}</Text>
      <Text style={styles.cardDetalhe}>Idade: {props.idade} anos</Text>
    </View>
  );
}

// ============================================
// ETAPA 4: Props com valores padrao
// Se nenhum valor for passado, usamos um valor padrao.
// Isso evita que o componente quebre ou fique vazio.
// ============================================
function Etiqueta(props) {
  const texto = props.texto || "Sem titulo";
  const cor = props.cor || "#4285f4";

  return (
    <View style={[styles.etiqueta, { backgroundColor: cor }]}>
      <Text style={styles.etiquetaTexto}>{texto}</Text>
    </View>
  );
}

// ============================================
// COMPONENTE PRINCIPAL - Tela que usa todos os exemplos
// Aqui o App.js vai importar este componente.
// Observe como PASSAMOS as props usando atributos no JSX.
// ============================================
export default function PropsExemplos() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Props - Momento 1</Text>

      {/* ETAPA 1: Componente estatico */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>1. Sem props (estatico)</Text>
        <SaudacaoEstatica />
      </View>

      {/* ETAPA 2: Componente com props */}
      {/* Dica: troque "Carlos" por outro nome */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>2. Com props (dinamico)</Text>
        <SaudacaoDinamica nome="Carlos" />
        <SaudacaoDinamica nome="Ana" />
        <SaudacaoDinamica nome="Pedro" />
      </View>

      {/* ETAPA 3: Multiplas props */}
      {/* Dica: adicione mais um CartaoAluno com seus dados */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>3. Multiplas props</Text>
        <CartaoAluno nome="Lucas" turma="3A" idade={17} cor="#4285f4" />
        <CartaoAluno nome="Julia" turma="2B" idade={16} cor="#34a853" />
      </View>

      {/* ETAPA 4: Props com valores padrao */}
      {/* Dica: remova a prop "texto" e veja o que acontece */}
      <View style={styles.exemplo}>
        <Text style={styles.subtitulo}>4. Valores padrao</Text>
        <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
          <Etiqueta texto="React Native" cor="#61dafb" />
          <Etiqueta texto="JavaScript" cor="#f7df1e" />
          <Etiqueta />
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
    marginBottom: 20,
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
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
  },
  cardTexto: {
    fontSize: 16,
  },
  cardNome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDetalhe: {
    fontSize: 13,
    color: "#666",
  },
  etiqueta: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  etiquetaTexto: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

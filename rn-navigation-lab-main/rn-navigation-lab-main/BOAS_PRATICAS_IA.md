# Boas Praticas ao usar Inteligencia Artificial no desenvolvimento

Este guia vai te ajudar a usar ferramentas de IA (como ChatGPT, Claude, Gemini e outras) de forma inteligente — aprendendo junto, e nao apenas copiando codigo sem entender.

---

## Por que usar IA do jeito certo importa

Usar IA para gerar codigo sem entender o que ela produziu e perigoso:

- Voce nao consegue corrigir erros quando aparecem
- Voce nao aprende nada para a prova seguinte
- O codigo pode ter problemas que voce nao vai perceber

Usar IA do jeito certo e uma habilidade real de mercado. Desenvolvedores profissionais usam IA todos os dias, mas eles sabem o que estao pedindo e conseguem avaliar o que recebem.

---

## Regra de ouro

Nunca cole um bloco de codigo sem conseguir explicar o que cada parte faz.

Se voce nao entende, pergunte para a IA explicar — linha por linha, se necessario.

---

## Como construir um bom prompt

Um prompt fraco gera um resultado generico que provavelmente nao serve para o seu projeto. Um prompt especifico gera exatamente o que voce precisa.

### Estrutura recomendada

```
Contexto: [o que voce esta construindo e com qual tecnologia]
Objetivo: [o que voce quer que a IA faca]
Restricoes: [o que ela NAO deve fazer ou incluir]
Formato: [como voce quer receber a resposta]
```

### Exemplos

**Prompt fraco:**
```
Me da um StyleSheet bonito para React Native
```

**Prompt forte:**
```
Estou fazendo um app de catalogo de games em React Native com Expo.
Quero um StyleSheet para uma HomeScreen com tema escuro, usando tons de roxo e preto.
O componente tem: uma View de header com titulo e subtitulo, e cards em FlatList
com icone a esquerda, titulo e genero do jogo.
Nao use bibliotecas externas — apenas StyleSheet do React Native.
Explica cada propriedade que voce usar.
```

---

## Tecnicas para aprender junto com a IA

### Peca explicacoes antes do codigo

Em vez de pedir direto o codigo pronto, comece assim:

```
Antes de gerar o codigo, me explica como funciona o Bottom Tab Navigator
do React Navigation. Quais sao os componentes principais e como eles se relacionam?
```

Depois que voce entender o conceito, ai sim pede o exemplo de codigo.

---

### Peca para explicar o codigo gerado

Depois de receber um bloco de codigo, pergunte:

```
Agora explica esse codigo que voce gerou. O que faz cada parte?
Por que voce usou [alguma propriedade especifica]?
```

---

### Use a IA para revisar o seu proprio codigo

Escreva o codigo voce mesmo primeiro, depois peca uma revisao:

```
Escrevi esse componente de navegacao em React Navigation.
Voce consegue identificar algum erro ou algo que poderia ser melhorado?
[cole o seu codigo]
```

---

### Peca alternativas

```
Voce gerou esse codigo usando Bottom Tab. Me mostra como ficaria
a mesma estrutura usando Drawer Navigation. Qual a diferenca pratica
entre os dois para o usuario final?
```

---

### Quando travar em um erro, descreva o erro com contexto

**Prompt fraco:**
```
Ta dando erro na navegacao
```

**Prompt forte:**
```
Estou usando React Navigation com Stack Navigator em um projeto Expo.
Ao tentar navegar da HomeScreen para a DetalheScreen com navigation.navigate('Detalhe', { id: item.id }),
recebo o erro: "The action 'NAVIGATE' with payload {"name":"Detalhe"} was not handled by any navigator."
Meu App.js esta assim: [cole o codigo]
O que pode estar errado?
```

---

## Para a estilizacao deste exercicio

Use a IA para gerar paletas de cores e StyleSheets, mas siga este processo:

1. Escolha o tema voce mesmo — a IA nao escolhe por voce
2. Descreva o tema, o clima visual que voce quer (escuro, vibrante, minimalista) e os componentes que precisam de estilo
3. Receba o StyleSheet, leia cada propriedade antes de colar
4. Adapte o que nao fizer sentido para o seu projeto — nao cole cego

### Prompt modelo para pedir estilizacao

```
Estou fazendo um app de [SEU TEMA] em React Native com Expo.
Quero estilizar a HomeScreen com um tema [escuro/claro/vibrante/minimalista].
As cores principais devem ser [descreva as cores ou peca sugestao].
A tela tem:
- Um header com titulo e subtitulo
- Uma FlatList com cards que contem: [descreva os campos]
Gera o StyleSheet completo e explica as escolhas de cor e espacamento.
```

---

## O que a IA nao faz por voce

- Entender o seu projeto melhor do que voce
- Corrigir um erro que voce nao soube descrever
- Aprender no seu lugar

A IA e uma ferramenta. Quanto mais contexto voce der, melhor ela responde. Quanto mais voce entender o que ela gerou, mais util ela se torna.

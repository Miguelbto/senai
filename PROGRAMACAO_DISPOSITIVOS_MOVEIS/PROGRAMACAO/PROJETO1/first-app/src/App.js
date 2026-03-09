import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Exemplo01 from './jsx_examples/exemplo-01-estrutura';
import Exemplo02 from './jsx_examples/exemplo-02-expressoes';
import Exemplo04 from './jsx_examples/exemplo-04-listas';
import Exemplo03 from './jsx_examples/exemplo-03-condicionais';
import Lista01 from './jsx-exercicios/lista-01';
import Lista02 from './jsx-exercicios/lista-02';
import Lista03 from './jsx-exercicios/lista-03';
import Lista02Exer from './jsx-exercicios/lista-02';
import ViewExample from './basic-components/view-exemples01';

export default function App() {
  return (
    <View style={styles.container}>
      <ViewExample/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

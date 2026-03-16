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
import ViewExample2 from './basic-components/view-example02';
import ExercicioView01 from './basic-components/view-exer';
import ExercicioView02 from './basic-components/view-exer2';
import ExercicioView03 from './basic-components/view-exer3';
import ExercicioView04 from './basic-components/view-exer04';
import ExercicioView05 from './basic-components/view-exer5';
import ExercicioView06 from './basic-components/view-exer6';
import ExercicioView07 from './basic-components/view-exer07';
import ExercicioView08 from './basic-components/view-exer08';
import ExercicioView09 from './basic-components/view-exer09';
import ExercicioView10 from './basic-components/view-exer10';

export default function App() {
  return (
    <View style={styles.container}>
      <ExercicioView10/>
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

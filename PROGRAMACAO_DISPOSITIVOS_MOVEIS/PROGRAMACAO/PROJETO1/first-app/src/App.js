import { StatusBar } from 'expo-status-bar';
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
import ExercicioViewAva from './exer-ava/avaliacao';
import ExercicioViewAva2 from './exer-ava/exer-ava2';





import { StyleSheet, View, Text } from 'react-native';
import CartaoPerfil from './basic-components/cartaoperfil';
import CardProduto from './basic-components/CardProduto';
import CardUsuario from './basic-components/CardUsuario';
import Saudacao from './basic-components/Saudacao';
import PerfilAluno from './basic-components/PerfilAluno';




export default function App() {
  return (
    /*
    <View style={styles.container}>
      <CartaoPerfil nome="Ana" idade={22}/>
      <CartaoPerfil nome="Bruno" idade={19}/>
      <CartaoPerfil nome="Carla" idade={25}/>
    </View>*/

    /*
    <View style={styles.container}>
      <CardProduto nome='Suco de laranja' preco={12.00}/>
      <CardProduto nome='Suco de uva' preco={15.00}/>
      <CardProduto nome='H2O' preco={10.00}/>
    </View>*/
    /*
    <View style={styles.container}>
      <CardUsuario nome='Ana' email='ana@gmail.com'/>
      <CardUsuario nome='Miguel' email='miguel@gmail.com'/>
      <CardUsuario nome='Sinesio' email='sinesio@gmail.com'/>
    </View>
    */
    /*
    <View style={styles.container}>
      <PerfilAluno nome='Ana' turma='DS-2025' matricula='123' />
    </View>
    */

    <View style={styles.container}>
      <Botao titulo="Entrar" />
      <Botao titulo="Sair" />
      <Botao titulo="Cadastrar" />
    </View>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});



/*
export default function App() {
  return (
    
    <View style={styles.container}>
      <CartaoPerfil/>
    </View>
    

    <View>
                    <CartaoPerfilp nome='Ana' idade={22} />
                    <CartaoPerfilp nome='Daniel' idade={22} />
                    <CartaoPerfilp nome='Celso' idade={27} />
                    <CartaoPerfilp nome='Marlon' idade={25} />
                    
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
*/
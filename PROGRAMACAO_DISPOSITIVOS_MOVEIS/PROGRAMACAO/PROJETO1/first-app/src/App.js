import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, Text, FlatList } from "react-native";
import StackNavigator from "./navigation/exemplos/stack_navigation";



export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>

    /*
    <View style={styles.container}>
      <FlatListExemplos/>
    </View>
    */

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
    /*
    <View style={styles.container}>
      <Botao titulo="Entrar" />
      <Botao titulo="Sair" />
      <Botao titulo="Cadastrar" />
    </View>
    */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
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

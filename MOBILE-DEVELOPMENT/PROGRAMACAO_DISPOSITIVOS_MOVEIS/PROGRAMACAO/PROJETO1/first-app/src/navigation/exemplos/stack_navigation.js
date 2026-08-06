
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import HomeScreen from "../sreens/HomeScreen";
import DetalheScreen from "../sreens/DetalheScreen";

const Stack = createNativeStackNavigator();
export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detalhe" component={DetalheScreen} />
    </Stack.Navigator>
  );
}

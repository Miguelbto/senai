import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetalheScreen from "../screens/DetalheScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

// TODO: registrar Stack.Screen HomeScreen com name="Home"
// TODO: registrar Stack.Screen DetalheScreen com name="Detalhe"
export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Detalhe" component={DetalheScreen}/>
    </Stack.Navigator>
  );
}

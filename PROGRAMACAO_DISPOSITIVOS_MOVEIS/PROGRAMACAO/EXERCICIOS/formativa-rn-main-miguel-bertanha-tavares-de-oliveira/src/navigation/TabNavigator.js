import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ListaScreen from "../screens/ListaScreen";
import PerfilScreen from "../screens/PerfilScreen";
import StackNavigator from "./StackNavigator";

const Tab = createBottomTabNavigator();

// TODO: registrar Tab.Screen StackNavigator com name="Musicas"
// TODO: registrar Tab.Screen ListaScreen com name="Lista"
// TODO: registrar Tab.Screen PerfilScreen com name="Perfil"
export default function TabNavigator() {
  return <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Musicas" component={StackNavigator} />
    <Tab.Screen name="Lista" component={ListaScreen} />
    <Tab.Screen name="Perfil" component={PerfilScreen} />
  </Tab.Navigator>;
}

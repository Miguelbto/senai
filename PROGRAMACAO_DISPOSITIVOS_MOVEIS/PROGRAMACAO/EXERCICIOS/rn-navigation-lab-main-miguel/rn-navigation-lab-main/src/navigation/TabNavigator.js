import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ListaScreen from "../screens/ListaScreen";
import PerfilScreen from "../screens/PerfilScreen";
import StackNavigator from "./StackNavigator";

import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Jogos") {
            iconName = "game-controller";
          } else if (route.name === "Lista") {
            iconName = "list-circle";
          } else if (route.name === "Perfil") {
            iconName = "person-circle";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF007F",
        tabBarInactiveTintColor: "#8A8C99",
        tabBarStyle: {
          backgroundColor: "#0D0E15",
          borderTopWidth: 1.5,
          borderTopColor: "#FF007F",
          paddingBottom: 6,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen name="Jogos" component={StackNavigator} />
      <Tab.Screen name="Lista" component={ListaScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

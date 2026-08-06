import HomeScreen from "../sreens/HomeScreen" // Ajuste para "../screens/" se necessário
import PerfilScreen from "../sreens/PerfilScreen"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"


const Tab = createBottomTabNavigator(); 

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Perfil" component={PerfilScreen}/>
        </Tab.Navigator>
    )
}
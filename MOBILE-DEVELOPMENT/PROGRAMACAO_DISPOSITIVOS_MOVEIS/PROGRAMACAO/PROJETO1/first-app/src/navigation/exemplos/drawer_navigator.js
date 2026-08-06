import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../sreens/HomeScreen";
import PerfilScreen from "../sreens/PerfilScreen";
import ConfigScreen from "../sreens/ConfigScreen";

const Drawer = createDrawerNavigator()

export default function DrawerNavigator(){
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="Perfil" component={PerfilScreen}/>
            <Drawer.Screen name="Config" component={ConfigScreen}/>
        </Drawer.Navigator>
    )
}
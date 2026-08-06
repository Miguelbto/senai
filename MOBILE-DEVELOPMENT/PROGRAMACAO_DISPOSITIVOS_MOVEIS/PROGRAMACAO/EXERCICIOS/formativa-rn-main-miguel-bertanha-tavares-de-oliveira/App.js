import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* TODO: envolver com NavigationContainer */}
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
      {/* TODO: chamar o componente AppNavigator */}
    </SafeAreaProvider>
  );
}

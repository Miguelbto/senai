import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Chamar o NavigationContainer */}
      {/* Chamar o Componente do navigation/index.js */}
    </SafeAreaProvider>
  );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { ThemeProvider, useTema } from './context/ThemeContext';
import ListaLivros from './screens/ListaLivros';
import DetalheLivro from './screens/DetalheLivro';
import Favoritos from './screens/Favoritos';
import Configuracoes from './screens/Configuracoes';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CatalogoStack() {
  const { cores } = useTema();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: cores.header },
        headerTintColor: cores.headerText,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="ListaLivros" component={ListaLivros} options={{ title: 'Catalogo' }} />
      <Stack.Screen
        name="DetalheLivro"
        component={DetalheLivro}
        options={{ title: 'Detalhes do Livro' }}
      />
    </Stack.Navigator>
  );
}

function Navegacao() {
  const { cores } = useTema();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: cores.tabBar,
            borderTopColor: cores.border,
          },
          tabBarActiveTintColor: cores.primary,
          tabBarInactiveTintColor: cores.textSecondary,
          headerStyle: { backgroundColor: cores.header },
          headerTintColor: cores.headerText,
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Tab.Screen
          name="Catalogo"
          component={CatalogoStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Catalogo',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📚</Text>,
          }}
        />
        <Tab.Screen
          name="Favoritos"
          component={Favoritos}
          options={{
            title: 'Favoritos',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>❤️</Text>,
          }}
        />
        <Tab.Screen
          name="Configuracoes"
          component={Configuracoes}
          options={{
            title: 'Configuracoes',
            tabBarLabel: 'Config',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>⚙️</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Navegacao />
    </ThemeProvider>
  );
}

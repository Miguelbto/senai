import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import GPSScreen from './src/screens/GPSScreen';
import WiFiScreen from './src/screens/WiFiScreen';
import AccelerometerScreen from './src/screens/AccelerometerScreen';
import AudioScreen from './src/screens/AudioScreen';
import CameraScreen from './src/screens/CameraScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#1a73e8' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Recursos de Hardware' }}
        />
        <Stack.Screen name="GPS" component={GPSScreen} options={{ title: 'GPS' }} />
        <Stack.Screen name="WiFi" component={WiFiScreen} options={{ title: 'Wi-Fi / Rede' }} />
        <Stack.Screen
          name="Acelerometro"
          component={AccelerometerScreen}
          options={{ title: 'Acelerometro' }}
        />
        <Stack.Screen name="Audio" component={AudioScreen} options={{ title: 'Audio' }} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Camera' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
